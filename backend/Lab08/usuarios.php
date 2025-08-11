<?php
$apikey = 'TU_API_KEY';
$urlBase = 'https://TU_PROYECTO.supabase.co/rest/v1/usuarios';

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

    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

if ($method === 'GET') {
    echo callSupabase('GET', $urlBase);
}
elseif ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    echo callSupabase('POST', $urlBase, $body);
}
elseif ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) { http_response_code(400); exit('ID requerido'); }
    $body = json_decode(file_get_contents('php://input'), true);
    $url = $urlBase . '?id=eq.' . $id;
    echo callSupabase('PATCH', $url, $body);
}
elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) { http_response_code(400); exit('ID requerido'); }
    $url = $urlBase . '?id=eq.' . $id;
    echo callSupabase('DELETE', $url);
}
