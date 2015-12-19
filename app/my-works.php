<?php

  $name = $_POST['project-name']
  $data = array();

  if ($name === '') {
    $data['status'] = 'Error';
    $data['text'] = 'Заполните имя';
  } else {
    $data['status'] = 'ОК';
    $data['text'] = 'Вы молодец';
  }

  header("Content-Type: application/json");
  echo json_encode($data);
  exit;

?>
