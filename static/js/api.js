
import fec, {  } from "./main.js";

export class Api{
    host = 'http://localhost:8080/?'
    url = {
        'get': this.host
    }
    constructor(){}
    /**
     * receve the number of color 
     * @param {string} color 
     */
    getColor(color){
        return fec(this.url.get+'color='+color)
    }
    /**
     * receve all data 
     * @param {string} color 
     */
    getDatas(){
        return fec(this.url.get+'datall='+color)
    }
}