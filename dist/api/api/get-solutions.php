<?php
// --- CONFIGURACIÓ DE SEGURETAT I CAPÇALERES ---
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-cache, must-revalidate");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- CLAUS D'AIRTABLE ---
// (Utilitza les mateixes claus que ja tens)
$airtableToken = getenv('AIRTABLE_TOKEN') ?: 'patV2NhPlJ6VxRJVX.0e40f9664aa81736ec78362720068c034997ff8980b9f3f24ccca4cb8d9670ad';
$airtableBaseId = getenv('AIRTABLE_BASE_ID') ?: 'appXdhahQQI3sObFF';

// --- FUNCIÓ AUXILIAR PER FER TRUCADES A L'API ---
function fetchAirtableData($tableName, $token, $baseId) {
    $url = "https://api.airtable.com/v0/{$baseId}/" . urlencode($tableName);
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $token]);
    $response = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpcode >= 400) {
        return null; // Retorna null si hi ha un error
    }
    return json_decode($response, true)['records'] ?? [];
}

// --- OBTENIR I PROCESSAR DADES ---
$categories_raw = fetchAirtableData('Categories', $airtableToken, $airtableBaseId);
$solutions_raw = fetchAirtableData('Solucions', $airtableToken, $airtableBaseId);

if ($categories_raw === null || $solutions_raw === null) {
    http_response_code(502);
    echo json_encode(['error' => 'Error connectant amb la base de dades d\'Airtable.']);
    exit();
}

// --- ESTRUCTURAR LES DADES EN EL FORMAT FINAL ---
$categories_map = [];
foreach ($categories_raw as $cat_record) {
    $cat_id = $cat_record['id'];
    $fields = $cat_record['fields'];
     // CORRECCIÓ: Llegim correctament el nom de la icona des d'Airtable
    $icon_name = $fields['Icona'] ?? 'Bot';
    
    $categories_map[$cat_id] = [
        'name' => $fields['Nom'] ?? 'Categoria Sense Nom',
        'description' => $fields['Descripció'] ?? '',
        'icon' => $icon_name, // Nom de la icona com a text
        'solutions' => []
    ];
}


foreach ($solutions_raw as $sol_record) {
    $fields = $sol_record['fields'];
    $category_ids = $fields['Categoria'] ?? [];

    foreach ($category_ids as $cat_id) {
        if (isset($categories_map[$cat_id])) {
            
            // MILLORA: Intentem descodificar els passos, si falla, retornem un array buit
            $steps_json = $fields['Passos'] ?? '[]';
            $steps_array = json_decode($steps_json, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $steps_array = []; // Si no és un JSON vàlid, el deixem buit
            }

            $categories_map[$cat_id]['solutions'][] = [
                'title' => $fields['Títol'] ?? '',
                'description' => $fields['Descripció'] ?? '',
                'videoUrl' => $fields['VideoURL'] ?? '',
                'previewImage' => $fields['PreviewImageURL'] ?? '',
                'steps' => $steps_array,
                'technologies' => $fields['Tecnologies'] ?? []
            ];
        }
    }
}

// --- GENERAR LA RESPOSTA FINAL ---
// Creem un objecte final que s'assembli al nostre arxiu local per facilitar la feina a React
$final_data = [];
foreach($categories_map as $cat_id => $category_data) {
    // Creem una clau a partir del nom (ex: "Xarxes Socials" -> "xarxes_socials")
    $key = strtolower(str_replace(' ', '_', preg_replace('/[^A-Za-z0-9 ]/', '', $category_data['name'])));
    $final_data[$key] = $category_data;
}

http_response_code(200);
echo json_encode($final_data);
?>