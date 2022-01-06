class DatabaseError extends Error{

    constructor(
        private message: string,
        public error?: any,
    ){
        super( message );
    }    

}


export default DatabaseError;