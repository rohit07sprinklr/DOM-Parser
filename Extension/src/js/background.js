function handleMessage(request) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, request);  
    });
  }
  
chrome.runtime.onMessage.addListener(handleMessage);    
