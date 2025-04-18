function submitParameters(parameters, url, returnToFunction) {
 loader();
  var parametersPassed = JSON.stringify(parameters);
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      eval(returnToFunction)(obj);
    
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}
  
  
function getData(url,returnToFunction) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      eval(returnToFunction)(obj);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function submitFormData(url) {
  $("form").on( "submit", function(e) {
  var dataString = $(this).serialize();
  $.ajax({
    type: "POST",
    url: url,
    data: dataString,
    dataType:'JSON',
    success: function (data) {
      console.log(data)
      window.location.reload().delay;
      // setTimeout(() => { window.location.reload().delay; }, 1000);
      
    },
    error: function (error) {
      
      console.log(error)
    }
  });

  e.preventDefault();
  });
}

function deleteData(url) {
  loader();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      Toast.fire({
        icon: 'success',
        title: 'Successfully Deleted'
      })
      setTimeout(() => { window.location.reload().delay; }, 1000);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
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

function loader() {
  // console.log("lodderrr")
  try {
    $('body').append(
      `
      <div class="cover_page" style="width:100%; height:100%; background:#000;position: absolute; top: 0;opacity: 0.5;">
        <img src="${base_url}/views/dist/img/formloader.gif" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" 
        style="opacity: .8;position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;">
      </div>
      `);
  } catch (error) {
    console.log(error)
  }
}

