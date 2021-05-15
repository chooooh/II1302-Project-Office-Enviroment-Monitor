/**
 * @fileoverview This file setups the database connection for Cloudant
 * Dependencies are Express, cfenv (IBM Cloud), and local modules such as utils.
 */

// Load the Cloudant library.
const Cloudant = require('@cloudant/cloudant');
require('dotenv').config();

// Get account details from environment variables
const url = process.env.cloudant_url;
const username = process.env.cloudant_username;
const password = process.env.cloudant_password;

// Initialize the library with url and credentials.
const cloudant = process.env.VCAP_SERVICES ? 
    Cloudant({ vcapServices: JSON.parse(process.env.VCAP_SERVICES) })
    : Cloudant({ url, username, password });

// Exports to use elsewhere in the application
module.exports = cloudant;