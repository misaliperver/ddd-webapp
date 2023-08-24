import { CommandHandler, ICommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetOrderQuery } from "./GetOrderQuery";
import { IOrderRepository, OrderRepositoryDIToken } from "@Modules/Orders/Domain/Orders/IOrderRepository";
import { OrderView } from "@Modules/Orders/Domain/Orders/Order";
import { OrderDto } from "@Modules/Orders/Domain/Orders/OrderDto";


@CommandHandler(GetOrderQuery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderQuery>  {
    constructor(
        @Inject(OrderRepositoryDIToken) private readonly orderRepository: IOrderRepository,
    ) {}


    async execute(command: GetOrderQuery) {
        const order: OrderView = await this.orderRepository.findOrder(command.order_id, {});

        return new OrderDto(order);
    }
}