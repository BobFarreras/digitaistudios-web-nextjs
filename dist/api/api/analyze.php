<?php
// Aquest fitxer s'ha de desar com a /public_html/api/analyze.php al teu servidor de Hostinger

// --- CONFIGURACIÓ DE SEGURETAT I CAPÇALERES ---
// --- CONFIGURACIÓ GLOBAL I SEGURETAT ---
// --- CONFIGURACIÓ DE SEGURETAT I CAPÇALERES ---
$allowed_origins = [
    'https://digitaistudios.com', // El teu domini de producció amb https
    'http://digitaistudios.com',   // El teu domini de producció amb http
    'http://localhost:5173'
  
];

// --- CONFIGURACIÓ I CAPÇALERES (igual que abans) ---
require __DIR__ . '/../../config.php';

// Comprovem si l'origen de la petició està a la nostra llista blanca
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    // Opcional: Si vols ser molt estricte, podries bloquejar aquí.
    // Per ara, deixarem el teu domini principal per defecte.
    header("Access-Control-Allow-Origin: https://digitaistudios.com");
}


header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("X-Robots-Tag: noindex, nofollow"); // Opcional per evitar indexació

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// --- CLAUS D'API DES DE config.php ---
$pagespeedApiKey = PAGESPEED_API_KEY;
$geminiApiKey = GEMINI_API_KEY;
$serpApiKey = SERPAPI_KEY;



// --- LECTURA I VALIDACIÓ DE LA URL D'ENTRADA ---
$input = json_decode(file_get_contents('php://input'), true);
$userUrl = $input['url'] ?? null;

