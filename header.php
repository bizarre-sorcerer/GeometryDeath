<?php
session_start();
$isLoggedIn = isset($_SESSION['user_id']);
?>
<html>
  <head><title>Главная</title></head>
  <body>
    <header>
      <a href="index.php">Главная</a>
      <?php if ($isLoggedIn): ?>
        <a href="dashboard.php">Мои статьи</a>
        <a href="logout.php">Выйти</a>
      <?php else: ?>
        <a href="login.php">Войти</a>
        <a href="register.php">Регистрация</a>
      <?php endif; ?>
    </header>
    <h1>Добро пожаловать!</h1>
  </body>
</html>
