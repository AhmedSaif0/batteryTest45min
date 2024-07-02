// importing html elmements  timestart1 btr charging
let stoptimer ;
let startButt = document.getElementById("start");
let div1 =  document.getElementById("div1")
let icon =  document.getElementById("icon")
let btry ;
let diffrent ;
let testDuration = 5;
let passDiffrent = 3;
let levelpass = document.querySelector('.levelpass')
let levelfail = document.querySelector('.levelfail')
let testDuration_Dom = document.querySelector('.testduration')
let firstItemValue ;
let lastItemValue ;

//writ test duration in the page
testDuration_Dom.innerHTML = `Note: The test will run for ${testDuration} minutes`;

// this function will display hours: minutes :ampm 
function myTimer(){
   const date = new Date();
         var hours = date.getHours();
         var minutes = date.getMinutes();
         var ampm = hours >= 12 ? 'PM' : 'AM';
         hours = hours % 12;
         hours = hours ? hours : 12; // the hour '0' should be '12'
         minutes = minutes < 10 ? '0'+minutes : minutes;
         stime = hours +":"+ minutes +":"+ ampm 
        return stime
 }

myTimer()

var myTimerex = myTimer();

// Battery info Api
function starTime() {
  navigator.getBattery().then(function (battery) {
    function updateAllBatteryInfo() {
            updateChargeInfo();
            updateLevelInfo();
            // updateChargingInfo();
            // updateDischargingInfo();
          }

        // if(battery.charging){
        // alert("please unpluge the charger : يرجى فصل الشاحن")
        // window.location.reload();
        // }



        //starting time TIME 
        let timeSt = document.getElementById("timestart1").innerHTML = ` ${myTimerex}`;

        // THE TIMER
        var count = 0;
        let minutes = 0

  function timer() {
          count = count + 1;
          if (count == 0) {
            // clearInterval(counter);
            return;
          }
          seconds = count % 60;
          seconds = seconds < 10 ? '0'+seconds : seconds;
          minutes = Math.floor(count / 60);
          var hours = Math.floor(minutes / 60);
          minutes %= 60;
          document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds + " "; 
          let timervar =  " Timer "+ hours +" : "+ minutes 
          localStorage.setItem('timer' , timervar)
       
          if( minutes === testDuration || diffrent > passDiffrent ) {
              timeOut();
           }
      
        }

        // level discharge counter
        let leveltimerdiv = document.querySelector('.leveltimer')
        let timerSeconds = 0;
        let timerMinutes = 0;
        let timerResult ;
        let leveldiff ;

function leveltimer () {
        timerSeconds++;
        if (timerSeconds >= 60) {
            timerSeconds = 0;
            timerMinutes++;
        }

        timerResult = ` ${timerMinutes}: ${timerSeconds}`;
        leveltimerdiv.innerText = timerResult ;
        };

        var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
        setInterval(leveltimer, 1000); //1000 will  run it every 1 second


        //stoping timer and show result
 const timeOut = () => {
        clearInterval(counter);
        clearInterval(starTime)
        document.getElementById('instrct').style.display = "none";

        if (diffrent >= 0 && diffrent < passDiffrent && minutes === testDuration) {
        document.getElementById("time").classList.add('pass');
          // Create a new h1 element
          var newHeading = document.createElement("h1");
          // icon.removeChild(div1)
          icon.appendChild(newHeading);
          newHeading.classList.add('passicon')
          document.querySelector('.passicon').textContent = "Test passed, discharged"+ ' ' +`${diffrent}%`+ ' in '+ `${minutes}`+ ' minutes';

        } else if ( diffrent > passDiffrent) {
          document.getElementById("time").classList.add('pass');
          // Create a new h1 element
          var newHeading = document.createElement("h1");
          // icon.removeChild(div1)
          icon.appendChild(newHeading);
          newHeading.classList.add('passicon')
        const passIconElement = document.querySelector('.passicon')
          passIconElement.textContent  = "Test Failed, discharged" +' '+ `${diffrent}%`+ ' in '+ `${minutes}` + ' minutes';

          passIconElement.classList.remove('passicon')
          passIconElement.classList.add('red')
          document.getElementById("time").classList.add('fail');
        }
  
            levelpass.innerHTML = "Start " + `${firstItemValue}`
            levelfail.innerHTML = "Finsh " + `${lastItemValue}`
        }





        updateAllBatteryInfo();
        battery.addEventListener("chargingchange", () => {
        updateChargeInfo();
        });

        //Yes or no charging
  function updateChargeInfo() {
          document.getElementById("demo").innerHTML = ` ${battery.charging ? " Yes" : " No" }`;
        }



        //Battery level change listner
        battery.addEventListener("levelchange", () => {
        console.log(timerResult)
        leveldiff = timerResult
        updateLevelInfo();
        timerSeconds = 0;
        timerMinutes = 0;
        });

        /////////// battery level ///////////
      function updateLevelInfo( ) {
            // Set Battery level on charging 
              let  batteryy =  Math.floor(battery.level * 100) 
              const btrPresentage =[90,80,70,60,50,40,30,20,10,5,1]
              const ifpresent = btrPresentage.includes(batteryy);
              let btry = document.getElementById("btr")
              // if code its same code in each 
              if( ifpresent ){
                const para = document.createElement("p");
                para.classList.add("levelpara");
                para.innerText = "Battery level " + `${ batteryy}%` + "\n";
                btry.prepend(para) 

              }else{
                const para = document.createElement("p");
                para.classList.add("levelpara");
                para.innerText = "Battery level " + `${ batteryy}%` + "\n";
                btry.prepend(para) 
                // btry.prepend("Battery level " + `${ batteryy}%` + "\n") 
              }

          // Set Time on charging 
                const date = new Date();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + '  '+ ampm +"   "+`  -   ${ leveldiff}` + "\n";
                let timeCharching = strTime
                let chrdiv = document.querySelector('#charging')


                if( ifpresent ){
                const par = document.createElement("p");
                par.classList.add("leveltime");
                par.innerText = timeCharching;
                chrdiv.prepend(par)            

                }else{
                  chrdiv.prepend(timeCharching);
 
                  }

                // Get level diffrent 
                const items = document.querySelectorAll(".levelpara");
                firstItemValue = items[items.length - 1].textContent;
                lastItemValue = items[0].textContent; 
        
                let  batteryst = 0
                let  batteryen = 0
                const regex = /(\d+)%/;
                const match = firstItemValue.match(regex);
        
                if (match) {
                  const numericValue = parseInt(match[1]); // Extract the captured group and convert to a number
                  batteryst = numericValue
                } else {
                    console.log("start value");
                }
        
                const regexEN = /(\d+)%/;
                const matchEN = lastItemValue.match(regexEN);
        
                if (matchEN) {
                const numericValueEN = parseInt(matchEN[1]); // Extract the captured group and convert to a number
                // console.log(numericValueEN); // Output: 100
                batteryen = numericValueEN
                } else {
                    console.log("end value ");
                }
        
                diffrent = batteryst - batteryen;

        //  ADD DATA TO LOCAL STORAGE



        function restored() {// take value or js value no the text or sho presents from storege
                var time = " " + timeCharching;
                var battery = "Battery level   " + batteryy + "% = ";
                let myInfo =  battery + time;

          if(localStorage.getItem('info') == null){
                localStorage.setItem('info', '[]');
              } 

                let dataget = JSON.parse(localStorage.getItem('info'));
                dataget.unshift(myInfo);
                localStorage.setItem('info', JSON.stringify(dataget));
        }
        restored()
      }

        // discharging time
        battery.addEventListener("dischargingtimechange", () => {
        updateDischargingInfo();
        });

        function updateDischargingInfo() {
                var distime =  battery.dischargingTime ;
                var minutes = Math.floor(distime / 60);
                var hours = Math.floor(minutes / 60);
                minutes %= 60;
                hours %= 60;
          if(battery.charging ){  
              document.getElementById("demo2").innerHTML = " Charging  " 
            }else{
              document.getElementById("demo2").innerHTML = " Discharging time "+ hours+" : "+ minutes +" hrs"
            }       
              
        }
            updateDischargingInfo();
            
});

        document.getElementById("start").disabled = 'true';

 }

     // function restor history 
