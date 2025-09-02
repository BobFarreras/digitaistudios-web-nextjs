<?php
// /api/test_paths.php

echo "<h1>Diagnòstic de Rutes i Arxius</h1>";
echo "<p>Aquest script comprova si els arxius necessaris existeixen des de la perspectiva de <code>send_email.php</code>.</p>";
echo "<hr>";

// Test 1: Comprovar el fitxer de configuració
$configFile = __DIR__ . '/../../config.php';
echo "<h2>1. Comprovant <code>config.php</code></h2>";
echo "<p>Buscant a la ruta: <code>" . $configFile . "</code></p>";
if (file_exists($configFile)) {
    echo "<p style='color:green; font-weight:bold;'>✅ TROBAT! El fitxer de configuració existeix.</p>";
} else {
    echo "<p style='color:red; font-weight:bold;'>❌ NO TROBAT! AQUEST ÉS L'ERROR. El fitxer <code>config.php</code> no està a l'arrel del teu hosting.</p>";
}

echo "<hr>";

// Test 2: Comprovar la plantilla de contacte
$contactTemplate = __DIR__ . '/plantilla_contacte.html';
echo "<h2>2. Comprovant <code>plantilla_contacte_pro.html</code></h2>";
echo "<p>Buscant a la ruta: <code>" . $contactTemplate . "</code></p>";
if (file_exists($contactTemplate)) {
    echo "<p style='color:green; font-weight:bold;'>✅ TROBAT! La plantilla de contacte existeix.</p>";
} else {
    echo "<p style='color:red; font-weight:bold;'>❌ NO TROBAT! AQUEST ÉS L'ERROR. Revisa el nom d'aquest fitxer i actualitza'l a <code>send_email.php</code> (case 'contact').</p>";
}

echo "<hr>";

// Test 3: Comprovar la plantilla de la demo
$demoTemplate = __DIR__ . '/plantilla_informe_demo.html';
echo "<h2>3. Comprovant <code>plantilla_informe_demo.html</code></h2>";
echo "<p>Buscant a la ruta: <code>" . $demoTemplate . "</code></p>";
if (file_exists($demoTemplate)) {
    echo "<p style='color:green; font-weight:bold;'>✅ TROBAT! La plantilla de la demo existeix.</p>";
} else {
    echo "<p style='color:red; font-weight:bold;'>❌ NO TROBAT! AQUEST ÉS L'ERROR. Revisa el nom d'aquest fitxer i actualitza'l a <code>send_email.php</code> (case 'demo_request').</p>";
}

echo "<hr>";
echo "<p>Si algun dels arxius no s'ha trobat, corregeix el seu nom o la seva ubicació i el problema estarà solucionat.</p>";

?>