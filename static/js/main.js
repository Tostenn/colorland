
/**
 * FEC est une fonction qui permet d'effectuer
 * une appel vers une api tier, recuper et parser du json 
 * @param {string} url 
 * @param {object} body 
 * @returns {JSON}
 */
export default async function fec(url,body= false) {
    const head = {
        'Accept' : 'application/json',
        'Content-Type':"application/json"
    }
    let r
    if(!body) {
        r = await fetch(url,{headers:head})
    }
    else {
        r = await fetch(
            url,
            {
                headers:head,
                method:'POST',
                body:JSON.stringify(body)
            }
        )
    }
    if (r.ok){
        try {
            
            return r.json()
        } catch (error) {
            return true
        }
    }
    throw new Error('serveur non present')
}

/**
 * COULEURS est une fonction qui généere une couleur RGBa aléatoire
 * 
 * @param {boolean} op si cet argument est define il fait varie l'oppacité
 * @returns {string} une couleur en RGBa 
 */
export function couleurs(op = false){
    const x = Math.round(Math.random()*254)
    const y = Math.round(Math.random()*254)
    const z = Math.round(Math.random()*254)
    const opp = [0.5,0.6,0.7,0.8,0.9,1]
    op = op ? Math.round(Math.random()*5) : 5
    const color = 'rgba('+x+','+y+","+z+','+opp[op]+")"
    return color
}

/**
 * redirection vers une autre page
 * @param {string} url url du site
 * @returns {void}
 */
export function head(url) {

    const h = document.querySelector('head')
    const meta = document.createElement('meta')
    meta.setAttribute('http-equiv',"Refresh")
    meta.setAttribute( 'content',"1; url="+url)
    h.appendChild(meta)

}