function restored() {
          document.getElementById('otest').innerHTML = " Restored Test Data"
      let timerRestor = localStorage.getItem('timer')
          document.getElementById("timerRs").innerHTML = timerRestor;
      let dataget = JSON.parse(localStorage.getItem('info'));

      // MAP on dataget
      dataget.map( (x, i) => {
      var tag = document.createElement("p");
      var text = document.createTextNode(x);
      tag.appendChild(text);
      var element = document.getElementById("demo3");
      element.appendChild(tag);
      let ind =+ i + 10
      if(ind % 10 == 0){
      tag.classList.add("red");

      }
      })
        // Restore Notes
        let val =  localStorage.getItem("user") ;
        document.getElementById("textarea").value = val;
        document.getElementById("restor").disabled = 'true';

      }


      // FUNC CLEAR AND REFRESH
function clearData (){
      localStorage.clear();
      var element = document.getElementById("demo3").innerHTML = " "
      window.location.reload();

      }
   
// TEXTAREA RESTORE
// document.getElementById("textareabtn").addEventListener("click", function ()
//    {
//        var user = document.getElementById("textarea").value ;
//        //localStorage["user"] = user ;
//        localStorage.setItem("user", user) ;
//        alert("saved") ;
//        localStorage.setItem("user", user) ;
         
//    } , false);

  function pauseTimer() {
        clearInterval(starTime);
        clearInterval(myTimer);
        clearInterval(timer);
      }
