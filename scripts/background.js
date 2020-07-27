function Allinfo(){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];
    let url = new URL(tab.url)
    let domain = url.hostname;
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
       if (request.message === "domain"){  
        chrome.storage.local.set({dmne:domain});
       }})

    chrome.browserAction.onClicked.addListener(function(tab) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {browserMessage: "tabCliked"})
      })
    });
   

    if(domain.indexOf('www.') === 0){
      domain = domain.replace('www.','');
    }
    else if(domain.indexOf('web.') === 0){
      domain = domain.replace('web.','');
    }
    else if(domain.indexOf('docs.') === 0){
      domain = domain.replace('docs.','');
    }
    else if(domain.indexOf('m.') === 0){
      domain = domain.replace('m.','');
    }
    else if(domain.indexOf('ru.') === 0){
      domain = domain.replace('ru.','');
    }
   
    axios({
      method:'get',
      url: `https://api.privacymonitor.com/score?q=${domain}`
    })
    .then(res=>{
      console.log(res.status),

      chrome.browserAction.setIcon({
        path: {
            19: "./images/active16.png",
            38: "./images/active16.png"
        }
  
      })
      console.log(domain)
      chrome.storage.local.set({sta:res.status});
      chrome.storage.local.set({scores:res.data.score});
      chrome.storage.local.set({previous:res.data.previousScore});
      console.log('true')
    })
    .catch(error=>{
      if (error.response) {
      console.log(error.response.status)
      chrome.storage.local.set({sta:error.response.status});
      chrome.browserAction.setIcon({
        path: {
              19: "./images/off-button-16.png",
              38: "./images/off-button-16.png"
              }
          
        })
       console.log('false')
      }
    });

  })
}
chrome.tabs.onActivated.addListener(function() {
Allinfo() 
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
Allinfo()
})


