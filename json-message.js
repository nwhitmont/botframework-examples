
var builder = require('botbuilder');
var restify = require('restify');

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









var jsonOriginal = {"name": "Philip John", "id": "444411111111",   "phone": "54545454", "email": "philip@john.com", "address": "Street 11 - 111, City , ", "job": "Software Tester", "date": "1st June 2017", "salary": "9000", "bankAccount": "DE121231231231231231" };

var jsonStringedUpNull2 = '{\n  "name": "Philip John",\n  "id": "444411111111",\n  "phone": "54545454",\n  "email": "philip@john.com",\n  "address": "Street 11 - 111, City , ",\n  "job": "Software Tester",\n  "date": "1st June 2017",\n  "salary": "9000",\n  "bankAccount": "DE121231231231231231"\n}';


bot.dialog('/',function(session) {
     session.send(jsonStringedUpNull2);
     session.endDialog();
});

// END OF LINE