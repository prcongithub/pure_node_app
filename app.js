//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');

var fs = require('fs');
var ejs = require('ejs');
//Lets define a port we want to listen to
const PORT=8080; 


//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('public');

//A sample GET request    
dispatcher.onGet("/page1", function(req, res) {
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.end('Page One');
  var templateString = null;
  var templateString = fs.readFileSync('pages/index.ejs', 'utf-8');
  res.end(ejs.render(templateString));
});    

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Got Post Data');
});

//We need a function which handles requests and send response
function handleRequest(request, response){
  try {
    //log the request on console
    console.log(request.url);
    //Disptach
    dispatcher.dispatch(request, response);
  } catch(err) {
      console.log(err);
  }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
