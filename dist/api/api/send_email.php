<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


// ✅ PAS 1: INCLOU EL TEU NOU FITXER DE CONFIGURACIÓ
// Li diem que pugi un nivell ('/../') per trobar el config.php a l'arrel.
require __DIR__ . '/../../config.php';


// --- PAS 1: CONFIGURACIÓ DE CORS CORRECTA ---
$allowed_origins = [
    'https://digitaistudios.com', // El teu domini de producció
    'http://localhost:5173',
    'http://localhost:3000' // El teu entorn de desenvolupament local
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    // Per defecte, només permet el teu domini de producció
    header("Access-Control-Allow-Origin: https://digitaistudios.com");
}

header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// Lectura de la petició
$input = json_decode(file_get_contents('php://input'), true);
$emailType = $input['type'] ?? '';
$data = $input['data'] ?? [];

if (empty($emailType) || empty($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tipus de correu o dades no proporcionades.']);
    exit();
}

$mail = new PHPMailer(true);

try {
    // Configuració SMTP comuna
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@digitaistudios.com';
     // ✅ PAS 2: UTILITZA LA CONSTANT DEL FITXER DE CONFIGURACIÓ
    $mail->Password   = EMAIL_PASSWORD; // Ja no hi ha la contrasenya escrita aquí!
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom('info@digitaistudios.com', 'DigitAI Studios');
 
 // ✅ AFEGEIX AQUESTA LÍNIA AQUÍ
    $mail->isHTML(true);
    // Lògica per a cada tipus de correu
        switch ($emailType) {
            case 'contact':
   
            $mail->addAddress('info@digitaistudios.com');
            $mail->addReplyTo($data['email'], $data['fullName']);
            $mail->Subject = 'Nou Missatge de Contacte de: ' . $data['fullName'];
            
            $htmlBody = file_get_contents('plantilla_contacte.html');
            $replacements = [
                '{{fullName}}'    => htmlspecialchars($data['fullName']),
                '{{email}}'       => htmlspecialchars($data['email']),
                '{{companyName}}' => htmlspecialchars($data['companyName']),
                '{{service}}'     => htmlspecialchars($data['service'] ?? 'No especificat'), // 👈 AFEGIT
                '{{message}}'     => nl2br(htmlspecialchars($data['message'])),
                '{{date}}'        => date('d/m/Y H:i'),
                '{{currentYear}}' => date('Y'),
            ];
            $mail->Body = str_replace(array_keys($replacements), array_values($replacements), $htmlBody);
            break;

        case 'demo_request':
            // --- PAS 2: LÒGICA ADAPTADA A LA NOVA PLANTILLA ---
            $mail->addAddress($data['email']); 
            $mail->Subject = '🚀 Aquí tens el teu Informe d\'Anàlisi d\'IA';

            $htmlBody = file_get_contents('plantilla_informe_demo.html');
            
            $analysis = $data['analysisResult'];
            $domain = parse_url($data['url'], PHP_URL_HOST);
            
           // Creem els strings per a les dades complexes, incloent la nova mètrica
            $stats_text = "Rendiment: " . htmlspecialchars($analysis['stats']['performance_score']) . "%\n" .
                          "Accessibilitat: " . htmlspecialchars($analysis['stats']['accessibility_score']) . "%\n" .
                          "Bones Pràctiques: " . htmlspecialchars($analysis['stats']['best_practices_score']) . "%\n" .
                          "SEO Tècnic: " . htmlspecialchars($analysis['stats']['seo_score']) . "%";
            
            $improvements_text = '';
            foreach ($analysis['improvement_points'] as $point) {
                $improvements_text .= '• ' . htmlspecialchars($point['title']) . "\n" . htmlspecialchars($point['description']) . "\n\n";
            }
            
            $replacements = [
                '{{domain}}'             => htmlspecialchars($domain),
                '{{rating}}'             => htmlspecialchars($analysis['google_rating'] ?? 'N/A'),
                '{{sector}}'             => htmlspecialchars($analysis['sector'] ?? 'No especificat'),
                
                // --- Dades per a la secció HERO ---
                '{{performanceScore}}'   => htmlspecialchars($analysis['stats']['performance_score']),
                '{{accessibilityScore}}' => htmlspecialchars($analysis['stats']['accessibility_score']),
                '{{bestPracticesScore}}' => htmlspecialchars($analysis['stats']['best_practices_score']), // <-- NOU!
                '{{seoScore}}'           => htmlspecialchars($analysis['stats']['seo_score']),
                
                // --- Dades per a les seccions de text ---
                '{{stats}}'              => nl2br(trim($stats_text)),
                '{{improvements}}'       => nl2br(trim($improvements_text)),
                '{{post}}'               => nl2br(htmlspecialchars($analysis['social_media_post']['body'] ?? 'Contingut no disponible.')),
                '{{date}}'               => date('d/m/Y'),
                '{{currentYear}}'        => date('Y'),
            ];
            
            $mail->Body = str_replace(array_keys($replacements), array_values($replacements), $htmlBody);
            break;

        default:
            throw new Exception("Tipus de correu no vàlid.");
    }

    $mail->send();
    http_response_code(200);
    echo json_encode(['success' => 'Missatge enviat correctament.']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => "El missatge no s'ha pogut enviar: {$mail->ErrorInfo}"]);
}
?>