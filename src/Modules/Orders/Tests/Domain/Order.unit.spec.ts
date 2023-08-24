import { Money } from "@Modules/Orders/Domain/Orders/Money";
import { Order } from "@Modules/Orders/Domain/Orders/Order";
import { OrderId } from  "@Modules/Orders/Domain/Orders/OrderId";
import { OrderItem } from "@Modules/Orders/Domain/Orders/OrderItem";
import { OrderStatus } from "@Modules/Orders/Domain/Orders/OrderStatus";

const CreateNewOrderItem = (id: string, name: string, money: number) => {
    return OrderItem.Create({
        Id: id,
        Name: name,
        Price: Money.Create(money),
    });
}
const CreateNewProduct = () => {
    return Order.Create(CreateNewOrderItem('123', 'Eti', 100));
}

const paymentToken = 'Trk5Ldkm4Dmal10Gmllsk+58sld';
const shipmentToken = 'Trk5Ldkm4Dmal10Gmllsk+58sld';
const complatedToken = 'Trk5Ldkm4Dmal10Gmllsk+58sld';

describe('Modules.Orders.Domain.Order', () => {
    describe('Create', () => {

        test('Create Brand instance tobe:', () => {
            const order = CreateNewProduct();

            // Arch
            expect(order.Id).toBeInstanceOf(OrderId);
            expect(order.TotalProductValue).toBeInstanceOf(Money);
            expect(order.TotalShippingValue).toBeInstanceOf(Money);

            // Value
            expect(order.TotalProductValue.Value).toBe(100);
            expect(order.TotalShippingValue.Value).toBe(0);
            expect(order.ClientName).toBe(null);
            expect(order.ClientAddress).toBe(null);
            expect(order.OrderItems).toMatchObject([CreateNewOrderItem('123', 'Eti', 100)]);
            expect(order.Status).toBe(OrderStatus.created as string);
        });

    });

    describe('AddOrderItem', () => {

        test('While we added new productItem tobe:', () => {
            const order = CreateNewProduct();
            const newOrderItem = CreateNewOrderItem('12', 'deneme', 100);

            order.AddOrderItem(newOrderItem);

            expect(order.TotalProductValue.Value).toBe(200);
            expect(order.TotalShippingValue.Value).toBe(0);
        });

    });


    describe('AddClientInfo', () => {

        test('While we added new client info tobe:', () => {
            const order = CreateNewProduct();

            order.AddClientInfo({
                ClientAddress: "istanbul",
                ClientName: "fatih",
            });

            expect(order.ClientAddress).toBe("istanbul");
            expect(order.ClientName).toBe("fatih");
        });

    });

    describe('PaymentComplate', () => {

        test('While we trigger payment tobe:', () => {
            const order = CreateNewProduct();

            order.PaymentComplate(paymentToken);

            expect(order.Status).toBe(OrderStatus.waiting_shipment);
        });

    });

    describe('ShipmentComplate', () => {

        test('While we added trigger shipment info tobe:', () => {
            const order = CreateNewProduct();
            
            order.PaymentComplate(paymentToken);
            order.ShipmentComplate(shipmentToken);

            expect(order.Status).toBe(OrderStatus.shipment_complated);
        });

    });

    describe('Complate', () => {

        test('While we added trigger complate tobe:', () => {
            const order = CreateNewProduct();
            
            order.PaymentComplate(paymentToken);
            order.ShipmentComplate(shipmentToken);
            order.Complate(complatedToken);

            expect(order.Status).toBe(OrderStatus.complated);
        });

    });

});