if (!$userUrl || !filter_var($userUrl, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    echo json_encode(['error' => 'URL invàlida o no proporcionada.']);
    exit();
}

// --- ETAPA 1: CRIDA A L'API DE GOOGLE PAGESPEED INSIGHTS ---
$pagespeedUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" . urlencode($userUrl) . "&key=" . $pagespeedApiKey . "&strategy=MOBILE&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO";
$ch_pagespeed = curl_init($pagespeedUrl);
curl_setopt($ch_pagespeed, CURLOPT_RETURNTRANSFER, true);
$pagespeedResponse = curl_exec($ch_pagespeed);
$httpcode_pagespeed = curl_getinfo($ch_pagespeed, CURLINFO_HTTP_CODE);
curl_close($ch_pagespeed);

if ($httpcode_pagespeed !== 200) {
    http_response_code(502);
    echo json_encode(['error' => 'No s\'ha pogut realitzar l\'auditoria de rendiment.', 'details' => json_decode($pagespeedResponse)]);
    exit();
}

$pagespeedData = json_decode($pagespeedResponse, true);
$lighthouse = $pagespeedData['lighthouseResult'];


// Extreiem les puntuacions reals (multiplicades per 100)
$performanceScore = round($lighthouse['categories']['performance']['score'] * 100);
$accessibilityScore = round($lighthouse['categories']['accessibility']['score'] * 100);
$bestPracticesScore = round($lighthouse['categories']['best-practices']['score'] * 100);
$seoScore = round($lighthouse['categories']['seo']['score'] * 100);

// Extreiem les recomanacions més importants per a la IA
$topRecommendations = [];
foreach ($lighthouse['audits'] as $audit) {
    // Només ens interessem per les oportunitats o diagnòstics amb impacte
    if (isset($audit['details']['type']) && ($audit['details']['type'] === 'opportunity' || $audit['details']['type'] === 'diagnostic') && $audit['score'] < 0.9) {
        $topRecommendations[] = $audit['title'];
    }
}
$recommendationsText = implode(', ', array_slice($topRecommendations, 0, 5));


// --- FUNCIÓ NOM DE DOMINI NET ---
function get_clean_name_from_domain($domain) {
    $domain = preg_replace('/^www\./', '', $domain);
    return ucfirst(preg_replace('/\.(com|es|net|org|cat|io|co)$/i', '', $domain));
}

// --- SERPAPI ---
$parsed = parse_url($userUrl);
$domain = $parsed['host'] ?? '';
$companyName = get_clean_name_from_domain($domain);
$googleRating = null;
$googleReviews = null;

$serp_data = [];
if (!empty($serpApiKey)) {
    $url = "https://serpapi.com/search.json?engine=google&q=$domain&api_key=$serpApiKey";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $resp = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    error_log("SerpAPI code: $code, resp: ". substr($resp,0,500)); // log parcial

    if ($code === 200) {
        $serp_data = json_decode($resp, true);
        if (!empty($serp_data['knowledge_graph'])) {
            $kg = $serp_data['knowledge_graph'];
            $companyName = $kg['title'] ?? $companyName;
            $googleRating = $kg['rating'] ?? null;

            // **CANVI CLAU (V3): Lògica més robusta per extreure les ressenyes**
            $reviews_raw = $kg['reviews'] ?? null;
            if (is_numeric($reviews_raw)) {
                $googleReviews = (int) $reviews_raw;
            } elseif (is_string($reviews_raw)) {
                // Intent 1: Buscar 'reviews=NUMERO' a la URL, de forma més flexible
                if (preg_match('/[?&]reviews=(\d+)/', $reviews_raw, $matches)) {
                    $googleReviews = (int) $matches[1];
                } 
                // Intent 2: Si no, buscar un número a l'inici del text (ex: "41 Google Reviews")
                elseif (preg_match('/^(\d+)/', $reviews_raw, $matches)) {
                     $googleReviews = (int) $matches[1];
                }
            }
        }
    }
}




// 1b. Obtenció de contingut HTML i imatge
// --- OBTENCIÓ HTML PÀGINA WEB ---
$ch_user_web = curl_init($userUrl);
curl_setopt($ch_user_web, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch_user_web, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch_user_web, CURLOPT_USERAGENT, 'DigitAI-Analyzer-Bot/1.0');
curl_setopt($ch_user_web, CURLOPT_TIMEOUT, 15);
$htmlContent = curl_exec($ch_user_web);
$httpcode_user_web = curl_getinfo($ch_user_web, CURLINFO_HTTP_CODE);
curl_close($ch_user_web);

if ($httpcode_user_web !== 200 || !$htmlContent) {
    http_response_code(502);
    echo json_encode(['error' => 'No s\'ha pogut accedir al contingut de la URL proporcionada.']);
    exit();
}

$doc = new DOMDocument();
// Utilitzem @ per suprimir warnings d'HTML mal format
@$doc->loadHTML('<?xml encoding="utf-8" ?>' . $htmlContent);
$xpath = new DOMXPath($doc);

// Extreure l'etiqueta <title>
$titleNode = $xpath->query('//title')->item(0);
$pageTitle = $titleNode ? trim($titleNode->nodeValue) : 'No trobat';

// Extreure la meta descripció
$metaDescNode = $xpath->query('//meta[@name="description"]/@content')->item(0);
$metaDescription = $metaDescNode ? trim($metaDescNode->nodeValue) : 'No trobada';

// Extreure l'encapçalament H1
$h1Node = $xpath->query('//h1')->item(0);
$h1Content = $h1Node ? trim($h1Node->nodeValue) : 'No trobat';

// Comptar imatges sense atribut 'alt' (un factor SEO important)
$images = $xpath->query('//img');
$totalImages = $images->length;
$imagesWithoutAlt = 0;
foreach ($images as $image) {
    if (!$image->hasAttribute('alt') || trim($image->getAttribute('alt')) === '') {
        $imagesWithoutAlt++;
    }
}

// Extreure el text pla (encara el necessitem per al context general)
$textContent = strip_tags($htmlContent);
$textContent = preg_replace('/\s+/', ' ', $textContent);
$trimmedContent = mb_substr($textContent, 0, 8000); // Reduïm una mica per donar espai a les noves dades

// Funció per extreure una imatge de l'HTML
function extract_image_url($html, $base_url) {
    if (empty($html)) return null;
    $doc = new DOMDocument();
    @$doc->loadHTML($html);
    $xpath = new DOMXPath($doc);
    $og_image = $xpath->query('//meta[@property="og:image"]/@content');
    if ($og_image->length > 0) return $og_image->item(0)->nodeValue;
    $images = $xpath->query('//img/@src');
    if ($images->length > 0) {
        $first_image_src = $images->item(0)->nodeValue;
        $url_parts = parse_url($first_image_src);
        if (empty($url_parts['scheme'])) {
            $base_url_parts = parse_url($base_url);
            return ($base_url_parts['scheme'] ?? 'http') . '://' . $base_url_parts['host'] . '/' . ltrim($first_image_src, '/');
        }
        return $first_image_src;
    }
    return null;
}

$extractedImageUrl = extract_image_url($htmlContent, $userUrl) ?: "https://placehold.co/1200x630/E2E8F0/4A5568?text=Imatge+no+disponible";
$textContent = strip_tags($htmlContent);
$textContent = preg_replace('/\s+/', ' ', $textContent);
$trimmedContent = mb_substr($textContent, 0, 15000);

// --- ETAPA 3: CRIDA A GEMINI AMB DADES REALS ---
$geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-latest:generateContent?key=' . $geminiApiKey;

// Construïm el context amb les dades reals que hem obtingut
$ai_context = "
- URL Analitzada: {$userUrl}
- Puntuació de Rendiment (real): {$performanceScore}/100
- Puntuació d'Accessibilitat (real): {$accessibilityScore}/100
- Puntuació de Bones Pràctiques (real): {$bestPracticesScore}/100
- Puntuació de SEO (real): {$seoScore}/100
- Principals àrees de millora tècnica identificades per Lighthouse: {$recommendationsText}.
";

$system_prompt = "
Ets un consultor web sènior de classe mundial. T'acabo de proporcionar una auditoria tècnica real de Lighthouse per a una pàgina web. La teva feina és interpretar aquestes dades i traduir-les en un pla d'acció accionable i entenedor per al client.

A partir de les dades tècniques proporcionades, has de generar una resposta en format JSON amb l'estructura següent:
{
  \"sector\": \"(A partir de la URL, infereix el sector de l'empresa)\",
  \"improvement_points\": [
    {
      \"title\": \"(Títol de la primera recomanació estratègica)\",
      \"description\": \"(Explica la primera recomanació en termes de negoci. Per exemple, si el rendiment és baix, explica com afecta la pèrdua de clients i el SEO. Utilitza les dades reals com 'La teva puntuació de {$performanceScore}/100 indica que...')\"
    },
    {
      \"title\": \"(Títol de la segona recomanació estratègica)\",
      \"description\": \"(Fes el mateix per a una altra àrea important, com l'accessibilitat o el SEO, sempre connectant la dada tècnica amb un impacte real per a l'empresa.)\"
    },
    {
      \"title\": \"Potencial d'Automatització amb IA\",
      \"description\": \"(Basant-te en el sector inferit, suggereix 1 o 2 automatitzacions amb IA que podrien beneficiar aquest negoci, com un chatbot, gestió de reserves, etc.)\"
    }
  ],
  \"social_media_post\": {
    \"body\": \"(Genera una publicació per a xarxes socials que celebri un punt fort (la puntuació més alta) i mencioni com l'empresa es preocupa per l'experiència d'usuari.)\"
  }
}
Només retorna aquest objecte JSON. Sigues professional, positiu i enfocat en solucions.
";

