//https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
//http://clubmate.fi/remove-a-class-name-from-multiple-elements-with-pure-javascript/
window.onload = function(){


    var clientSocket = io.connect('http://localhost:4200');


    // when receives a connect message
    clientSocket.on('connect', function(data) {
    // all sending/receiving happens within this function
    //to ensure that we are connected :)


      // emit "join message"
    clientSocket.emit('join', "msg:: client joined");

    // handler for receiving client id
    clientSocket.on("joinedClientId", function(data){
      socketId = data;
      console.log("myId "+socketId);
      document.getElementById("clientId").innerHTML+=socketId;
    });

     //receive another type of message from server ...
     clientSocket.on('receiveMsgFromServer', function(data) {
      console.log(data);

     let stringData = "<p> message received from: "+ data.pName+"</p>" +
     "<p>val one: "+ data.valOne+ "</p>"+
     "<p>val two: "+ data.valTwo+ "</p>"+
     "<p>val three: "+ data.valThree+ "</p>";
    if(data.pName ==="Particle-A"){
        document.getElementById("otherClientDataA").innerHTML = stringData;
    }
    else{
       document.getElementById("otherClientDataB").innerHTML = stringData;

    }


      });

      document.getElementById("myDivButton").onclick = function(){
        console.log("clicked");
        let one = document.getElementById('one').value;
        let two = document.getElementById('two').value;
        //make a JSON object -> send multiple values
        let data = {'u_one':one, 'u_two':two};
        clientSocket.emit('client-message',data);
      }

  }); //on connect

} // window load
