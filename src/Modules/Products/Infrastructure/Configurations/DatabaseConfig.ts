import { ConfigBase } from '@BuildingBlocks/Common/Config/ConfigBase';
import { get } from 'env-var';

export class DatabaseConfig extends ConfigBase  {
  
  public static readonly DB_HOST: string = get('DB_HOST').required().asString();
  
  public static readonly DB_PORT: number = get('DB_PORT').required().asPortNumber();
  
  public static readonly DB_USERNAME: string = get('DB_USERNAME').asString();
  
  public static readonly DB_PASSWORD: string = get('DB_PASSWORD').asString();
  
  public static readonly DB_NAME: string = get('DB_NAME').required().asString();
  
  public static readonly DB_LOG_ENABLE: boolean = get('DB_LOG_ENABLE').required().asBool();

}
