<?php
// Pré-verdict Cyber Power Night : envoie le nom/pseudo et le vote par e-mail.
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

$TO = 'contact@mypitchacademy.com';
$FROM = 'noreply@powernight.fr';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'method']);
  exit;
}

// Anti-robot : champ caché qui doit rester vide
if (!empty($_POST['website'])) { echo json_encode(['ok' => true]); exit; }

$verdicts = ['coupable' => 'COUPABLE', 'acquitte' => 'ACQUITTÉ'];
$v = isset($_POST['verdict']) ? (string)$_POST['verdict'] : '';
$name = isset($_POST['name']) ? trim((string)$_POST['name']) : '';
$name = preg_replace('/[\r\n\t]+/', ' ', $name);
$name = mb_substr(strip_tags($name), 0, 40, 'UTF-8');

if (!isset($verdicts[$v]) || mb_strlen($name, 'UTF-8') < 2) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'invalid']);
  exit;
}

// Limite simple : 1 envoi toutes les 20 s par adresse IP
$ip = $_SERVER['REMOTE_ADDR'] ?? 'x';
$lock = sys_get_temp_dir() . '/pn_vote_' . md5($ip);
if (is_file($lock) && time() - filemtime($lock) < 20) {
  http_response_code(429);
  echo json_encode(['ok' => false, 'error' => 'wait']);
  exit;
}
@touch($lock);

$label = $verdicts[$v];
date_default_timezone_set('Europe/Paris');
$subject = '=?UTF-8?B?' . base64_encode("Pré-verdict $label — $name") . '?=';
$body = "Nouveau pré-verdict sur powernight.fr\n\n"
      . "Nom / pseudo : $name\n"
      . "Verdict : $label\n"
      . "Date : " . date('d/m/Y H:i') . "\n";
$headers = "From: Power Night <$FROM>\r\n"
         . "MIME-Version: 1.0\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n"
         . "Content-Transfer-Encoding: 8bit\r\n";

$sent = mail($TO, $subject, $body, $headers);
echo json_encode(['ok' => (bool)$sent]);
