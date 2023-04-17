document.getElementById("submit").onclick = makeReq;

function makeReq(){

  var word = document.getElementById("word").value;

  var request = new XMLHttpRequest();
  request.open('GET', '/api?word='+word, true);

  request.onload = function() {
      console.log("works")
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        console.log(data)
        console.log(data.word)
        document.getElementById("answer").innerHTML = data.isPal
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
}
