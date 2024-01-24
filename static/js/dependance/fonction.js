
import fec from "./main.js";


// toute les url utiliser
const urlex = window.navigation.currentEntry.url

// const host = '127.0.0.1'
// const port = 8080
// const urlex = 'http://'+host
export const urls = {
    'view':urlex+'/view-wifi',
    'accuiel':urlex+'/',
    'brute':urlex+'/brute-wifi',
    'fichier':urlex+'/fichier',
    'pass':urlex+'/view-pass',
    'save':urlex+'/save-pass',
    'reduit':urlex+'/reduit',
    'fermer':urlex+'/fermer',
    'wifidata':urlex+'/wifi-data',
    'save':urlex+'/save-wifi',
}

// génere l'url utile pour l'api
/**
 * encodé un URL
 * @param {string} url 
 * @param {Object} ob {key : value }
 * @returns 
 */
export function encodeurls(url,ob) {
    url+='?'
    let bools = true
    for (const [key,value] of Object.entries(ob)) {
        if (bools){
            url+= key+'='+value
            bools = false
        }
        // else if (key == 'durer') url+= '&'+key+'='+value.replace(':','|')
        else url+= '&'+key+'='+value+''
    }
    return encodeURI(url)
}

/**
 * cache tout les element du tableau
 * @param {Array} element 
 */
export function disNone(element) {
    for (const user of element) {
        user.style.display = 'none'
    }
}

/**
 * cache l' element
 * @param {Array} el
 */
export function dibn(el) {
    el.style.display = 'none'
}
/**
 * affiche tout les element du tableau
 * @param {Array} el
 */
export function disbls(element,d='block') {
    for (const user of element) {
        user.style.display = d
    }
}
/**
 * affiche l' element
 * @param {Array} el
 */
export function disbl(user,d='block') {
    user.style.display = d
}
// message de confirmation de l'ajout d'un client
/**
 * affiche une notification
 * @param {string} classe
 * @param {string} msg 
 * @param {int} time 
 * @returns 
 */
export function msgSucces(classe = 'cl-v',msg='client ajouter avec succes',
    time=2) {
    const article = document.createElement('article')
    article.classList.add('msg',classe)
    article.innerHTML= '<div class="msgs">'+msg+'</div>'
    article.innerHTML += '<div class="croix"></div>'
    
    const averti = document.querySelector('.averti')
    try{averti.insertBefore(article,averti.firstChild)}
    catch{averti.append(article)}
    article.style.transform = 'linear 0.3s'

    article.querySelector('.croix').onclick = ()=>{
        setTimeout(() => {
            article.style.opacity = '0'
            setTimeout(() => {
                sectionFlou.removeChild(article)
            }, 500);
        }, 1000);
    }
    setTimeout(() => {
        article.style.opacity = '0'
        setTimeout(() => {
            article.remove()
        }, 500);
    }, time*1000);

    return article
}
/**
 * 
 * @param {Array} el 
 * @param {HTMLElement} div
*/
export function affch(el,div,sp=true) {
    
    div.innerHTML = ''
    if(!sp) div.innerHTML += "<option value=\"\">choisir un wifi</option>"
    for (const iterator of el) {
        div.innerHTML += sp ? '<span>'+iterator+'</span>'
        : "<option value="+iterator.replace(' ','|+-+|')+">"+iterator+'</option>'
    }
} 
/**
 * 
 * @param {HTMLElement} div 
 * @param {HTMLElement} load 
 * @param {boolean} sp 
 */
export function Recuwifi_S(div,load,sp=true) {
    if(sp){
        load.style.animationName = 'rotate'
    }
    else disbl(load)
    fec(urls.view)
    .then((result) => {
            if(sp){
                load.style.animationName = 'null'
            }
            else dibn(load)
        affch(result,div,sp)
    })
    .catch(l => msgSucces('cl-r','ERROR 001 <br> résseyer dans un moment ',2000,true))
    
}

/**
 * 
 * @param {HTMLPreElement} el 
 */
export function makeItem(el,i,password,status){
    el.innerHTML = 'essai<span class="alerts">'+i+'</span> |'
    el.innerHTML += 'mots de passe <span class="cl-n lower">'+password+'</span> |'
    el.innerHTML +=  'status <span class="cl-r">'+status+'</span>'
}

/**
 * 
 * @param {HTMLElement} el 
 */
export function annimContainer(el) {
    const signe = Math.round(Math.random())
    let pos = Math.round(Math.random()*300)
    pos = signe ? pos : -pos
    el.style.transition = 'none'
    el.style.transform = 'translate('+pos+'px,'+pos+'px)'
    el.style.transition = 'linear 2s'
    setTimeout(() => {
        el.style.transform = 'none'
        el.style.opacity = '1'
    }, 500);

}

