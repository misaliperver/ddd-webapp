import { Logger as NestLogger } from '@nestjs/common';
import { Logger } from 'typeorm';

export class DataBaseLogger implements Logger {
  
  public log(level: 'log' | 'info' | 'warn', message: string): void {
    NestLogger.log(message, DataBaseLogger.name);
  }
  
  public logMigration(message: string): void {
    NestLogger.log(message, DataBaseLogger.name);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public logQuery(query: string, parameters?: any[]): void {
    let message: string = `Query: ${query} `;
    if (parameters) {
      message = `${message} Parameters: ${JSON.stringify(parameters)}`;
    }
    NestLogger.log(message, DataBaseLogger.name);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public logQueryError(error: string, query: string, parameters?: any[]): void {
    let message: string = `Query: ${query} `;
    if (parameters) {
      message = `${message} Parameters: ${JSON.stringify(parameters)}`;
    }
    NestLogger.error(message, error, DataBaseLogger.name);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public logQuerySlow(time: number, query: string, parameters?: any[]): void {
    let message: string = `Query: ${query} Time: ${time}`;
    if (parameters) {
      message = `${message} Parameters: ${JSON.stringify(parameters)}`;
    }
    NestLogger.log(message, DataBaseLogger.name);
  }
  
  public logSchemaBuild(message: string): void {
    NestLogger.log(message, DataBaseLogger.name);
  }
  
  public static new(): DataBaseLogger {
    return new DataBaseLogger();
  }
  
}
