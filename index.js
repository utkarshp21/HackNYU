/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a sample skill built with Amazon Alexa Skills nodejs
 * skill development kit.
 * This sample supports multiple languages (en-US, en-GB, de-GB).
 * The Intent Schema, Custom Slot and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-howto
 **/

'use strict';

const Alexa = require('alexa-sdk');
const dealList = [["Two coffees for one", "Half price on eggs", "Thirty percent off sneakers", "Free kids meals", "Clearance sale"], 
        ["Starbucks", "Your Local Grocery", "Shoes for Less","Favorite Restaurant","Best Store in Town"], [.3,.4,.6,.63,.7]];

const calmCommands = ["Take deep breaths", "Inhale and Exhale", "Calm down", "Don't panic. You are brave"]

let dealNum = 0;

const APP_ID = 'amzn1.ask.skill.4052da07-e71f-4cc6-91fc-40847e21572e'; // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'Phobia',
            WELCOME_MESSAGE: "Begining VR training experience. Monitoring your vitals.",
            // WELCOME_REPROMPT: 'Please either ask to see deals or to change your settings.',,
            WELCOME_REPROMPT: 'I did not understand that, could you please repeat ?',
            STOP_MESSAGE: 'Thank you for using Bazaar!',
            DEAL_NOT_FOUND_MESSAGE: "I\'m sorry, I see no deals near you.",
            DEAL_NOT_FOUND_REPROMPT: 'What else can I help with?',
        },
    },
};

const handlers = {
    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE');
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMPT');

        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },

    'GetDealsIntent': function () {
    	let numberOfCommands = calmCommands.length;
    	let idx = Math.floor(Math.random() * 6) + 0;
    	this.attributes.speechOutput = this.t(calmCommands[idx]);
        
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
        
    },

    'NextDealIntent': function() {
        dealNum++;
        this.emit('GetDealsIntent');
    },
    'ChooseDealIntent': function() {
        this.attributes.speechOutput = this.t("You have just saved money with Bazaar! Please tell me to keep looking for deals or to exit the skill.");
        this.attributes.repromptSpeech = this.t("Please tell me to keep looking for deals or to exit the skill.");
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'RestartListIntent': function() {
        dealNum = 0;
        this.emit('GetDealsIntent');
    },
    'RepeatIntent': function () {
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        console.log(`Session ended: ${this.event.request.reason}`);
    },
    'Unhandled': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};