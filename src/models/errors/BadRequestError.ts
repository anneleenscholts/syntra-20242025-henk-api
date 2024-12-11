export class BadRequestError extends Error {
    statusCode;
    
    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
    }
}
