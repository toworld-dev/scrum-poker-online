import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';

@UseInterceptors(TransformInterceptor)
export abstract class BaseController {}
