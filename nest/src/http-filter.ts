import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();

    const log = {
      timestamp: new Date(),
      message:
        typeof response === 'object'
          ? `url:${req.url}, ${response['message']}`
          : `url:${req.url}, ${response}`,
    };

    console.error(log);

    res.status((exception as HttpException).getStatus()).json(response);
  }
}
