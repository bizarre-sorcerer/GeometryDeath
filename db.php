
<?php
$host = 'localhost';
$db   = 'my_site';
$user = 'root';      // замени на своего
$pass = '';          // пароль, если есть
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     exit('Ошибка подключения к БД: ' . $e->getMessage());
}
