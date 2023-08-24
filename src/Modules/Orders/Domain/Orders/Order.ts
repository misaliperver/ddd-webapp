import { EntityBase } from "@BuildingBlocks/Domain/EntityBase";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsInstance, IsOptional, IsString, ValidateNested, isString } from "class-validator";
import { GuidGenerator } from "@BuildingBlocks/Common/Utils/GuidGenerator";
import { IAggregateRoot } from "@BuildingBlocks/Domain/IAggregateRoot";
import { MethodSelector } from "@BuildingBlocks/Common/Types/CommonTypes";
import { OrderId } from "./OrderId";
import { Money } from "./Money";
import { OrderItem, OrderItemView } from "./OrderItem";
import { ProductBrandView } from "@Modules/Products/Domain/Product/ProductBrand";
import { Type } from "class-transformer";
import { OrderStatus } from "./OrderStatus";
import { StatusMustBeCreated } from "./Rules/StatusMustBeCreated";
import { StatusMustBePaymentComplated } from "./Rules/StatusMustBePaymentComplated";
import { StatusMustBeShipmentWaiting } from "./Rules/StatusMustBeShipmentWaiting";
import { StatusMustBeShipmentComplated } from "./Rules/StatusMustBeShipmentComplated";
import { ClientInfoMustBeAdded } from "./Rules/ClientInfoMustBeAdded";
import { ComparePaymentToken } from "./Rules/ComparePaymentToken";
import { CompareShipmentToken } from "./Rules/CompareShipmentToken";

export type OrderConstructorPayload = {
    Id: OrderId;
    TotalProductValue: Money;
    TotalShippingValue: Money,
    ClientName: string,
    ClientAddress: string,
    OrderItems: OrderItemView[],
    Status: OrderStatus;
};

export type CreateNewProductPayload = {};
export type AddClientInfoPayload = {
    ClientName: string;
    ClientAddress: string;
}

export type OrderView = MethodSelector<Order>;
export class Order extends EntityBase implements IAggregateRoot {
    @IsInstance(OrderId)
    public readonly Id: OrderId;

    @IsInstance(Money)
    public TotalProductValue: Money;

    @IsInstance(Money)
    public TotalShippingValue: Money;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItem)
    public OrderItems: OrderItemView[];

    @IsOptional()
    @IsString()
    ClientName: string;

    @IsOptional()
    @IsString()
    ClientAddress: string;

    @IsEnum(OrderStatus)
    Status: OrderStatus; // waiting_payment, payment, waiting_shipment, shipment, complated

    constructor(payload: OrderConstructorPayload) {
        super();

        this.Id = payload.Id;
        this.TotalProductValue = payload.TotalProductValue;
        this.TotalShippingValue = payload.TotalShippingValue;
        this.ClientName = payload.ClientName || null;
        this.ClientAddress = payload.ClientAddress || null;
        this.OrderItems = payload.OrderItems || new Array<OrderItemView>();
        this.Status = payload.Status;
    }

    public static Create(orderItem: OrderItem) {
        const price = (orderItem as OrderItem).Price;

        const order = new Order({
            Id: OrderId.Create(GuidGenerator.generate()),
            TotalProductValue: price,
            TotalShippingValue: new Money(0),
            ClientName: null,
            ClientAddress: null,
            OrderItems: [orderItem],
            Status: OrderStatus.created,
        });

        order.ValidateSync();

        return order;
    }

    private CalculateOrderValues() {
        let total_price = 0;

        for (const OrderItem of this.OrderItems) {
            total_price += (OrderItem as OrderItem).Price.Value;
        }
        
        return Money.Create(total_price);
    }

    public AddOrderItem(orderItem: OrderItemView) {
        this.CheckRule(new StatusMustBeCreated(this.Status));

        this.OrderItems.push(orderItem);

        const total_price = this.CalculateOrderValues();
        this.TotalProductValue = total_price;
        // this.TotalShippingValue = total_price;

        this.ValidateSync();
    }

    public AddClientInfo(clientInfo: AddClientInfoPayload) {
        this.CheckRule(new StatusMustBeCreated(this.Status));

        this.ClientName = clientInfo.ClientName;
        this.ClientAddress = clientInfo.ClientAddress;

        this.CheckRule(new ClientInfoMustBeAdded(this.ClientName, this.ClientAddress));

        this.ValidateSync();
    }

    public PaymentComplate(token: string) {
        this.CheckRule(new StatusMustBeCreated(this.Status));
        this.CheckRule(new ComparePaymentToken(token));

        this.Status = OrderStatus.payment_complated;

        this.ValidateSync();

        this.ShipmentWaiting(); // Like Event
    }

    public ShipmentWaiting() {
        this.CheckRule(new StatusMustBePaymentComplated(this.Status));

        this.Status = OrderStatus.waiting_shipment;

        this.ValidateSync();
    }

    public ShipmentComplate(token: string) {
        this.CheckRule(new StatusMustBeShipmentWaiting(this.Status));
        this.CheckRule(new CompareShipmentToken(token));

        this.Status = OrderStatus.shipment_complated;

        this.ValidateSync();
    }

    public Complate(token) {
        this.CheckRule(new StatusMustBeShipmentComplated(this.Status));
        this.CheckRule(new CompareShipmentToken(token));

        this.Status = OrderStatus.complated;

        this.ValidateSync();
    }
}