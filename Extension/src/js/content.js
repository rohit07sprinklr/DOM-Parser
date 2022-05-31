function getFormURLencoded(sourceArray){
    let jsondata = {};
    sourceArray.map((item,id)=>{
        jsondata[id]=item;
    })
    let formBody = [];
    for (let id in jsondata) {
    let encodedKey = encodeURIComponent('src');
    let encodedValue = encodeURIComponent(jsondata[id]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}
function getImages(){
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

