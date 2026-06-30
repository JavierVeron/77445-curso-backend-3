import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  // Usamos el Logger propio de Nest para que la salida tenga buen formato en la consola
  private readonly logger = new Logger('HTTP Tracker');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    
    // Obtenemos la IP (manejando proxies si estás detrás de uno, ej: Nginx o Cloudflare)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Logueamos el método, la ruta y la IP emisora
    this.logger.log(`[${method}] Ruta: ${originalUrl} - IP: ${ip}`);

    // ¡No te olvides de llamar a next() para que la solicitud continúe su ciclo!
    next();
  }
}