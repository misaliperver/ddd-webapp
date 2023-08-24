import { Optional } from '@BuildingBlocks/Common/Types/CommonTypes';

export type CodeDescription = {
  code: number,
  message: string,
};

export abstract class ExceptionBase<TData> extends Error {
  public readonly code: number;
  
  public readonly data: Optional<TData>;
  
  public constructor(
    codeDescription: CodeDescription,
    overrideMessage?: string,
    data?: TData
  ) {
    super();
    
    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;
    
    Error.captureStackTrace(this, this.constructor);
  }
}
