import { Product } from "@Modules/Products/Domain/Product/Product";
import { Order, OrderView } from "./Order";
import { OrderItem, OrderItemView } from "./OrderItem";

export type OrderItemDto = {
    Id: string;
    Name: string;
    Price: number;
}

export class OrderDto {
    Id: string;
    TotalProductValue: number;
    TotalShippingValue: number;
    ClientName: string;
    ClientAddress: string;
    OrderItems: OrderItemDto[];
    Status: string;

    constructor(order: OrderView) {
        this.Id = (order as Order).Id.Id;
        this.TotalProductValue = (order as Order).TotalProductValue.Value;
        this.TotalShippingValue = (order as Order).TotalShippingValue.Value;
        this.ClientName = (order as Order).ClientName;
        this.ClientAddress = (order as Order).ClientAddress;
        this.OrderItems = (order as Order).OrderItems.map((oi): OrderItemDto => { 
            return { 
                Id: oi.Id,
                Name: oi.Name,
                Price: oi.Price.Value,
            };
        });
        this.Status = (order as Order).Status;
    }
}