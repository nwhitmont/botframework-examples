var builder = require('botbuilder');
var restify = require('restify');
var request = require('request');

//Server setup
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

//Get secrets from server environment
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//Create chat bot
var bot = new builder.UniversalBot(connector);
//Handle bot framework messages
server.post('/api/messages', connector.listen());
server.get('/', restify.serveStatic({
    'directory': '.',
    'default': 'index.html'
}));

//LUIS Model
var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?xxxxxxx';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer]});