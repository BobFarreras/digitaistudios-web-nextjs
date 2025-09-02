<?php
// /api/get-testimonials.php

require __DIR__ . '/../../config.php';

// --- CAPÇALERES DE SEGURETAT I CONTROL DE CAU ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// AQUESTES SÓN LES LÍNIES CLAUS PER SOLUCIONAR EL PROBLEMA
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- CLAUS D'AIRTABLE ---
$airtableToken = AIRTABLE_TOKEN;
$airtableBaseId = AIRTABLE_BASE_ID;
$tableName = 'Testimonis';

// --- CRIDA A L'API D'AIRTABLE ---
$airtableUrl = "https://api.airtable.com/v0/{$airtableBaseId}/" . urlencode($tableName) . "?filterByFormula={IsPublished}=1";

$ch = curl_init($airtableUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $airtableToken]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// --- PROCESSAMENT I RESPOSTA ---
if ($httpcode >= 400) {
    http_response_code(502);
    echo json_encode(['error' => "Error connectant amb la base de dades (Airtable): Codi {$httpcode}"]);
    exit();
}

$airtableData = json_decode($response, true);
$records = $airtableData['records'] ?? [];

$testimonials = [];
foreach ($records as $record) {
    $fields = $record['fields'];
    if (!empty($fields['Name']) && !empty($fields['Text'])) {
        $testimonials[] = [
            'name' => $fields['Name'],
            'company' => $fields['Company'] ?? '',
            'text' => $fields['Text'],
            'link' => $fields['Link'] ?? '',
            'rating' => $fields['Rating'] ?? 5,
        ];
    }
}

http_response_code(200);
echo json_encode($testimonials);

?>