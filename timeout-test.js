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

bot.dialog('/', function (session) {
    session.send('Hello. Type "test" to start the demo');
});

bot.dialog('test', [(session) => {

        session.send(`Execute replaceDialog`);
        session.replaceDialog('choices');
    }
]).triggerAction({matches: /test/});

bot.dialog('choices', [
    (session) => {
        session.send('Before timeout');
        setTimeout(function () {
            session.send('before the choice prompt');
            builder
                .Prompts
                .choice(session, "Which one are you looking for?", 'sdasdasd|dasdad');
        }, 4000);
    },

    (session, result) => {
        console.log(result);
        session.send(`You picked: ${result.response.entity}`);
    }
]);
