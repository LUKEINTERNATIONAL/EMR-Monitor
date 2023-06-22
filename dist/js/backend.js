function submitParameters(parameters, url, returnToFunction) {
  loader_up()
  var parametersPassed = JSON.stringify(parameters);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      loader_down()
      alert("Saved Successfully")
      window.location.reload()
      // try {
      //   var obj = JSON.parse(this.responseText);
      //   eval(returnToFunction)(obj);
      // } catch (error) {
        
      // }
    }
    else if(this.status == 401){
      window.location = "/pages/login.html"
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}
  
  
function getData(url,returnToFunction) {
  loader_up()
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      loader_down()
      var obj = JSON.parse(this.responseText);
      eval(returnToFunction)(obj);
    }else if(this.status == 401){
      window.location = "/pages/login.html"
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function deleteData(url) {
  if(sessionStorage.getItem('is_superuser')){
    if (confirm('Are you sure you want to delete this element?')) {
      loader_up()
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        loader_down()
        if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        alert("Successfully deleted")
        window.location.reload()
        }else if(this.status == 401){
          window.location = "/pages/login.html"
        }
      };
      xhttp.open("DELETE", url, true);
      xhttp.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"));
      xhttp.setRequestHeader('Content-type', "application/json");
      xhttp.send();
    }
  }
  else{
    alert("You do not have permission to perform this action")
  }
}

function getFormData(){
  event.preventDefault();
    form = $("form").serializeArray()
    data = {}
    for(const e of form) {
      data[e.name] = e.value
    }
    return data;
}

function updateData(parameters,url) {
  if(sessionStorage.getItem('is_superuser')){
    loader_up()
    var parametersPassed = JSON.stringify(parameters);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        loader_down()
        alert("Successfully updated")
        window.location.reload()
        // alert("Saved Successfully")
        // window.location.reload()
        // try {
        //   var obj = JSON.parse(this.responseText);
        //   eval(returnToFunction)(obj);
        // } catch (error) {
          
        // }
      }
      else if(this.status == 401){
        window.location = "/pages/login.html"
      }
    };
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send(parametersPassed);
  }
  else{
    alert("You do not have permission to perform this action")
  }
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function loader_up() {
  $('#loader-3').attr('style','')
  $('#cover').attr('style','')
}
function loader_down() {
  $('#loader-3').attr('style','display:none')
  $('#cover').attr('style','display:none')
}

function vpn_status(status){
  console.log(status.vpn)
  if(status.vpn != "False")
    $("#vpn_status").attr('style','color:green')
  else
    $("#vpn_status").attr('style','color:red')
}
function internet_status(status){
  console.log(status.internet)
  if(status.internet != "False")
    $("#internet_status").attr('style','color:green')
  else
    $("#internet_status").attr('style','color:red')
}
function refresh(){
  getData(base_url+'vpn/vpn_status','vpn_status')
  getData(base_url+'vpn/internet_status','internet_status')
}
setInterval(function() {
  refresh();
}, 200000);
refresh();
style=`
<style>
/*Horizontal circles as bars loader-3 */
#cover{
  background: black;
width: 100%;
position: absolute;
z-index: 1000;
top: 0px;
hieght: 1000px;
height: 100%;
opacity: 0.5;
}
#loader-3 #loader{
	position: absolute;
	width: 2vw;
	height: 2vw;
	background: rgb(255,0,0);
	top:50%;
	left: 50%;
	border-radius: 50%;
    z-index: 1500;
    -webkit-animation: forward 2.3s linear infinite;
    -moz-animation: forward 2.3s linear infinite;
    -o-animation: forward 2.3s linear infinite;
    animation: forward 2.3s linear infinite ;
}

#loader-3 > #loader:nth-of-type(1) {
	-webkit-animation-delay: -0.46s;
	-moz-animation-delay: -0.46s;
	-o-animation-delay: -0.46s;
		animation-delay: -0.46s;
}

#loader-3 > #loader:nth-of-type(2) {
	-webkit-animation-delay: -0.92s;
	-moz-animation-delay: -0.92s;
	-o-animation-delay: -0.92s;
		animation-delay: -0.92s;
}
#loader-3 > #loader:nth-of-type(3) {
	-webkit-animation-delay: -1.38s;
	-moz-animation-delay: -1.38s;
	-o-animation-delay: -1.38s;
		animation-delay: -1.38s;
}
#loader-3 > #loader:nth-of-type(4) {
	-webkit-animation-delay: -1.84s;
	-moz-animation-delay: -1.84s;
	-o-animation-delay: -1.84s;
		animation-delay: -1.84s;
}

/*keyframes for forward animations*/

@-webkit-keyframes forward {
	0% {
		left: 40%;
		opacity: 0;
		background: rgb(255,255,0);
	}
	10% {
		left: 45%;
		opacity: 1;
	}
	90% {
		left: 55%;
		opacity: 1;
	}
	100% {
		left: 62%;
		opacity: 0;
	}
}

@-moz-keyframes forward {
	0% {
		left: 40%;
		opacity: 0;
		background: rgb(255,255,0);
	}
	10% {
		left: 45%;
		opacity: 1;
	}
	90% {
		left: 55%;
		opacity: 1;
	}
	100% {
		left: 62%;
		opacity: 0;
	}
}

@-o-keyframes forward {
	0% {
		left: 40%;
		opacity: 0;
		background: rgb(255,255,0);
	}
	10% {
		left: 45%;
		opacity: 1;
	}
	90% {
		left: 55%;
		opacity: 1;
	}
	100% {
		left: 62%;
		opacity: 0;
	}
}

@keyframes forward {
	0% {
		left: 40%;
		opacity: 0;
		background: rgb(255,255,0);
	}
	10% {
		left: 45%;
		opacity: 1;
	}
	90% {
		left: 55%;
		opacity: 1;
	}
	100% {
		left: 62%;
		opacity: 0;
	}
}
</style>
`
ll = `
<div id="cover" style="display:none"></div>
<div class="loader-wrapper" id="loader-3" style="display:none">
  <div id="loader"></div>
  <div id="loader"></div>
  <div id="loader"></div>
  <div id="loader"></div>
  <div id="loader"></div>
</div>`
$('body').append(style)
$('body').append(ll)

