function submitParameters(parameters, url, returnToFunction) {
  loader_up()
  var parametersPassed = JSON.stringify(parameters);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 ){
        if ( (this.status == 201 || this.status == 200)) {
          loader_down()
          showPopup("Saved Successfully",true)
          window.location.reload()
          // try {
          //   var obj = JSON.parse(this.responseText);
          //   eval(returnToFunction)(obj);
          // } catch (error) {
            
          // }
        }
        else if(this.status == 401){
          window.location = "/pages/login.html"
        }else {
          popup_message_display(this)
      }
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}

function popup_message_display(resp){
  try {
    var errorResponse = JSON.parse(resp.responseText);
    if (errorResponse && errorResponse.error) {
        showPopup("Error: " + errorResponse.error, false);
    } else
    if (errorResponse && errorResponse.detail) {
        showPopup("Detail: " + errorResponse.detail, false);
    } else {
        showPopup("Request failed with status: " + resp.status, false);
    }
  } catch (error) {
      showPopup("Request failed with status: " + resp.status, false);
  }

}
  
function getData(url,returnToFunction,loader='yes') {
  if(loader=='yes')
    loader_up()
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4){
      if ( (this.status == 201 || this.status == 200)) {
        if(loader=='yes')
          loader_down()
        var obj = JSON.parse(this.responseText);
        eval(returnToFunction)(obj);
      }else if(this.status == 401){
        window.location = "/pages/login.html"
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function deleteData(url) {
    if (confirm('Are you sure you want to delete this element?')) {
      loader_up()
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        loader_down()
        if(this.readyState == 4){
          if ((this.status == 201 || this.status == 200)) {
            showPopup("Successfully deleted",true)
          window.location.reload()
          }else if(this.status == 401){
            window.location = "/pages/login.html"
          }else
          {
            popup_message_display(this)
          }
        }
      };
      xhttp.open("DELETE", url, true);
      xhttp.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"));
      xhttp.setRequestHeader('Content-type', "application/json");
      xhttp.send();
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
    loader_up()
    var parametersPassed = JSON.stringify(parameters);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4){
        if ( (this.status == 201 || this.status == 200)) {
          loader_down()
          showPopup("Successfully updated",true)
          window.location.reload()
          // window.location.reload()
          // try {
          //   var obj = JSON.parse(this.responseText);
          //   eval(returnToFunction)(obj);
          // } catch (error) {
            
          // }
        }
        else if(this.status == 401){
          window.location = "/pages/login.html"
        }else
        {
          popup_message_display(this)
        }
      }
    };
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send(parametersPassed);
  
}
function showPopup(message, isSuccess) {
  var popup = document.getElementById("popup");
  var popupText = document.getElementById("popupText");

  popupText.textContent = message;

  if (isSuccess) {
    popup.className = "popup success";
  } else {
    popup.className = "popup error";
  }

  popup.style.visibility = "visible";
  popup.style.opacity = 1;

  setTimeout(function() {
    popup.style.visibility = "hidden";
    popup.style.opacity = 0;
    location.reload()
  }, 5000); // 5000 milliseconds = 5 seconds
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
  var loader = 'no'
  getData(base_url+'vpn/vpn_status','vpn_status',loader)
  getData(base_url+'vpn/internet_status','internet_status',loader)
}

function calculateTimeDifference(startDateTime, endDateTime) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const differenceInMilliseconds = end - start;

  const minutesDifference = differenceInMilliseconds / (1000 * 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const remainingMinutes = minutesDifference % 60;

  $('#spend_time').html("Spent Time Per Day: <b>("+parseInt(hoursDifference)+" Hours, "+ parseInt(remainingMinutes)+" Minutes)</b>")
  console.log(parseInt(hoursDifference)+" Hours, "+ parseInt(remainingMinutes)+" Minutes")
}

function _trackusers(){
  data = {
    'login_page': 'false',
    'other_page': 'true'
  }
  $.ajax({
    type: "POST",
    data: data,
    url: base_url + "trackusers/",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', sessionStorage.getItem("Authorization"))
    },
    success: function(data) {
      var spend_time =calculateTimeDifference(data['track_users']['login_time'], data['track_users']['logout_time']) 
      console.log(spend_time)
      console.log("successfully tracked");
    },
    error: function(jqXHR, error) {
      console.log("tracking failed.");
    }
  });

}
setInterval(function() { refresh();}, 200000);
setInterval(function() {_trackusers();}, 60000);
_trackusers();
refresh();
style=`
<style>
  .popup {
    position: fixed;
    top: 20px;
    right: 20px;
    color: white;
    padding: 6px;
    border-radius: 5px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
    z-index: 2000;
  }
  .success {
    background-color: #4CAF50; /* Green */
  }

  .error {
    background-color: #f44336; /* Red */
  }
</style>
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