$contents = [
    ['role' => 'user', 'parts' => [['text' => $system_prompt]]],
    ['role' => 'model', 'parts' => [['text' => 'Entesos. Proporciona\'m l\'auditoria tècnica de Lighthouse per interpretar.']]],
    ['role' => 'user', 'parts' => [['text' => $ai_context]]]
];

$data_gemini = [
    'contents' => $contents,
    // Afegim una configuració per asegurar que la sortida sigui JSON
    'generationConfig' => [
        'responseMimeType' => 'application/json',
    ]
];

$messages = [['role' => 'system', 'content' => $system_prompt], ['role' => 'user', 'content' => $trimmedContent]];

$data_gemini = ['contents' => $contents, 'generationConfig' => ['responseMimeType' => 'application/json']];
$ch_gemini = curl_init($geminiUrl);
curl_setopt($ch_gemini, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch_gemini, CURLOPT_POST, true);
curl_setopt($ch_gemini, CURLOPT_POSTFIELDS, json_encode($data_gemini));
curl_setopt($ch_gemini, CURLOPT_HTTPHEADER, ['Content-Type: application/json']); // Ja no cal 'Authorization: Bearer'
$response_gemini = curl_exec($ch_gemini);
$httpcode_gemini = curl_getinfo($ch_gemini, CURLINFO_HTTP_CODE);
curl_close($ch_gemini);

// --- CONSTRUCCIÓ DE LA RESPOSTA FINAL (ADAPTADA A GEMINI) ---
$final_analysis = [];

if ($httpcode_gemini >= 400) {
    http_response_code(503);
    // Afegim més detall a l'error per a depuració
    echo json_encode(['error' => 'El servei d\'anàlisi (IA) no està disponible.', 'details' => json_decode($response_gemini)]);
    exit();
} else {
    $gemini_data = json_decode($response_gemini, true);
    // La resposta de Gemini està en una estructura diferent
    $analysis_content_string = $gemini_data['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
    $final_analysis = json_decode($analysis_content_string, true) ?: [];
}

// Afegim les dades reals de Lighthouse al JSON final
$final_analysis['stats'] = [
    "seo_score" => $seoScore,
    "performance_score" => $performanceScore,
    "accessibility_score" => $accessibilityScore,
    "best_practices_score" => $bestPracticesScore, // Dada nova!
];

// Afegim les dades, assegurant-nos que sempre existeixen
$final_analysis['company_name'] = $companyName;
$final_analysis['screenshotUrl'] = $extractedImageUrl;
$final_analysis['google_rating'] = $googleRating;
$final_analysis['google_reviews'] = $googleReviews;

// Si les 'stats' no han vingut d'OpenAI, les simulem
if (!isset($final_analysis['stats']) || !is_array($final_analysis['stats'])) {
    $final_analysis['stats'] = [
        "seo_score" => rand(60, 85),
        "performance_score" => rand(50, 95),
        "automation_potential" => rand(30, 70),
        "accessibility_score" => rand(70, 98)
    ];
}
// VALIDACIÓ FINAL DE L'ESTRUCTURA
// Assegura't que 'improvement_points' SEMPRE és un array
if (!isset($final_analysis['improvement_points']) || !is_array($final_analysis['improvement_points'])) {
    $final_analysis['improvement_points'] = []; // Si no existeix o no és un array, el crea buit
}

header('Content-Type: application/json');
echo json_encode($final_analysis);

