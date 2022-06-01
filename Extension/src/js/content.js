// function name should be like this => getFormURLEncoded
function getFormURLencoded(sourceArray){
    let jsondata = {};
    //wrong use of map. map is used to return a new array not perform some operations on original array. we use forEach for that.
    //use functional programming. 
    sourceArray.map((item,id)=>{
        jsondata[id]=item;
    })
    let formBody = [];
    //Do NOT use for loop unless necessary. //Again use functional programming.
    for (let id in jsondata) {
    let encodedKey = encodeURIComponent('src');
    let encodedValue = encodeURIComponent(jsondata[id]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}
function getImages(){
    /**
     * better way to write this function is to use early return makes it more readable=> 
     * 
     * const images = Array.from(document.querySelectorAll("img"));
     * 
     * if(!images){
     *  return undefined
     * }
     * 
     * return getFormURLencoded(images.map(item => item.src))
     * 
     * 
     */
    const images = Array.from(document.querySelectorAll("img"));
    if(images){
        const imagesources = images.map(item => item.src)
        return getFormURLencoded(imagesources);
    }
    else{
        return undefined;
    }
}
function getHeading(){
    //Only h1 works.
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    if(headings){
        const headingsources = headings.map(item => item.innerText)
        return getFormURLencoded(headingsources);
    }
    else{
        return undefined;
    }
}
function getLinks(){
    const links = Array.from(document.querySelectorAll("a"));
    if(links){
        const linksource = links.map(item => item.href);
        return getFormURLencoded(linksource);
    }
    else{
        return undefined;
    }
}
async function fetchResources(resourceform){
    fetch('http://localhost:3000/resources',{
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: resourceform
    })
}

chrome.runtime.onMessage.addListener((message) => {
    if(message.currentOption == 'Heading'){
        const headingform = getHeading();
        fetchResources(headingform);
    }
    else if(message.currentOption == 'Image'){
        const imagesform = getImages(); 
        fetchResources(imagesform);
    }
    else if(message.currentOption == 'Link'){
        const linkform = getLinks();
        fetchResources(linkform);
    }
});

