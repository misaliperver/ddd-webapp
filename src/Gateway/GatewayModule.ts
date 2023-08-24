import { HttpProductsModule } from "./Controllers/Products/HttpProductsModule";
import { Module, Provider } from "@nestjs/common";
import { ValidationPipe } from './Pipes/ValidatorPipe';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from "./ExceptionFilters/HttpExceptionFilter";
import { ApiServerConfig } from "./ApiServerConfig";
import { HttpLoggingInterceptor } from "./Interceptors/HttpLoggingInterceptor";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from "path";
import { HttpOrdersModule } from "./Controllers/Orders/HttpOrdersModule";
import { TypeOrmModule } from "@nestjs/typeorm";


const providers: Provider[] = [
  {
    provide : APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },
];

if (ApiServerConfig.LOG_ENABLE) {
  providers.push({
    provide : APP_INTERCEPTOR,
    useClass: HttpLoggingInterceptor,
  });
}

@Module({
  imports: [
    HttpProductsModule,
    HttpOrdersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client/build'),
      serveStaticOptions: {
        redirect: false,
      }
    }),
  ],
  providers: providers,
})
export class GatewayModule {}
