import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends HttpException {
  constructor() {
    super(
      'Forbidden. You do not have permission to access this feature',
      HttpStatus.FORBIDDEN,
    );
  }
}
