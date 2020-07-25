chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {browserMessage: "tabCliked"})
  })
});
 

chrome.runtime.onMessage.addListener(
  function({message, links}, sender, sendResponse) {                      
     if (message === "dom-loaded"){

      axios({
        method:'get',
        url: `https://api.privacymonitor.com/score?q=${links}`
      })
      .then(res=>{
        console.log(res.status),
        console.log(res.data.score),
        console.log(res.data.previousScore),
        chrome.browserAction.setIcon({
          path: {
              19: "./images/active16.png",
              38: "./images/active16.png"
          }
    
        })
        chrome.storage.local.set({stat:res.status});
        chrome.storage.local.set({scores:res.data.score});
        chrome.storage.local.set({previous:res.data.previousScore});
        console.log('true')
      })
      .catch(error=>{
        if (error.response) {
        console.log(error.response.status)
        chrome.storage.local.set({stat:error.response.status});
        chrome.browserAction.setIcon({
          path: {
                19: "./images/off-button-16.png",
                38: "./images/off-button-16.png"
                }
            
          })
         console.log('false')
        }
      });
     }

});
       
            
