import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublicKey';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
