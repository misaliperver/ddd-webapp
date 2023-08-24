import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProduct } from './dtos/CreateProduct.dto';
import { ApiResponseBase } from '@BuildingBlocks/Infrastructure/Api/ApiResponseBase';
import { AddNewProductCommand } from '@Modules/Products/Application/AddNewProduct/AddNewProductCommand';
import { ProductView } from '@Modules/Products/Domain/Product/Product';
import { ListProductQuery } from '@Modules/Products/Application/ListProducts/ListProductQuery';


@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  // @HttpAuth(UserRole.AUTHOR, UserRole.ADMIN, UserRole.GUEST)
  // @ApiResponse({status: HttpStatus.OK, type: HttpRestApiResponseUser})
  public async createNewProduct(@Body() body: CreateProduct): Promise<ApiResponseBase<ProductView>> {
    const product: ProductView = await this.commandBus.execute(
      new AddNewProductCommand(body.name, body.brand_id, body.price),
    );
    
    return ApiResponseBase.success(product);
  }

  @Get('find/:brand_id?')
  @HttpCode(HttpStatus.OK)
  // @HttpAuth(UserRole.AUTHOR, UserRole.ADMIN, UserRole.GUEST)
  // @ApiResponse({status: HttpStatus.OK, type: HttpRestApiResponseUser})
  public async findAll(@Param("brand_id?") brand_id?: string): Promise<ApiResponseBase<ProductView[]>> {
    const products: ProductView[] = await this.queryBus.execute(
      new ListProductQuery(brand_id),
    );
    return ApiResponseBase.success(products);
  }
  
}
