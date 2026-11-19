// -- NestJS Core --
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

// -- Third-party Libraries --
import { format } from 'date-fns';
import type { Request, Response } from 'express';

// -- Constants --
import { COMMON_MESSAGES } from '@/common/constants/message.constant';

/**
 * Map HTTP status codes to human-readable error labels.
 */
const HTTP_STATUS_LABEL: Record<number, string> = {
  [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
  [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
  [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
  [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
  [HttpStatus.CONFLICT]: 'CONFLICT',
  [HttpStatus.UNPROCESSABLE_ENTITY]: 'UNPROCESSABLE_ENTITY',
  [HttpStatus.TOO_MANY_REQUESTS]: 'TOO_MANY_REQUESTS',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
  [HttpStatus.SERVICE_UNAVAILABLE]: 'SERVICE_UNAVAILABLE',
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { statusCode, message } = this.getErrorDetails(exception);

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    }

    const errorLabel = HTTP_STATUS_LABEL[statusCode] || `ERROR_${statusCode}`;

    response.status(statusCode).json({
      success: false,
      statusCode,
      error: errorLabel,
      message,
      path: request.url,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    });
  }

  private getErrorDetails(exception: unknown): {
    statusCode: number;
    message: string;
  } {
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      let message: string;
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const res = exceptionResponse as Record<string, unknown>;
        if (Array.isArray(res.message)) {
          message = res.message.join('; ');
        } else if (typeof res.message === 'string') {
          message = res.message;
        } else {
          message = exception.message;
        }
      } else {
        message = exception.message;
      }

      return { statusCode, message };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: COMMON_MESSAGES.SYSTEM.INTERNAL_SERVER_ERROR,
    };
  }
}
