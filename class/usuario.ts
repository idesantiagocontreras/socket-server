export class Usuario {
    public id: string;
    public nombre: string = '';
    public sala : string = 'Principal';

    constructor(id: string) {
        this.id = id;
    }
}