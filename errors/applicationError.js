
/**
 * This class holds an error that is thrown if
 * any business logic is broken during execution.
 */
class ApplicationError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "ApplicationError";
        this.statusCode = statusCode;
    }
}

// Exports to use elsewhere in the application
module.exports = { ApplicationError }