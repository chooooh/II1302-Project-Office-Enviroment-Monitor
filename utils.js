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
    let now = DateTime.local();
    return now.year + "-" + now.month + "-" + now.day + " " + now.hour + ":" + now.minute + ":" + now.second
}

module.exports = {getWelcomeMessage, currentDateTime};