import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const timestamp = new Date().toISOString();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      // Log the error for HTTP context
      this.logger.error({
        path: request.url,
        method: request.method,
        error: exception,
        timestamp,
      });

      

      const clientError = {
        message: exception instanceof HttpException
          ? exception.message
          : exception instanceof Error
            ? exception.message
            : 'Internal server error Client',
        code: exception?.response?.code || "Internal server error",
        details: exception?.response || undefined,
        timestamp
      };

      // console.log("HTTP Error Response:", errorResponse);
      return response.status(status).json(clientError);
    }

    // Handle GraphQL errors
    const errorResponse = {
      message: exception?.response?.message.reduce((acc: string, curr: string) => {
        return acc + curr;
      }, "") || exception?.message || "Internal server error",
      code: exception?.response?.code || "Internal server error",
      response: exception?.response || undefined,
      timestamp
    };

    this.logger.error({
      error: exception,
      timestamp,
      context: 'GraphQL'
    });

    console.log("GraphQL Error:", errorResponse);

    // For GraphQL, we throw the error to let the GraphQL layer handle it
    throw new HttpException(errorResponse, status);
  }
}
