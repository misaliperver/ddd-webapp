import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { ApiResponseBase } from '@BuildingBlocks/Infrastructure/Api/ApiResponseBase';
import { OrderView } from '@Modules/Orders/Domain/Orders/Order';
import { CreateOrderCommand } from '@Modules/Orders/Application/CreateOrder/CreateOrderCommand';
import { ClientInfoDto } from './dtos/ClientInfo.dto';
import { AddClientInfoCommand } from '@Modules/Orders/Application/AddClientInfo/AddClientInfoCommand';
import { ComplatePaymentCommand } from '@Modules/Orders/Application/ComplatePayment/ComplatePaymentCommand';
import { ComplateShipmentCommand } from '@Modules/Orders/Application/ComplateShipment/ComplateShipmentCommand';
import { ComplateCommand } from '@Modules/Orders/Application/Complate/ComplateCommand';
import { GetOrderQuery } from '@Modules/Orders/Application/GetOrder/GetOrderQuery';
import { OrderDto } from '@Modules/Orders/Domain/Orders/OrderDto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  @Get('get/:order_id')
  @HttpCode(HttpStatus.OK)
  public async get(@Param() params): Promise<ApiResponseBase<OrderDto>> {
    const order: OrderDto = await this.commandBus.execute(
      new GetOrderQuery(params.order_id),
    );
    
    
    return ApiResponseBase.success(order);
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  public async createNewOrder(@Body() body: CreateOrderDto): Promise<ApiResponseBase<{ id: string }>> {
    const id: { id: string } = await this.commandBus.execute(
      new CreateOrderCommand(body.product_id),
    );
    
    return ApiResponseBase.success(id);
  }

  @Post('addclient')
  @HttpCode(HttpStatus.OK)
  public async addClientInfo(@Body() body: ClientInfoDto): Promise<ApiResponseBase<{ id: string }>> {
    const id: { id: string } = await this.commandBus.execute(
      new AddClientInfoCommand(body.order_id, body.client_name, body.client_address),
    );
    
    return ApiResponseBase.success(id);
  }

  @Get('payment/:order_id/:token')
  @HttpCode(HttpStatus.OK)
  public async complatePayment(@Param() params): Promise<ApiResponseBase<{ id: string }>> {
    const id: { id: string } = await this.commandBus.execute(
      new ComplatePaymentCommand(params.order_id, params.token),
    );
    
    return ApiResponseBase.success(id);
  }


  @Get('shipment/:order_id/:token')
  @HttpCode(HttpStatus.OK)
  public async complateShipment(@Param() params): Promise<ApiResponseBase<{ id: string }>> {
    const id: { id: string } = await this.commandBus.execute(
      new ComplateShipmentCommand(params.order_id, params.token),
    );
    
    return ApiResponseBase.success(id);
  }
  
  @Get('complate/:order_id/:token')
  @HttpCode(HttpStatus.OK)
  public async complate(@Param() params): Promise<ApiResponseBase<{ id: string }>> {
    const id: { id: string } = await this.commandBus.execute(
      new ComplateCommand(params.order_id, params.token),
    );
    
    return ApiResponseBase.success(id);
  }
  
}
