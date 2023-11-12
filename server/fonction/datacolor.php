<?php


include_once 'fonction/fonction.php';

use function Kouya\{dataBase,pre};

class DataColor{
    public $bd;
    public function __construct() {
        $this->bd = dataBase();
    }

    /**
     * verifie qu'une color existe
     */
    public function color_exits($color) {
        $cmd = "select nom from colors where nom='$color'";
        $cmd = $this->bd->query($cmd)->fetch();
        if (!key_exists("nom",$cmd)){
            $cmd = "insert into colors (nom,compter) values('$color',1)";
            $this->bd->query($cmd);
        }
        else {
            $cmd = "update colors set compter=compter+1  where nom='$color'";
            $this->bd->query($cmd);
        }
        $cmd = "select * from colors where nom='$color'";
        return $this->bd->query($cmd)->fetch();
    }
    
    /**
     * récupérer tout les donnés
     */
    public function data_all() {
        $cmd = "select * from colors ";
        return $this->bd->query($cmd)->fetchAll();
    }
}