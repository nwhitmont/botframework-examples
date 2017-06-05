"use strict";

var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');

//ENV variables are checked for development mode
require('dotenv').load();
var useEmulator = true; //(process.env.NODE_ENV == 'development');


//Universal Bot is configured by chatconnector to communicate either with the emulator or any other channels.
var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());
} else {
    module.exports = { default: connector.listen() }
}

 
var bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));

bot.on('conversationUpdate', function (message,session) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address,'/next');
		
            }
        });
    }
});

bot.dialog('/next',[
    function(session,args,next)
    {
        session.send('Starting dialog /next')
		builder.Prompts.text(session,"Enter your name")
	},
    function(session) {
        session.userData.name = session.message.text
        session.endDialog()
    }
    
]);
	
bot.dialog('/',[
	function(session) {
        session.send('Starting dialog /')
        session.send("Hello "+ session.userData.name)
	
}]);