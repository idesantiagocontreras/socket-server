import { Router, Request, Response, response } from "express";
import Server from '../class/Server';
import { usuariosConetados } from '../sockets/socket';

const router = Router();
const server = Server.instance;

router.post('/mensajes', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {de, cuerpo}

    server.io.emit( 'mensaje-nuevo', payload)

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {de, cuerpo}

    server.io.in( id ).emit( 'mensaje-privado', payload)

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

// Servicios para obtener los id de los usuarios
router.post('/usuarios', ( req: Request, res: Response ) => {
    
    server.io.clients( ( err: any, clientes: string[]) => {
        if( err ){
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        });
    });

});

// Obtener usuarios y sus nombres
router.post('/usuarios/detalle', ( req: Request, res: Response ) => {
    
    res.json({
        ok: true,
        clientes: usuariosConetados.getLista()
    });

});

export default router;