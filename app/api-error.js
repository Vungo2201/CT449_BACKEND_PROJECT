class ApiError extends Error {
    constructor(statusCode, meddage){
        super();
        this.statusCode = statusCode;
        this.message = this.message;
    }
}

module.exports = ApiError;