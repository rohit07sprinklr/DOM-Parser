function getFormURLEncoded(sourceArray){
    let dict = {};
    let encodedForm = [];
    sourceArray.forEach((item,id)=>{ dict[id] = item });
    Object.keys(dict).forEach(key => {
        encodedForm.push(encodeURIComponent('src') + "=" + encodeURIComponent(dict[key]));
    });
    encodedForm = encodedForm.join("&");
    return encodedForm;
}
function getImages(){
    const images = Array.from(document.querySelectorAll("img"));
    if(!images){
        return undefined
    }
    return getFormURLEncoded(images.map(item => item.src))
}
function getHeading(){
    const headings = Array.from(document.querySelectorAll("h1"));
    if(!headings){
        return undefined
    }
    return getFormURLEncoded(headings.map(item => item.innerText))
}
function getLinks(){
    const links = Array.from(document.querySelectorAll("a"));
    if(!links){
        return undefined
    }
    return getFormURLEncoded(links.map(item => item.href))
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
    switch(message.currentOption){
        case 'Heading':
            const headingform = getHeading();
            fetchResources(headingform);
            break;
        case 'Image':
            const imagesform = getImages(); 
            fetchResources(imagesform);
            break;
        case 'Link':
            const linkform = getLinks();
            fetchResources(linkform);
            break;
    }
});

