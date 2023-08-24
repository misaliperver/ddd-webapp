import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { IOrderRepository, OrderRepositoryDIToken } from "@Modules/Orders/Domain/Orders/IOrderRepository";
import { Order, OrderView } from "@Modules/Orders/Domain/Orders/Order";
import { AddClientInfoCommand } from "./AddClientInfoCommand";


@CommandHandler(AddClientInfoCommand)
export class AddClientInfoCommandHandler implements ICommandHandler<AddClientInfoCommand>  {
    constructor(
        @Inject(OrderRepositoryDIToken) private readonly orderRepository: IOrderRepository,
    ) {}


    async execute(command: AddClientInfoCommand) {
        const order: OrderView = await this.orderRepository.findOrder(command.orderId, {});

        order.AddClientInfo({
            ClientName: command.clientName,
            ClientAddress: command.clientAddress,
        });
    
        const { id } =  await this.orderRepository.updateOrder(order);
    
        return id;
    }
}