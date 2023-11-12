
import fec, {  } from "./main.js";

export class Api{
    host = 'http://localhost:8080/'
    url = {
        'get': this.host
    }
    constructor(){
    }
    /**
     * 
     * @param {string} color 
     */
    getColor(color){
        return fec(this.url.get)
    }
}