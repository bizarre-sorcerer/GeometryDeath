<?php
session_start();
require 'db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$username || !$password) {
        $error = 'Введите имя и пароль.';
    } else {
        // Проверка, не занят ли логин
        $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ?');
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            $error = 'Пользователь уже существует.';
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare('INSERT INTO users (username, password) VALUES (?, ?)');
            $stmt->execute([$username, $hash]);
            $_SESSION['user_id'] = $pdo->lastInsertId();
            header('Location: index.php');
            exit;
        }
    }
}
?>

<h2>Регистрация</h2>
<form method="POST">
    <label>Имя:</label>
    <input name="username" required>
    <br>
    <label>Пароль:</label>
    <input name="password" type="password" required>
    <br>
    <button type="submit">Зарегистрироваться</button>
</form>
<?php if ($error): ?>
  <p style="color: red;"><?= htmlspecialchars($error) ?></p>
<?php endif; ?>
