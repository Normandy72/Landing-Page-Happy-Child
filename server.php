<?php
$_POST = JSON_decode(file_get_contents('php://input'), true);
var_dump($_POST);
/* закрывающий тег ?> */