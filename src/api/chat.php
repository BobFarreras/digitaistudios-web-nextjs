<?php
// ✅ Seguretat i encapçalaments
header("Access-Control-Allow-Origin: https://digitaistudios.com");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// ✅ Incloure config.php (amb la teva GEMINI_API_KEY)
require __DIR__ . '/../../config.php';

// ✅ Gestió preflight CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

$geminiApiKey = GEMINI_API_KEY;

// ✅ Rebre i validar l’entrada
$input = json_decode(file_get_contents('php://input'), true);
$messages_openai_format = $input['messages'] ?? null;

if (!$messages_openai_format) {
    http_response_code(400);
    echo json_encode(['error' => 'Falten missatges per enviar.']);
    exit();
}

// ✅ Transformar al format de Gemini
$system_instruction = null;
$contents_gemini_format = [];

foreach ($messages_openai_format as $message) {
    if ($message['role'] === 'system') {
        $system_instruction = ['role' => 'user', 'parts' => [['text' => $message['content']]]];
        $contents_gemini_format[] = ['role' => 'model', 'parts' => [['text' => 'Entesos. Comencem.']]];
    } else {
        $contents_gemini_format[] = [
            'role' => $message['role'] === 'assistant' ? 'model' : 'user',
            'parts' => [['text' => $message['content']]]
        ];
    }
}

if ($system_instruction) {
    array_unshift($contents_gemini_format, $system_instruction);
}

// ✅ Enviar petició a Gemini (ara amb 1.5 Pro o Flash)
$geminiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=' . $geminiApiKey;

$data = [
    'contents' => $contents_gemini_format,
];

$ch = curl_init($geminiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// --- GESTIÓ D'ERRORS ---
if ($httpcode >= 400) {
    // 🔧 Registrar l'error a la consola del servidor (només per debugging)
    error_log("Gemini API error ($httpcode): $response");

    // 🧠 Resposta humana, neta, sense embolcalls JSON addicionals
    http_response_code(503);
    echo "Ho sento! Estic tenint problemes per respondre ara mateix. Potser els meus servidors estan saturats.";
    exit();
}

$responseData = json_decode($response, true);
$assistantContent = $responseData['candidates'][0]['content']['parts'][0]['text'] ?? null;

if (!$assistantContent) {
    http_response_code(500);
    echo "Mmm... alguna cosa no ha anat com esperava. Pots repetir la pregunta, si us plau?";
    exit();
}

// ✅ Tot correcte: resposta del model
echo json_encode([
    'role' => 'assistant',
    'content' => $assistantContent
]);
?>
