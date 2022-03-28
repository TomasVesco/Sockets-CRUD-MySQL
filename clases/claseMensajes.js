const fs = require('fs');

class ContenedorMensajes {

    constructor( route ) {
        this.route = route;
    }

    async save( messageToAdd ) { 
        try {
            const newFile = await this.getAll();
      
            newFile.push( messageToAdd ); 

            if(newFile[0].id == '0'){
                newFile.shift();
            }
            
            fs.writeFileSync( this.route, JSON.stringify( newFile, null, 4 ));
            return newFile;
        }

        catch(error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let readFile = await fs.promises.readFile( this.route, 'utf-8' );
            if(readFile == ''){
                const obj = [
                    {id: 0}
                ];
                fs.promises.writeFile( this.route, JSON.stringify(obj));
            } 
            readFile = await fs.promises.readFile( this.route, 'utf-8' ); 
            return JSON.parse( readFile );         
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorMensajes;