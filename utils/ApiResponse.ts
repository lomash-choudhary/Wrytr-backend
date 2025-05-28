export class ApiResponse{
    data:object
    statusCode: number
    message: string
    constructor(params: ApiResponseInterface){
        this.data = params.data
        this.statusCode = params.statusCode
        this.message = params.message
    }
}

interface ApiResponseInterface{
    data:object,
    statusCode: number,
    message: string
}