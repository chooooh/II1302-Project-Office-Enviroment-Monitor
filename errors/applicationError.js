
class ApplicationError extends Error {
    
    constructor(statusCode, reason) {
        super(message);
        this.name = "ApplicationError";
        this.statusCode = statusCode;
        this.reason = reason;
    }

}

module.exports = { ApplicationError }