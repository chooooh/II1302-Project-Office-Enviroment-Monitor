
const getWelcomeMessage = () => {
    const welcomeMessage = "server starting on ";
    return welcomeMessage;
};

/**
 * A simple function that returns the current date and time
 * @returns Date and time with custom formatting
 */
const currentDateTime = () => {
    const now = new Date();

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    
    let date = now.getFullYear() + "/" + month + "/" + day;
    let time = hour + ":" + minute + ":" + second;
    return date + " " + time;
}

module.exports = {getWelcomeMessage, currentDateTime};