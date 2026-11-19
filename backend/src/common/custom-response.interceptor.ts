import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { format } from 'date-fns';
import { Response } from '@/common/types/response';

@Injectable()
export class CustomResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((res: unknown) => this.responseHandler(res, context)));
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const statusCode: number = response.statusCode;
    const message: string =
      typeof res === 'object' && res !== null && 'message' in res
        ? res.message
        : 'Success';

    let data: unknown;
    if (res === null || res === undefined) {
      data = null;
    } else if (Array.isArray(res)) {
      data = res;
    } else if (typeof res !== 'object') {
      data = res;
    } else if ('message' in res) {
      const { message: _msg, ...rest } = res;
      data = Object.keys(rest).length > 0 ? rest : null;
    } else {
      data = res;
    }

    return {
      success: true,
      statusCode,
      message,
      data,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
  }
}
