import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { SentryInterceptor } from '../../../interceptors/sentry.intercetor';

@UseInterceptors(TransformInterceptor)
@UseInterceptors(SentryInterceptor)
export abstract class BaseController {}
