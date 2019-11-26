import { Router, Request, Response, response } from "express";
import Server from '../class/Server';

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

export default router;