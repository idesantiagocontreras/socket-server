import { Usuario } from './usuario';


export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {}

    public agregar( usuario: Usuario ) {
        this.lista.push( usuario );
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string) {
        for( let usuario of this.lista ) {
            if( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }
    }

    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== '' );
    }

    public getUsuario( id: string ) {
        return this.lista.find( usuario => usuario.id === id);
    }

    public getUSuariosEnSala( sala: string ) {
        return this.lista.find( usuario => usuario.sala === sala);
    }

    public deleteUsuario( id: string ) {
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }
}