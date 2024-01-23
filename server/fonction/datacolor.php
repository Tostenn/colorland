<?php

require_once 'fonction/fonction.php';

use function Kouya\{dataBase};

class DataColor{
    public $bd;
    public function __construct() {
        $this->bd = dataBase();
    }

    /**
     * ajoute une nouvelle color
     * @param string $color
     */
    public function setColor($color) : bool {
        $cmd = "select nom from colors where nom='$color'";
        $cmd = $this->bd->query($cmd)->fetchAll();
        if (!key_exists(0,$cmd)){
            $cmd = "insert into colors (nom,compter) values(:color,1)";
        }
        else {
            $cmd = "update colors set compter=compter+1  where nom=:color";
        }
        $cmd = $this->bd->prepare($cmd);
        return $cmd->execute(['color'=>$color]);
    }
    
    /**
     * renvoi le comptage de la color
     * @return int
     */
    public function getColor($color) {
        $cmd = "select * from colors where nom={$this->bd->quote($color)}";
        return $this->bd->query($cmd)->fetch();
    }
    
    /**
     * récupérer tout les donnés
     */
    public function data_all(mixed $limit, mixed $sub, mixed $inf) {
        $cmd = "select * from colors ";
        if ($sub) {
            // echo 'sub <br>';
            $cmd .= "where compter > $sub ";
        }
        elseif ($inf){
            // echo 'sub <br>';
            $cmd .= "where compter < $inf ";
        }
        if ($limit) {
            // echo "limit $limit <br>";
            $cmd .= "limit $limit";
        }
        // echo $cmd;
        return $this->bd->query($cmd)->fetchAll();
    }

    /**
     * enregistre un commentaire
     * @param array $data
     */
    public function saveCmt($data) {
        // vérification de la color
        $cmd = "select nom from colors where nom=\"{$data['nom']}\"";
        $cmd = $this->bd->query($cmd)->fetch();
        if (empty($cmd['nom'])){
            $cmd = "insert into colors (nom,compter) values(:color,0)";
            $cmd = $this->bd->prepare($cmd);
            $cmd->execute(['color'=>$data['nom']]);
        }
        // enregistrement de commentaire
        $cmd = "insert into avis (username,cmmt,nom) values(:username,:cmmt,:nom)";
        $cmd = $this->bd->prepare($cmd);
        return $cmd->execute([
            'username'=>$data['username'],
            'cmmt'=>$data['cmmt'],
            'nom'=>$data['nom']
        ]);
    }
}