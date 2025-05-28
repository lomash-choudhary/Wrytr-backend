export class ApiError extends Error{
    statusCode: number
    data: any
    error: any
    stack: any
    success:boolean
    constructor(params: ApiErrorType){
        super(params.message);
        this.statusCode = params.statusCode
        this.error = params.error
        this.data = params.data;
        this.success = params.success;
        if(params.stack){
            this.stack = params.stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

interface ApiErrorType{
    statusCode: number,
    message: string,
    data:any
    error: any,
    stack: any
    success:boolean
}

