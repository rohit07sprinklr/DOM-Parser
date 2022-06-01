document.querySelector('form').addEventListener('change',function(){
    // use switch case for such cases. makes code more readable.
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
