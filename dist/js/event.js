"use strict";(()=>{var r=new Date("Oct 11, 2022 20:30:00 GMT+2"),c=setInterval(function(){let n=new Date().getTime(),e=r-n,t=Math.floor(e/(1e3*60*60*24)).toLocaleString(void 0,{minimumIntegerDigits:2}),o=Math.floor(e%(1e3*60*60*24)/(1e3*60*60)).toLocaleString(void 0,{minimumIntegerDigits:2}),i=Math.floor(e%(1e3*60*60)/(1e3*60)).toLocaleString(void 0,{minimumIntegerDigits:2}),m=Math.floor(e%(1e3*60)/1e3).toLocaleString(void 0,{minimumIntegerDigits:2});if(document.getElementById("days").innerHTML=t,document.getElementById("hours").innerHTML=o,document.getElementById("minutes").innerHTML=i,document.getElementById("seconds").innerHTML=m,e<0){clearInterval(c);let s=document.getElementById("during-event");document.getElementById("before-event").remove(),s.classList.remove("hide")}},0);})();
