import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessages = this.formatErrors(errors);
      throw new BadRequestException(errorMessages);
    }
    return object;
  }

  private formatErrors(errors: ValidationError[]): string {
    return errors
      .map((err) => {
        if (err.constraints) {
          return Object.values(err.constraints).join(', ');
        }
        if (err.children && err.children.length > 0) {
          return this.formatErrors(err.children);
        }
        return '';
      })
      .filter((msg) => msg !== '')
      .join(', ');
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
