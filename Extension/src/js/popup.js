document.querySelector('form').addEventListener('change',function(){
    if(document.getElementById('h1').checked){
        chrome.runtime.sendMessage({
            currentOption: 'Heading',
        })
    }else if(document.getElementById('image').checked){
        chrome.runtime.sendMessage({
            currentOption: 'Image',
        })
    }else{
        chrome.runtime.sendMessage({
            currentOption: 'Link',
        })
    }
})
