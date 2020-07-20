let cleaned_host = window.location.hostname;

location.host.indexOf('www.') && location.host || location.host.replace('www.', '');
location.host.indexOf('web.') && location.host || location.host.replace('web.', '');
location.host.indexOf('docs.') && location.host || location.host.replace('docs.', '');
location.host.indexOf('m.') && location.host || location.host.replace('m.', '');
location.host.indexOf('ru.') && location.host || location.host.replace('ru.', '');

console.log(cleaned_host)
axios({
  method:'get',
  url: `https://api.privacymonitor.com/score?q=${cleaned_host}`
})
.then(res=>{
  console.log(res.status),
  console.log(res.data.score),
  console.log(res.data.previousScore),
  chrome.runtime.sendMessage({changeIcon: "true"});
  chrome.storage.local.set({stat:res.status});
  chrome.storage.local.set({scores:res.data.score});
  chrome.storage.local.set({previous:res.data.previousScore});
  
})
.catch(error=>{
  if (error.response) {
  console.log(error.response.status)
  chrome.storage.local.set({stat:error.response.status});
  chrome.runtime.sendMessage({changeIcon: "false"});
  console.log('false')
  }
});