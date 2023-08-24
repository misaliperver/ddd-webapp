import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { IOrderRepository, OrderRepositoryDIToken } from "@Modules/Orders/Domain/Orders/IOrderRepository";
import { OrderView } from "@Modules/Orders/Domain/Orders/Order";
import { ComplateCommand } from "./ComplateCommand";


@CommandHandler(ComplateCommand)
export class ComplateCommandHandler implements ICommandHandler<ComplateCommand>  {
    constructor(
        @Inject(OrderRepositoryDIToken) private readonly orderRepository: IOrderRepository,
    ) {}

    async execute(command: ComplateCommand) {
        const order: OrderView = await this.orderRepository.findOrder(command.orderId, {});

        order.Complate(command.token);
    
        const { id } =  await this.orderRepository.updateOrder(order);
    
        return id;
    }
}