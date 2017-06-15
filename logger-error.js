var builder = require('botbuilder');
var restify = require('restify');
//var apiairecognizer = require('api-ai-recognizer');
//var request = require('request');

// Setup Restify Server

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());


var bot = new builder.UniversalBot(connector, [
    function (session, args, next) {
        if (!session.userData.name) {
            // Ask user for their name
            builder.Prompts.text(session, "Hello... What's your name?");
        } else {
            // Skip to next step
            next();
        }
    },
    function (session, results) {
        // Update name if answered
        if (results.response) {
            session.userData.name = results.response;
        }

        // Greet the user
        session.send("Hi %s!", session.userData.name);
        session.beginDialog('/mainMenu');
    }
]);

var recognizer = new apiairecognizer(process.env.APIAI_CLIENT_ACCESS_TOKEN);
var intents = new builder.IntentDialog({
    recognizers: [recognizer]
});


bot.dialog('/mainMenu', [
    function (session) {
        builder.Prompts.choice(session, "How may I help?", ["1. XXXX","2. FAQ"]);
    },
    function (session, results) {
        switch (results.response)
        {
            case "2":
                session.beginDialog('/faq');
        };
        session.endDialog();
    }
]);

bot.dialog('/faq',intents, [
    function (session) {
        builder.Prompts.text(session, "What's your question?");
    }
]);

intents.matches('smalltalk.greetings.hello',function(session, args){
    var fulfillment = builder.EntityRecognizer.findEntity( args.entities, 'fulfillment');
    if (fulfillment){
        var speech = fulfillment.entity;
        session.send(speech);
    }else{
        session.send('Sorry...not sure how to respond to that');
    }
});
var cache = [];
processIntent (intents, 'welab.faq');

intents.onDefault(function(session){
    session.send("Sorry...can you please rephrase?");
});

function processIntent (intents, intentName){
    intents.matches(intentName,function(session, args){
        var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
        if (fulfillment){
            var speech = fulfillment.entity;
            session.send(speech);

            showIntentMeassage(intentName, session);

        }else{
            session.send('Sorry...not sure how to respond to that');
        }
    });
}

function showIntentMeassage(intentName, session){
    session.send("inTentName: " + intentName);
}
