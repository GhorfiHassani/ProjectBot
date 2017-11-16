var request = require('request');
var restify = require('restify');
var builder = require('botbuilder');


// Partie Setup Creation d'une API 

var server=restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create connector and bot
var connector = new builder.ChatConnector({
    appId: "219a1c49-d3bd-4888-8d83-add042687bb8",
    appPassword: "ctmmSKNVC172?])#oyeSE65"
});

var bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());

// Create the intent recognizer
var dialog = new builder.IntentDialog();
bot.dialog('/', dialog);


//---------------------------------------------------------
// Dialogs
//---------------------------------------------------------

dialog.matches(/^Qui etes avec moi ?/i, [
        function (session) {
            builder.Prompts.text(session, 'C est le robot de la sociéte CDiscount est vous  ?');
        },
        function (session, results) {        
            /*openweathermap(results.response, function(success, previsions) {
                if (!success) return session.send('Une erreur s\'est produite, veuillez réessayer.');
                
                var message = 'Voici la météo pour ' + results.response + ' :\n\n' +
                              '_ Température : ' + previsions.temperature + '°C\n\n' + 
                              '_ Humidité : ' + previsions.humidity + '%\n\n' +
                              '_ Vent : ' + previsions.wind + 'km/h';
                              
                session.send(message);
            });*/
			var message ='Enchanté Monsieur '+results.response;
			session.send(message);
        }
]);

dialog.onDefault(function (session) {
    session.send('Je n\'ai pas compris votre demande, il faut écrire "donne-moi la météo" !');
});