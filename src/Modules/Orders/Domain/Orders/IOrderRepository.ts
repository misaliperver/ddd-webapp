import { RepositoryFindOptionsPayload } from "@BuildingBlocks/Infrastructure/IRepostioryOptions";
import { OrderView } from "./Order";

export const OrderRepositoryDIToken = Symbol('OrderRepository');

export interface IOrderRepository {
    findOrder(order_id, options: RepositoryFindOptionsPayload): Promise<OrderView>;
    addOrder(product: OrderView): Promise<{id: string}>;
    updateOrder(order: OrderView): Promise<{id: string}>;
}