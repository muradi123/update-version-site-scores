let cleaned_host = location.host;

if(location.host.indexOf('www.') === 0){
  cleaned_host = location.host.replace('www.','');
}
else if(location.host.indexOf('web.') === 0){
  cleaned_host = location.host.replace('web.','');
}
else if(location.host.indexOf('docs.') === 0){
  cleaned_host = location.host.replace('docs.','');
}
else if(location.host.indexOf('m.') === 0){
  cleaned_host = location.host.replace('m.','');
}
else if(location.host.indexOf('ru.') === 0){
  cleaned_host = location.host.replace('ru.','');
}


console.log(cleaned_host);


chrome.runtime.sendMessage({message:"dom-loaded", links:cleaned_host});

chrome.runtime.onMessage.addListener(
  function({browserMessage}, sender, sendResponse) {
    if (browserMessage === "tabCliked"){  
      chrome.storage.local.get(['stat', 'scores', 'previous', 'domain' ], function(result) {
      if(result.scores && result.stat === 200){
        let succsesHtml = `
        <div class="mtdfvf-vdfgvd-vgnnbr-345g">
         <div class="mtfds-vdvdf-34yhn-dvvd">
         <div class="mtrtr-vdvdfg-re43-gfdgre">privacy<span style="color:#336d88; font-weight:bolder">monitor</span></div>
         <div class="mtrg-fsfs-432-34tg-43t3">
         <div class="mtdfd-gdf-dfbdfb-45334fv-vdvd"></div>
         <div class="mt-dfgd-gdfgd-34fvbc-bfd"></div>
         </div>
         </div>
         <div class="mtfd-dvfg-dfbtn-bgfb"></div>
         <div>
         <div class="mtv-fgdgb-y65-gh4">${cleaned_host}</div>
         </div>
         <div class="mtcs-fsvsv-bfdgbfg">
         <canvas id="mtsdsf-bfvdf-4534bg-dfbf"></canvas>
         <div class="mtbfgb-htyht-45ggfb">
         <div class="mgdf-gdg-dgfdh">scores:${result.scores}</div>
         <div>
         <div class="pCol"></div>
         <div class="mtvd-dgfd-fdvd-gerg">
         <div>trend:</div>
         <div class="mtfvv-gdgdf-dfvd">
         </div>
         </div>
        </div>
        </div>
         </div>
        </div>
       `;

        console.log('true')
        document.body.innerHTML += succsesHtml;
        $('.mtrg-fsfs-432-34tg-43t3').click(function(){
          $(this).parent().parent().remove();
         });
        $('.mtdfvf-vdfgvd-vgnnbr-345g').nextAll('div').remove();
        if(result.scores===result.previous){
          console.log('same')
          $('.mtfvv-gdgdf-dfvd').text('No change');
          $('.mtfvv-gdgdf-dfvd').css('color','#336d88')
        }
        
        if(result.scores > result.previous){
         console.log('increase')
         $('.mtfvv-gdgdf-dfvd').text('Increase');
         $('.mtfvv-gdgdf-dfvd').css('color','#79d70f')
       }
       if(result.scores < result.previous){
         console.log('Decrease')
         $('.mtfvv-gdgdf-dfvd').text('Decrease');
         $('.mtfvv-gdgdf-dfvd').css('color','#e84a5f')
       }
        let canvas = document.getElementById("mtsdsf-bfvdf-4534bg-dfbf");
        let widthC = "120";
        let heightC="120";
        canvas.width = widthC;
        canvas.height = heightC;
        let ctx = canvas.getContext("2d");
        let percent = result.scores/10;
        
        ctx.beginPath();
        ctx.arc(widthC/2,heightC/2, 45, 0, Math.PI * 2);
        ctx.strokeStyle = "#e4e3e3";
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.closePath();
        
        let angle = percent/100*360;
        ctx.beginPath();
        ctx.arc(widthC/2, heightC/2, 45, -90 * Math.PI/180, (angle - 90) * Math.PI/180);
        if(percent > 30 && percent < 49){
          ctx.strokeStyle = "#f54291";
          $('.pCol').text('Very Poor')
          $('.pCol').css('color', '#f54291')
         }
        if(percent > 50 && percent < 69){
          ctx.strokeStyle = "#be5683";
          $('.pCol').text('Fair')
          $('.pCol').css('color', '#be5683')
         }
         if(percent > 70 && percent < 79){
          ctx.strokeStyle = "#6a197d";
          $('.pCol').text('Good')
          $('.pCol').css('color', '#6a197d')
         }
         if(percent > 80 && percent < 89){
          ctx.strokeStyle = "#1b6ca8";
          $('.pCol').text('Very Good')
          $('.pCol').css('color', '#1b6ca8')
         }
         if(percent > 90 && percent < 99){
          ctx.strokeStyle = "#1f4068";
          $('.pCol').text('Exceptional')
          $('.pCol').css('color', '#1f4068')
         }
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.closePath();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "40px arial bold";
        ctx.fillStyle = "#fff";
                  
      console.log('work')
      }
      else{
        let notSucsess =
        `<div class="mteece-434ggf-gbfgd-jmh">
         <div class="mtefsd-3rfdv3-fdvdv-asdc">
           <div class="mtxcd-dsdsgr-343dss-334fd">
           <div class="mtrtr-vdvdfg-re43-gfdgre">privacy<span style="color:#336d88; font-weight:bolder">monitor</span></div>
           <div class="mtrg-fsfs-432-34tg-43t3">
           <div class="mtdfd-gdf-dfbdfb-45334fv-vdvd"></div>
           <div class="mt-dfgd-gdfgd-34fvbc-bfd"></div>
        </div>
           </div>
           <div class="effvd-42dfdvd-3dss-vdbd"></div>
           <div class="fvxvdf-gdfa-bgdbfv-asdsd">
           Sorry, we haven't reviewed ${cleaned_host} yet.<br/>
           <div class="fcsdf-dffv-34rdf-43trf"></div>
           If you would like us to add it to the queue for our legal experts to review, hit the "Request" button now.
           </div>
           <button id="fsfd-bbrdfb4-g45t-45t3-34gf">Request</button>
         </div>
        </div>
        `
       ;
       console.log('false')
       document.body.innerHTML += notSucsess;
       if(result.domain === this.window.location.hostname){
   
        console.log(result.domain)
    
        $('.fvxvdf-gdfa-bgdbfv-asdsd').html('Your request has been received. Please allow up to 10 business days for this site to be reviewed.');
        $('#fsfd-bbrdfb4-g45t-45t3-34gf').remove();
        $('.mteece-434ggf-gbfgd-jmh').css('height','150px');
        setTimeout(()=>{
          $('.mteece-434ggf-gbfgd-jmh').remove();
        },2000)
             
      }
       $('.mteece-434ggf-gbfgd-jmh').nextAll('div').remove();
       $('.mtrg-fsfs-432-34tg-43t3').click(function(){
         $(this).parent().parent().parent().remove();
       });
     
       $('#fsfd-bbrdfb4-g45t-45t3-34gf').click(function(){
        chrome.storage.local.set({domain:cleaned_host});
       $(this).remove();
       axios({
         method:'get',
         url: `https://api.privacymonitor.com/score?q=${cleaned_host}`
       })
       .then(res=>{
         document.body.innerHTML += succsesHtml;
         $('.sucsses-main-qrt').nextAll('div').remove();
         
       })
       .catch(error=>{
         let div = document.createElement('div');
         let divText = $(div).text('request sent');
         $('.fvxvdf-gdfa-bgdbfv-asdsd').html(divText);
         setTimeout(() =>{
         $('.mteece-434ggf-gbfgd-jmh').remove();
         },2000)
          
           
       });
       

       });   
      }
    })
    
  }
})
