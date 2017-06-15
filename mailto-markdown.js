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

bot.dialog('/',function(session) {
     session.send('Starting markdown example');

     var markdownMessage = 'Does this answer your question? If not please contact a human at [ITA.BAVN@lacity.org](mailto:ITA.BAVN@lacity.org?body=Conversation%20ID:%20c68e8ce517c74634acd506d25659e3ef) for further assistance.';

     session.send(markdownMessage);
     session.endDialog();
});

// END OF LINE
