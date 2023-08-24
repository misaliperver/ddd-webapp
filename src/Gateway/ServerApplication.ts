import { GatewayModule } from './GatewayModule';
import { ApiServerConfig } from './ApiServerConfig';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './Pipes/ValidatorPipe';

export class ServerApplication {
  
  private readonly host: string = ApiServerConfig.HOST;
  
  private readonly port: number = ApiServerConfig.PORT;
  
  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(GatewayModule);
   
    app.useGlobalPipes(new ValidationPipe());

    this.buildAPIDocumentation(app);
    this.log();

    app.enableCors();

    await app.listen(this.port);
  }
  
  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title: string = 'IPoster';
    const description: string = 'IPoster API documentation';
    const version: string = '1.0.0';
    
    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      // .addBearerAuth({ type: 'apiKey', in: 'header', name: ApiServerConfig.ACCESS_TOKEN_HEADER })
      .build();
    
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
    
    SwaggerModule.setup('documentation', app, document);
  }
  
  private log(): void {
    Logger.log(`Server started on host: ${this.host}; port: ${this.port};`, ServerApplication.name);
  }
  
  public static new(): ServerApplication {
    return new ServerApplication();
  }
  
}
