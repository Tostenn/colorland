<?php

namespace Kouya;
use \PDO;

    /**
     * permet de se connecter à une base de donnée
     * @param string $nom_serveur nom du serveur
     * @param string $user nom d'utilisateur
     * @param string $password mots de passe d'utilisateur
     * @param string $base_donne nom de la base de donnée
     * @return mixed
     */
    function connBaseData(string $nom_serveur,string $user,string $password,string $base_donne) {
        try {
            $conn= new PDO("mysql:host=$nom_serveur;dbname=$base_donne",$user,$password );
            // $conn->exec("SET NAME utf8");
            $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Throwable $th) {
            return $th;
        }
        
    }

    /**
    * connection direct a la base de donnée
    * @return PDO 
    */
    function dataBase($name='colors') {
        
        // $server = 'localhost';
        // $user = 'id21230356_projet';
        // $password = 'Project12345.';
        // $name = 'id21230356_proceduredeconsignation';
        
        $server = 'localhost';
        $user = 'root';
        $password = '';
        return connBaseData($server,$user,$password,$name);
    }
