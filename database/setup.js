// Load the Cloudant library.
const Cloudant = require('@cloudant/cloudant');
require('dotenv').config();

// Get account details from environment variables
const url = process.env.cloudant_url;
const username = process.env.cloudant_username;
const password = process.env.cloudant_password;
// Initialize the library with url and credentials.

const cloudant = Cloudant({ url: url, username: username, password: password, plugins: [] });
module.exports = cloudant;