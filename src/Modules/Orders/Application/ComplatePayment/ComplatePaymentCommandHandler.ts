import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { IOrderRepository, OrderRepositoryDIToken } from "@Modules/Orders/Domain/Orders/IOrderRepository";
import { OrderView } from "@Modules/Orders/Domain/Orders/Order";
import { ComplatePaymentCommand } from "./ComplatePaymentCommand";
import { EmailService } from "@Modules/Orders/Infrastructure/IntegrationService/EmailService";


@CommandHandler(ComplatePaymentCommand)
export class ComplatePaymentCommandHandler implements ICommandHandler<ComplatePaymentCommand>  {
    constructor(
        @Inject(OrderRepositoryDIToken) private readonly orderRepository: IOrderRepository,
        private readonly emailService: EmailService,
    ) {}

    async execute(command: ComplatePaymentCommand) {
        const order: OrderView = await this.orderRepository.findOrder(command.orderId, {});

        order.PaymentComplate(command.token);
    
        const { id } =  await this.orderRepository.updateOrder(order);

        await this.emailService.sendEmail('fatihcankeser16@gmail.com', order);
    
        return id;
    }
}