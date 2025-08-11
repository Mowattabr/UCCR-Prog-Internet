<?php
// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Función segura para capturar el Authorization header
function getAuthorizationHeader() {
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return trim($_SERVER['HTTP_AUTHORIZATION']);
    }
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            return trim($headers['Authorization']);
        }
    }
    return null;
}

$token = getAuthorizationHeader();

// if ($token !== 'Bearer UC2025-II51') {
//     http_response_code(403);
//     echo json_encode(['error' => 'Forbidden']);
//     exit;
// }

// OK
header('Content-Type: application/json');

// usar nuestro api.avillal1
$apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdG9qZ2dqdG91dmdsamxvendyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MzAwMjAsImV4cCI6MjA3MDEwNjAyMH0.z1ggcCP5SbU3jvAOXmo8yD22fRBctQt7LI71LZTR7YM';

// Determinar qué tabla usar basado en la ruta o parámetro
$table = $_GET['table'] ?? 'usuarios'; // Por defecto usuarios, pero puede ser lista_usuarios
$urlBase = 'https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/' . $table;

$method = $_SERVER['REQUEST_METHOD'];
function callSupabase($method, $url, $data = null) {
    global $apikey;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $headers = [
        'apikey: ' . $apikey,
        'Authorization: Bearer ' . $apikey,
        'Content-Type: application/json',
        'Accept: application/json'
    ];

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $headers[] = 'Prefer: return=representation';
    } elseif ($method === 'PUT' || $method === 'PATCH') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $headers[] = 'Prefer: return=representation';
    } elseif ($method === 'DELETE') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    // Habilitar información de debugging
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_FAILONERROR, false);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    
    // Log para debugging
    error_log("Supabase URL: $url");
    error_log("HTTP Code: $httpCode");
    error_log("Response: $response");
    if ($error) {
        error_log("CURL Error: $error");
    }
    
    curl_close($ch);
    return $response;
}
//solo lectura
if ($method === 'GET') {
    // Test endpoint para verificar que el API funciona
    if (isset($_GET['test'])) {
        echo json_encode([
            'test' => 'API is working',
            'timestamp' => date('Y-m-d H:i:s'),
            'get_params' => $_GET
        ]);
        exit;
    }
    
    // Si se solicita información de la tabla lista_usuarios
    if (isset($_GET['test_table']) && $_GET['test_table'] === 'lista_usuarios') {
        $testUrl = 'https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?limit=1';
        $response = callSupabase('GET', $testUrl);
        echo json_encode([
            'table_test' => 'lista_usuarios',
            'response' => json_decode($response, true),
            'raw_response' => $response
        ]);
    } else {
        echo callSupabase('GET', $urlBase);
    }
}
//escritura
elseif ($method === 'POST') {
    // Debug: Log all incoming data
    error_log('=== POST REQUEST DEBUG ===');
    error_log('Content-Type: ' . ($_SERVER['CONTENT_TYPE'] ?? 'NOT SET'));
    error_log('$_POST data: ' . print_r($_POST, true));
    error_log('Raw input: ' . file_get_contents('php://input'));
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    
    // Verificar si es una petición de formulario desde registro.html
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    
    // Forzar detección de form data si $_POST no está vacío
    if (!empty($_POST) || 
        strpos($contentType, 'application/x-www-form-urlencoded') !== false || 
        strpos($contentType, 'multipart/form-data') !== false) {
        
        error_log('=== PROCESSING AS FORM DATA ===');
        
        // Mapear datos del formulario a la estructura REAL de lista_usuarios
        $listaUsuariosData = [
            'username' => $_POST['username'] ?? '',
            'email' => $_POST['email'] ?? '',
            'password' => password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT),
            'telefono' => $_POST['telefono'] ?? '',
            'fecha_nacimiento' => $_POST['fecha-nacimiento'] ?? '',
            'rol' => $_POST['rol'] ?? '',
            'fecha_inscripcion' => $_POST['fecha-inscripcion'] ?? '',
            'codigo_usuario' => $_POST['codigo-estudiante'] ?? '',
            'genero' => $_POST['gender'] ?? '',
            'intereses' => isset($_POST['intereses']) ? $_POST['intereses'] : []
        ];
        
        error_log('Form data received: ' . print_r($_POST, true));
        error_log('Mapped to lista_usuarios: ' . print_r($listaUsuariosData, true));
        
        // Enviar directamente a lista_usuarios con la estructura correcta
        $registroUrl = 'https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios';
        $response = callSupabase('POST', $registroUrl, $listaUsuariosData);
        
        error_log("Raw response from Supabase: $response");
        
        // Siempre devolver respuesta, incluso si hay errores
        $decodedResponse = json_decode($response, true);
        
        echo json_encode([
            'debug' => true,
            'post_data' => $_POST,
            'sent_to_supabase' => $listaUsuariosData,
            'supabase_response' => $decodedResponse,
            'raw_response' => $response,
            'success' => $decodedResponse && is_array($decodedResponse) && !isset($decodedResponse['error']),
            'table_structure_note' => 'Using correct lista_usuarios structure with all required fields'
        ]);
        
    } else {
        error_log('=== PROCESSING AS JSON DATA ===');
        // JSON data (API regular)
        $body = json_decode(file_get_contents('php://input'), true);
        error_log('JSON body: ' . print_r($body, true));
        
        if ($body) {
            echo callSupabase('POST', $urlBase, $body);
        } else {
            echo json_encode([
                'error' => 'No data received',
                'debug' => true,
                'content_type' => $contentType,
                'post_empty' => empty($_POST),
                'input_data' => file_get_contents('php://input')
            ]);
        }
    }
}
//actualización
elseif ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) { http_response_code(400); exit('ID requerido'); }
    $body = json_decode(file_get_contents('php://input'), true);
    $url = $urlBase . '?id=eq.' . $id;
    echo callSupabase('PATCH', $url, $body);
}
//eliminar
elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) { http_response_code(400); exit('ID requerido'); }
    $url = $urlBase . '?id=eq.' . $id;
    echo callSupabase('DELETE', $url);
}