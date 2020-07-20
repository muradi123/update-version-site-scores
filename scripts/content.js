chrome.storage.sync.get(['stat'], function(result) {
  if(result.stat === 200){
    chrome.runtime.sendMessage({changeIcon: "true"});
  }
  if(result.stat ==404){
    chrome.runtime.sendMessage({changeIcon: "false"});
  }
});


let notSucsess =
 `<div class="modal-div">
    <div class="flex-div">
      <div class="closex">
        <div class="line-one-qrt"></div>
        <div class="line-two-qrt"></div>
     </div>
     <div class="text-user"> Dear user you can request us to analyze and score the web site</div>
     <span class= "click-buttonre">Analyze</span>
    </div>
  </div>`
;
 
chrome.runtime.onMessage.addListener(
  function({message}, sender, sendResponse) {
  
    if (message === "cliked"){

      chrome.storage.local.get(['stat','scores','previous'], function(result) {
        if(result.stat === 200){
          let succsesHtml = `
          <div class="sucsses-main-qrt">
          <div class="first-div-qrt">
          <div class="first-div-main-qrt">
          <div class="privacy-text-qrt">privacy<span style="color:#336d88; font-weight:bolder">monitor</span></div>
          <div class="close-qrt">
          <div class="line-one-qrt"></div>
          <div class="line-two-qrt"></div>
          </div>
          </div>
          </div>
          <div class="second-div-qrt">
          <div class="site-name-qrt">${cleaned_host}</div>
          <div class="bottom-div-qrt">
          <canvas id="circle"></canvas>
          <div class="main-info-qrt">
          <div class="scores-qrt">scores:${result.scores}</div>
          <div>
          <p class="pCol"> </p>
          <p class="range">previous scores</p>
         </div>
         </div>
         </div>
         </div>
         </div>`;

          console.log('true')
          document.body.innerHTML += succsesHtml;
          $('.sucsses-main-qrt').nextAll('div').remove();
          if(result.scores===result.previous){
            console.log('same')
            $('.range').text('No change');
            $('.range').css('color','#336d88')
          }
          
          if(result.scores > result.previous){
           console.log('increase')
           $('.range').text('Increase');
           $('.range').css('color','#ade498')
         }
         if(result.scores > result.previous){
           console.log('Decrease')
           $('.range').text('Decrease');
           $('.range').css('color','e84a5f')
         }
          let canvas = document.getElementById("circle");
          let widthC = "120";
          let heightC="120";
          canvas.width = widthC;
          canvas.height = heightC;
          let ctx = canvas.getContext("2d");
          let percent = result.scores/10;
          
          ctx.beginPath();
          ctx.arc(widthC/2,heightC/2, 45, 0, Math.PI * 2);
          ctx.strokeStyle = "#f7fbe1";
          ctx.lineWidth = 8;
          ctx.stroke();
          ctx.closePath();
          
          let angle = percent/100*360;
          ctx.beginPath();
          ctx.arc(widthC/2, heightC/2, 45, -90 * Math.PI/180, (angle - 90) * Math.PI/180);
          if(percent > 30 && percent < 49){
            ctx.strokeStyle = "#fe91ca";
            $('.pCol').text('Very Poor')
            $('.pCol').css('color', '#fe91ca')
           }
          if(percent > 50 && percent < 69){
            ctx.strokeStyle = "#df5e88";
            $('.pCol').text('Fair')
            $('.pCol').css('color', '#df5e88')
           }
           if(percent > 70 && percent < 79){
            ctx.strokeStyle = "#6a2c70";
            $('.pCol').text('Good')
            $('.pCol').css('color', '#6a2c70')
           }
           if(percent > 80 && percent < 89){
            ctx.strokeStyle = "#336d88";
            $('.pCol').text('Very Good')
            $('.pCol').css('color', '#336d88')
           }
           if(percent > 90 && percent < 99){
            ctx.strokeStyle = "#092532";
            $('.pCol').text('Exceptional')
            $('.pCol').css('color', '#092532')
           }
          ctx.lineWidth = 8;
          ctx.stroke();
          ctx.closePath();
          ctx.textBaseline = "middle";
          ctx.textAlign = "center";
          ctx.font = "40px arial bold";
          ctx.fillStyle = "#fff"
                     


          $('.close-qrt').click(function(){
            $(this).parent().parent().parent().remove();
           });
         
        }
        else{
            console.log('false')
            document.body.innerHTML += notSucsess;
            $('.modal-div').nextAll('div').remove();
            $('.closex').click(function(){
              $(this).parent().parent().remove();
            })
            $('.click-buttonre').click(function(){
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

              let pT= document.createElement('div');
              let pInner = $(pT).text('request sent');
              $('.text-user').html(pInner);
              setTimeout(() =>{
              $('.modal-div').remove();
              },2000)
               
                
            });
            

            });   
           }
        });
      }

});







