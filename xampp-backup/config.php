<?php
// Database configuration for Galaxia Magna Academy
// Configuración de base de datos para Galaxia Magna Academy

// XAMPP default settings
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'University-GMA');

// Function to create database connection
function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    
    // Set charset to UTF-8 to handle special characters properly
    $conn->set_charset("utf8mb4");
    
    return $conn;
}

// Function to start session safely
function startSession() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
}

// Function to check if user is logged in
function isLoggedIn() {
    startSession();
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

// Function to redirect to login if not authenticated
function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: index.html');
        exit;
    }
}
?>
