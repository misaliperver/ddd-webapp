import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { OrdersModule } from "@Modules/Orders/Infrastructure/OrdersModule";
import { OrdersController } from "./OrdersController";

@Module({
  imports: [
    CqrsModule,
    OrdersModule,
  ],
  controllers: [
    OrdersController,
  ],
})
export class HttpOrdersModule {}
