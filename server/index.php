<?php
include_once 'fonction/datacolor.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// var_dump(@$_GET['okok']);

// die();
// condition d'arret du server
// $_GET = [
//     'get-color-all' => 'ze',
//     'limit'=> 5,
// ];

if (!(
    key_exists('set-color',$_GET) ||
    key_exists('get-color',$_GET) ||
    key_exists('cmmt_',$_GET) ||
    key_exists('get-color-all',$_GET)
))
die(json_encode(['reponse'=>'not key color']));

// connection a la base de donnés
$bd = new datacolor();

// récupérerer une couleur 
if (key_exists('get-color',$_GET)){
    $res = $bd->getColor($_GET['get-color']);
    echo json_encode($res);
}

// ajouter une nouvelle couleur 
elseif (key_exists('set-color',$_GET)){
    $res = $bd->setColor($_GET['set-color']);
    echo json_encode(['status' => $res]);
}

// récupérerer toute les couleurs
elseif (key_exists('get-color-all',$_GET)){

    echo json_encode($bd->data_all(
        @$_GET['limit'],
        @$_GET['sub'],
        @$_GET['inf'],
    ));
}

// enregistrer un commentaire
elseif (key_exists('cmmt_',$_GET)){
    unset($_GET['cmmt_']);
    $res = $bd->saveCmt($_GET);
    echo json_encode(['status' => $res]);
}
/*
get-color : retourne le nombre de copi de la color si elle existe sinon return none
set-color : ajout une nouvelle color et return 1
get-color-all
    -limit 
    -sup >
    -inf <
*/