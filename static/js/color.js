import { couleurs } from "./main.js";

export class Color{
    /**
     * 
     * @param {HTMLElement} form 
     */
    constructor(form){
        
        this.rgb = {
            r:0,
            g:0,
            b:0,
            op:0                
        }
        this.element = form // element parent
         
        // gestion des champs
        this.dataform = new FormData(this.element)
        this.inputAll = Array.from(this.element.querySelectorAll('input'))
        this.inputAll.forEach(elements => {
            this.sartvalue(elements)
            
            elements.oninput = ()=>{
                this.sartvalue(elements)
                this.applicolor()
            }
        });
        
        // gestion des color
        this.colorelement = this.element.querySelector('.button-pos .color')
        this.colorelement.onclick = ()=>{

            // generer une nouvelle color
            this.Generate()

            // appliquer la nouvelle color
            this.applicolor()
            
            // mise a jour des champs
            this.updataInput()   
        }
    }
    current = [this.rgb]
    parseop(op){
        return op> 1 ? op /100 : op
    }  
    /**
     * 
     * @param {HTMLElement} el 
     */
    sartvalue(el){
        const value = el.value
        const name = el.getAttribute('name')
        this.rgb[name] = name == 'op'?
        this.rgb.op =this.parseop(value) : value
    }

    /**
     * 
     * @param {Number} op 
     */
    Generate(){
        const codeColor = couleurs(this.rgb.op) 
        this.rgb.r = codeColor[0]
        this.rgb.g= codeColor[1]
        this.rgb.b = codeColor[2]
        this.rgb.op =this.parseop(codeColor[3])
    }
    applicolor(){
        let colorrgb = 'rgba('
        for (const vaule in this.rgb) {
            colorrgb+= this.rgb[vaule]+','
        }
        colorrgb = colorrgb.slice(0,colorrgb.length-1)
        colorrgb += ')'
        console.log(colorrgb);
        this.colorelement.style.backgroundColor = colorrgb
    }
    updataInput(){
        for (const name of this.dataform.keys()) {
            const ch = this.inputAll.filter(el =>{
                el.getAttribute('name') == name
            })
            if (ch.length){
                ch[0].value = this.rgb[name]
            }
        }
    }
}