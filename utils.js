const { DateTime } = require("luxon");

const getWelcomeMessage = () => {
    const welcomeMessage = "server starting on ";
    return welcomeMessage;
};

/**
 * A simple function that returns the current date and time
 * @returns Date and time with custom formatting
 */
 const currentDateTime = () => {
    const now = new Date()
    var date = now.getFullYear() + '-' + (now.getMonth() + 1) +'-'+ now.getDate();
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(); 
    return date + "::" + time
}

module.exports = {getWelcomeMessage, currentDateTime};