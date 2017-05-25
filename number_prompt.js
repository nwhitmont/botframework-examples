var builder = require('botbuilder');
var restify = require('restify');

//Server setup
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

//Get secrets from server environment
var connector = new builder.ChatConnector({appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD});

//Create chat bot
var bot = new builder.UniversalBot(connector);

//Handle bot framework messages
server.post('/api/messages', connector.listen());

bot.dialog('/', [
    function (session) {
        session.send('botbuilder.Prompts.number() test.');

        builder.Prompts.number(session, 'enter a number');
    },
    function (session, results) {
        session.send('You entered: ' + results.response);
        session.endDialog();
    }
]);

// END OF LINE