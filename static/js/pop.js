import {  } from "./fonction.js";


export class Popup{
    /**
     * ggestion des popup
     * @param {HTMLElement} parent 
     * @param {HTMLElement} copyButton 
     */
    constructor(parent,copyButton){
        this.parent = parent
        this.copyButton = copyButton

        // on récupére le templates
        this.template = this.parent.querySelector('template')
        console.log(this.template);
    }
}