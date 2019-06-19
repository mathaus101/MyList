export class ListItem {
    constructor(
        
        public text: string,
        public ticked?: boolean,
        
    ) {}

    /*
    The TypeScript compiler generates a public field for each 
    public constructor parameter and automatically assigns the 
    parameter’s value to that field when you create heroes.

The 'ticked' param is optional, so the constructor lets you omit it.
*/

}


