//Handle the error

export class Apierror extends Error{
    statusCode:number;
    constructor(statusCode:number,message:string){
        super(message)
        this.statusCode=statusCode
    }
};