import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

export const usuariosConetados = new UsuariosLista 

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario( cliente.id );

    usuariosConetados.agregar( usuario );
}

export const desconectar = (cliente: Socket) => {
    
    cliente.on('disconnect', () =>{
        usuariosConetados.deleteUsuario( cliente.id);
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', ( payload ) =>{
        console.log(payload);
        io.emit('mensaje-nuevo', payload);
    });
}

export const setUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', ( payload, callback: Function ) =>{
        usuariosConetados.actualizarNombre( cliente.id, payload.nombre );
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
}