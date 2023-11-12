<?php
include_once 'fonction/datacolor.php';
header('Access-Control-Allow-Origin: *');

// use function Kouya\{dataBase,pre};


// var_dump($_GET);
// condition d'arret du server
if (!(key_exists('color',$_GET) || key_exists('datall',$_GET)))
die('not key color');

// connection a la base de donnés
$bd = new datacolor();

if (key_exists('color',$_GET)){
    $res = $bd->color_exits($_GET['color']);
    echo json_encode($res);
}
else echo json_encode($bd->data_all());

// var_dump(json_decode(file_get_contents('d.json'),true));
// echo json_encode();