export class clientSideError extends Error{
    status: Number;
    constructor(message:string,status:Number){
        super(message);
        this.name = 'clientSideError';
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
        
    }
}