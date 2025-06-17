<?php
session_start();
require 'db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare('SELECT id, password FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        header('Location: index.php');
        exit;
    } else {
        $error = 'Неверный логин или пароль.';
    }
}
?>

<h2>Вход</h2>
<form method="POST">
    <label>Имя:</label>
    <input name="username" required>
    <br>
    <label>Пароль:</label>
    <input name="password" type="password" required>
    <br>
    <button type="submit">Войти</button>
</form>
<?php if ($error): ?>
  <p style="color: red;"><?= htmlspecialchars($error) ?></p>
<?php endif; ?>
