import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

export const usuariosConetados = new UsuariosLista 

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
    const usuario = new Usuario( cliente.id );

    usuariosConetados.agregar( usuario );
}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    
    cliente.on('disconnect', () =>{
        usuariosConetados.deleteUsuario( cliente.id);

        io.emit( 'usuarios-activos', usuariosConetados.getLista() );
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', ( payload ) =>{
        io.emit('mensaje-nuevo', payload);
    });
}

export const setUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', ( payload, callback: Function ) =>{
        
        console.log(payload);
        usuariosConetados.actualizarNombre( cliente.id, payload.nombre );
        io.emit('usuarios-activos', usuariosConetados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
}

export const getUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () =>{
        io.to( cliente.id ).emit('usuarios-activos', usuariosConetados.getLista());
    });
}