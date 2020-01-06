const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

const keyPressHandler = require('./keypressHandler');
const messageQueue1= require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};



keyPressHandler.initialize(messageQueue1.enqueue);




module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET' ) {
    if (req.url === 'http://127.0.0.1:3000/background.jpg') {
      res.writeHead(200, headers);
      res.write("url(water-sm.jpg)");
      res.end();
      next();

    } else {
      res.writeHead(200, headers);
      res.write(messageQueue1.dequeue());
      res.end();
      next();
    }
}
  // invoke next() at the end of a request to help with testing!

};