export function contentPass(data,viewfich) {
    let j = 0
    let div
    viewfich.innerHTML = ''
    for (const iterator of data) {
        if (j%21 ==0){
            div = document.createElement('div')
            div.setAttribute('class','pos')
            viewfich.appendChild(div)
            ''.replace()
        }
        div.innerHTML += '<span class="nosp">'+iterator.replace('<','?').replace('</','??')+'</span>'
        j++
    }
}
/**
 * 
 * @param {HTMLElement} form 
 */
export function verifiInput(form) {
    const text = form.querySelector('textarea')
    const check = form.querySelector('input[type=checkbox]')
    if(text.value){
        return {mpd:text.value,deb:check.checked}
    }
    return false
}

/**
 * 
 * @param {Array} data 
 * @param {HTMLElement} section 
 */
export function wifidata(data,section) {
    
    const nom = section.querySelector('.nom .content')
    nom.innerHTML = ''

    const secu = section.querySelector('.sec .content')
    secu.innerHTML = ''

    const chiff = section.querySelector('.ch .content')
    chiff.innerHTML = ''

    const mdp = section.querySelector('.mdp .content')
    mdp.innerHTML = ''

    data.forEach(element => {
        if (element.info.length != 3){
            nom.innerHTML += '<div class="no-wifi">'+element.nom+'</div>'
            secu.innerHTML += '<div class="no-wifi">pas de securité</div>'
            chiff.innerHTML += '<div class="no-wifi">aucun chiffrement</div>'
            mdp.innerHTML += '<div class="no-wifi">aucun mots de passe</div>'
        }
        else{
            nom.innerHTML += '<div>'+element.nom+'</div>'
            secu.innerHTML += '<div>'+element.info[0] +'</div>'
            chiff.innerHTML += '<div>'+element.info[1] +'</div>'
            mdp.innerHTML += '<div>'+element.info[2] +'</div>'
        }
    });
}
/**
 * 
 * @param {boolean} format 
 * @param {Array} data 
 * @param {HTMLElement} balise 
 */
let annpr = 0
export function pre(format = true,data ='',balise) {
    clearInterval(annpr)

    balise.innerHTML =''
    let i = 0
    let content = ''
    if (!format) content = '{\n'
    
    for (let i = 1; i < 9; i++) {
        if (!format) content += '  "'+data[0]+i+'" : "'+data[1]+i+'"\n'
        else content += data[0]+i+' : '+data[1]+i+'\n'
    }
    if (!format) content += '}'
    annpr = setInterval(()=>{
        balise.innerHTML += content[i]
            
        // arret de l'interbale
        i == content.length-1? clearInterval(annpr) : i++
    },50)
}

/**
 * 
 * @param {HTMLElement} balise
 * @param {HTMLElement} fermer
 * @param {HTMLElement} pourcent
 * @param {HTMLElement} opt
*/
function restorepop(balise,fermer,pourcent,opt) {
    // disparution en douceux
    balise.style.opacity = '0'
    setTimeout(() => dibn(balise), 500);
    
    // cacher le bouton
    fermer.classList.remove('active')
    
    // retabli la couleur
    pourcent.previousElementSibling.classList.remove('cl-v')
    pourcent.previousElementSibling.classList.add('cl-b')
    pourcent.innerHTML = '0%'
    pourcent.previousElementSibling.style.width = '0%'

    opt.setAttribute('class','alerts')
    opt.innerHTML ='en cours'
}

/**
 * 
 * @param {HTMLElement} balise 
 * @param {boolean} name 
*/
export function annimch(balise,name=false,i) {
    if (name){
        balise.querySelector('h3 span').innerHTML = name
    }
    const fermer = balise.querySelector('button')
    const pourcent = balise.querySelector('.text')
    const opt = balise.querySelector('.footer .titre span')

    fermer.onclick = ()=> restorepop(balise,fermer,pourcent,opt)
    // balise.querySelector('.croix').onclick = ()=> restorepop(balise,fermer,pourcent,opt)
  
    const t = setInterval(()=>{
        let p = pourcent.innerHTML.split('%')[0]
        p++
        if (p == 100){
            opt.setAttribute('class','cl-v')
            opt.innerHTML ='terminer'
            fermer.classList.add('active')
            pourcent.previousElementSibling.classList.remove('cl-b')
            pourcent.previousElementSibling.classList.add('cl-v')
        }
        else{
            pourcent.previousElementSibling.classList.remove('cl-v')
            pourcent.previousElementSibling.classList.add('cl-b')
        }
        pourcent.previousElementSibling.style.width = p+'%'
        pourcent.innerHTML = p+'%'

        if (p >= 50)pourcent.style.color = '#fff'
        else pourcent.style.color = '#000'

        i == 0? clearInterval(t) : i--
    },30)
}