var restify = require('restify');
var builder = require('botbuilder');
var fs = require('fs');

// Setup some https server options
//generated from http://www.selfsignedcertificate.com/
// var https_options = {
//         key: fs.readFileSync('./innovationslab.de.key'), //on current folder
//         certificate: fs.readFileSync('./innovationslab.de.cert')
// };


// Setup Restify Server
var restify = require('restify');
var builder = require('botbuilder');
var fs = require('fs');

// Setup some https server options
//generated from http://www.selfsignedcertificate.com/
var https_options = {
        key: fs.readFileSync('./innovationslab.de.key'), //on current folder
        certificate: fs.readFileSync('./innovationslab.de.cert')
};


// Setup Restify Server
// var server = restify.createServer(https_options);
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (pre$
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'b030f685-a2a2-4b50-acd5-xxxx',
    appPassword: 'JMSDYjyReCxxxxxxx'
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (pre$
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});