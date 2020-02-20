
//const UDP_PORT =9998;
const SOCKET_PORT = 4200;
let express = require('express');
let app = express();

// for comm with browser ..
let server = require('http').createServer(app);
let io = require('socket.io')(server);


let static = require('node-static'); // for serving static files (i.e. css)
let dgram = require('dgram');
const conf = require('./config/config')
let clientId =0;

//create a udp server (comm <-> particle and server ... )
const udp_server = dgram.createSocket('udp4');


// for the udp server ...
udp_server.bind(conf.port);
console.log(`Starting UDP server on UDP port ${conf.port}`);


app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

// the default route :)
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/public/testSocket.html');
});

server.listen(SOCKET_PORT);
// Listen for incoming connections from clients
io.on('connection', function (socket) {
  console.log("here" +socket);
  clientId++;

     socket.on('join', function (data) {

     console.log("client joined:: "+ data);
     //send to the client who just sent message
       socket.emit('joinedClientId', clientId);
      // socket.broadcast.emit('joinedClientId', clientId);
    });

    socket.on('client-message',function(data){
      console.log("received:: ");
      console.log(data);
      /*sending msg to particles (udp-clients)*/
      //let t_address = "192.168.0.31";
      let t_address  = "172.20.10.7";
      let t_port = 8888;
      udp_server.send(data.u_one, t_port, t_address, (error, bytes) => {
          if(error){
              console.log("udp_server", "error", error);
              client.close();
          } else {
              console.log("udp_server", "info", 'Data sent !!!');
          }
      })
    })

}); //ON CONNECTION




  // emits on new datagram msg
  udp_server.on('message', (msg,receiver) => {
      console.log(`| Received ${msg.length} bytes from ${receiver.address}:${receiver.port}|`);
      console.log("message",msg.toString());

      // emit from particle!

      // lets parse the message :
      //start, name, val1, val2, val3, end//
      let splitString = msg.toString().split(",");
      let myFancyObject =
      {
        pName:splitString[1],
        valOne:parseInt(splitString[2]),
        valTwo:parseInt(splitString[3]),
        valThree:parseInt(splitString[4])

      }

     io.emit('receiveMsgFromServer', myFancyObject);
});


// emits when any error occurs
udp_server.on('error', (error) => {
    log("udp_server", "error", error)
    udp_server.close()
});

//emits after the socket is closed using socket.close()
udp_server.on('close', () => {
    log("udp_server", "info", 'Socket is closed !')
})

//emits when socket is ready and listening for datagram msgs
udp_server.on('listening', () => {
    const address = udp_server.address()
    //console.log(IP_RECVDSTADDR);
    const port = address.port
    const family = address.family
    const ipaddr = address.address

    console.log("udp_server", "info", 'Server is listening at port ' + port)
    console.log("udp_server", "info", 'Server ip :' + ipaddr)
    console.log("udp_server", "info", 'Server is IP4/IP6 : ' + family)
})
