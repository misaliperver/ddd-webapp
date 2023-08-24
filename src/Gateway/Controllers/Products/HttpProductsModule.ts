import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ProductsModule } from "@Modules/Products/Infrastructure/ProductsModule";
import { ProductsController } from "./ProductsController";

@Module({
  imports: [
    CqrsModule,
    ProductsModule,
  ],
  controllers: [
    ProductsController,
  ],
})
export class HttpProductsModule {}
