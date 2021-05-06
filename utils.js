/**
 * @fileoverview This module provides helper functions.
 * Depdencies are luxon, which provides simple date functions.
 * @package
 */
const { DateTime } = require("luxon");

/**
 * returns a message indicating that the server has started
 * @returns {string} message that indicates that the server has
 * started on a port
 */
const getWelcomeMessage = () => {
    const welcomeMessage = "server starting on ";
    return welcomeMessage;
};

/**
 * A simple function that returns the current date and time
 * @returns {string} Date and time with custom formatting
 */
 const currentDateTime = () => {
    const now = new Date()
    var date = now.getFullYear() + '-' + (now.getMonth() + 1) +'-'+ now.getDate();
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(); 
    return date + "::" + time
}


module.exports = {getWelcomeMessage, currentDateTime};