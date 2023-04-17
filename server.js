const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('word' in params){
      if(params['word'].toLowerCase() == params['word'].split('').reverse().join('').toLowerCase()){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          word: `${params['word']}`,
          isPal: 'yes'
        }
        res.end(JSON.stringify(objToJson));
      }//word = pal
      else if(params['word'].toLowerCase != params['word'].split('').reverse().join('').toLowerCase()){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          word: `${params['word']}`,
          isPal: 'no'
        }
        res.end(JSON.stringify(objToJson));
      }//word != pal
    }//word if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
