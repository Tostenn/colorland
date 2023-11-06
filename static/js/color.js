import { couleurs } from "./main.js";

export class Color{
    /**
     * 
     * @param {HTMLElement} form 
     */
    constructor(form){
        
        this.element = form // element parent
        
        // gestion des champs
        this.dataform = new FormData(this.element)
        this.inputAll = Array.from(this.element.querySelectorAll('input'))
        
        this.rgb = {
            r:0,
            g:0,
            b:0,
            op:this.parseop(
                this.inputAll.filter(el => el.getAttribute('name') == 'op')
            [0].value)
                
        }
        console.log(this.rgb)
        this.inputAll.forEach(elements => {
            elements.oninput = ()=>{
                const value = elements.value
                const name = elements.getAttribute('name')
                this.rgb[name] = name == 'op'?
                    this.rgb.op =this.parseop(value) : value
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