
import fec, {  } from "./main.js";

export class Api{
    host = 'https://colorland.000webhostapp.com/?'
    url = {
        'get': this.host
    }
    constructor(){}
    /**
     * receve the number of color 
     * @param {string} color 
     */
    getColor(color){
        return fec(this.url.get+'get-color='+color)
    }
    setColor(color){
        return fec(this.url.get+'set-color='+color)
    }
    /**
     * receve all data 
     * @param {number} limit 
     * @param {number} sub 
     * @param {number} inf 
     */
    getDatas(limit = "",sub = "",inf= ''){
        return fec(this.url.get+'get-color-all='+color+'&sub='+sub+'&inf='+inf)
    }
}