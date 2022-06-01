function handleMessage(request) {
    chrome.tabs.query({active: true, currentWindow: true})
    .then((tabs)=>{
      chrome.tabs.sendMessage(tabs[0].id, request);
    })
  }
  
chrome.runtime.onMessage.addListener(handleMessage);    
