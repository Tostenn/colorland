
import fec from "./main.js";
import {encodeurls} from "./fonction.js";

export class Api{
    // host = 'https://colorland.000webhostapp.com/'
    host = 'http://localhost:8080/'
    url = {
        'get': this.host
    }
    constructor(){}
    /**
     * receve the number of color 
     * @param {string} color 
     */
    getColor(color){
        return fec(encodeurls(this.url.get,{'get-color':color}))
    }
    setColor(color){
        return fec(encodeurls(this.url.get,{'set-color':color}))
    }
    /**
     * receve all data 
     * @param {number} limit
     * @param {number} sub
     * @param {number} inf
     */
    getDatas(limit = "",sub = "",inf= ''){
        const data = {
            limit:limit,
            sub:sub,
            inf:inf
        }
        return fec(encodeurls(this.url.get,data))
    }
    /**
     * enregistre les commentaire
     * @param {Object} data 
     */
    pushCmt(data){
        data['cmmt_'] =true
        return fec(encodeurls(this.url.get,data))
    }
}