import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateOrderCommand } from "./CreateOrderCommand";
import { IOrderRepository, OrderRepositoryDIToken } from "@Modules/Orders/Domain/Orders/IOrderRepository";
import { ProductService } from "@Modules/Orders/Infrastructure/IntegrationService/ProductService";
import { Order, OrderView } from "@Modules/Orders/Domain/Orders/Order";


@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler  implements ICommandHandler<CreateOrderCommand>  {
    constructor(
        @Inject(OrderRepositoryDIToken) private readonly orderRepository: IOrderRepository,
        private readonly productIntegrationService: ProductService,
    ) {}


    async execute(command: CreateOrderCommand) {
        const [orderItem] = await this.productIntegrationService.getProduct([command.product_id]);

        if (!orderItem) {
            throw new Error('Product must be exists.');
        }

        const order: OrderView = Order.Create(orderItem);
    
        const { id } =  await this.orderRepository.addOrder(order);

        return id;
    }
}