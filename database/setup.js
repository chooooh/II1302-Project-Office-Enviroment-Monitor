
// Load the Cloudant library.
const Cloudant = require('@cloudant/cloudant');

// Get account details from environment variables
const url = process.env.cloudant_url;
const username = process.env.cloudant_username;
const password = process.env.cloudant_password;

<<<<<<< HEAD
=======

>>>>>>> database
// Initialize the library with url and credentials.
const cloudant = process.env.VCAP_SERVICES ? 
Cloudant({ vcapServices: JSON.parse(process.env.VCAP_SERVICES) })
    : Cloudant({ url, username, password });

module.exports = cloudant;