import { Order, OrderView } from "@Modules/Orders/Domain/Orders/Order";
import { TypeOrmOrder } from "./TypeOrmOrder";
import { Money } from "@Modules/Orders/Domain/Orders/Money";
import { OrderId } from "@Modules/Orders/Domain/Orders/OrderId";
import { OrderItem, OrderItemView } from "@Modules/Orders/Domain/Orders/OrderItem";
import { OrderStatus } from "@Modules/Orders/Domain/Orders/OrderStatus";

export class OrderOrmMapper {
  public static OrderItemValueToEntity (orderItem: OrderItemView) {
    return {
      id: orderItem.Id,
      name: orderItem.Name,
      price: orderItem.Price.Value,
    };
  }

  public static OrderItemValueToDomain (orderItem: any) {
    return new OrderItem({
      Id: orderItem.id,
      Name: orderItem.name,
      Price: new Money(orderItem.price),
    })
  }
  
  public static toOrmEntity(domainOrder: OrderView): TypeOrmOrder {
    const ormOrder: TypeOrmOrder = new TypeOrmOrder();

    ormOrder.id = (domainOrder as Order).Id.Id;
    ormOrder.total_product_value = (domainOrder as Order).TotalProductValue.Value;
    ormOrder.total_shipping_value = (domainOrder as Order).TotalShippingValue.Value;
    ormOrder.client_name = (domainOrder as Order).ClientName;
    ormOrder.client_address = (domainOrder as Order).ClientAddress;
    ormOrder.orders = (domainOrder as Order).OrderItems.map((oi) => OrderOrmMapper.OrderItemValueToEntity(oi));
    ormOrder.status = (domainOrder as Order).Status as string;

    return ormOrder;
  }
  
  public static toOrmEntities(domainOrders: OrderView[]): TypeOrmOrder[] {
    return domainOrders.map(domainOrder => this.toOrmEntity(domainOrder));
  }
  
  public static toDomainEntity(ormOrder: TypeOrmOrder): OrderView {
    const domainOrder: OrderView = new Order({
      Id: new OrderId(ormOrder.id),
      TotalProductValue: new Money(ormOrder.total_product_value),
      TotalShippingValue: new Money(ormOrder.total_shipping_value),
      ClientName: ormOrder.client_name,
      ClientAddress: ormOrder.client_address,
      OrderItems: ormOrder.orders.map((o) => OrderOrmMapper.OrderItemValueToDomain(o)),
      Status: ormOrder.status as OrderStatus,
    });
    
    return domainOrder;
  }
  
  public static toDomainEntities(ormOrders: TypeOrmOrder[]): OrderView[] {
    return ormOrders.map(ormOrder => this.toDomainEntity(ormOrder));
  }
}
