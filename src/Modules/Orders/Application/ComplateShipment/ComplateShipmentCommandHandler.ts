import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { IOrderRepository, OrderRepositoryDIToken } from "@Modules/Orders/Domain/Orders/IOrderRepository";
import { OrderView } from "@Modules/Orders/Domain/Orders/Order";
import { ComplateShipmentCommand } from "./ComplateShipmentCommand";


@CommandHandler(ComplateShipmentCommand)
export class ComplateShipmentCommandHandler implements ICommandHandler<ComplateShipmentCommand>  {
    constructor(
        @Inject(OrderRepositoryDIToken) private readonly orderRepository: IOrderRepository,
    ) {}

    async execute(command: ComplateShipmentCommand) {
        const order: OrderView = await this.orderRepository.findOrder(command.orderId, {});

        order.ShipmentComplate(command.token);
    
        const { id } =  await this.orderRepository.updateOrder(order);
    
        return id;
    }
}