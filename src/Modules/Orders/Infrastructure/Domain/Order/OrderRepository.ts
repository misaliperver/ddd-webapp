import { Inject, Injectable } from "@nestjs/common";
import { DataSource, InsertResult, Repository, SelectQueryBuilder } from "typeorm";
import { TypeOrmOrder } from "./TypeOrmOrder";
import { Order, OrderView } from "@Modules/Orders/Domain/Orders/Order";
import { OrderOrmMapper } from "./OrderOrmMapper";
import { RepositoryFindOptionsPayload } from "@BuildingBlocks/Infrastructure/IRepostioryOptions";
import { IOrderRepository } from "@Modules/Orders/Domain/Orders/IOrderRepository";
import { MethodSelector } from "@BuildingBlocks/Common/Types/CommonTypes";
import { InjectDataSource } from "@nestjs/typeorm";


@Injectable()
export class OrderRepository extends Repository<TypeOrmOrder> implements IOrderRepository {
  private readonly alias: string = 'order';

  constructor(@InjectDataSource("orderConnection") private dataSource: DataSource) {
    super(TypeOrmOrder, dataSource.createEntityManager());
  }

  async findOrder(order_id: any, options: RepositoryFindOptionsPayload): Promise<MethodSelector<Order>> {
    const query: SelectQueryBuilder<TypeOrmOrder> = this.buildOrderQueryBuilder();
    query.where({ id: order_id })
    query.execute();

    const ormOrder: TypeOrmOrder = await query.getOne();
    const domainOrder: OrderView = OrderOrmMapper.toDomainEntity(ormOrder);
    
    return domainOrder;
  }

  async addOrder(order: OrderView): Promise<{ id: string; }> {
    const ormOrder: TypeOrmOrder = OrderOrmMapper.toOrmEntity(order);

    const insertResult: InsertResult = await this
      .createQueryBuilder(this.alias)
      .insert()
      .into(TypeOrmOrder)
      .values([ormOrder])
      .execute();

    return {
      id: insertResult.identifiers[0].id
    };
  }

  async updateOrder(order: OrderView): Promise<{ id: string; }> {
      const ormOrder: TypeOrmOrder = OrderOrmMapper.toOrmEntity(order);
      await this.save(ormOrder);

      return {
        id: ormOrder.id,
      };
  }

  private buildOrderQueryBuilder(): SelectQueryBuilder<TypeOrmOrder> {
    return this
      .createQueryBuilder(this.alias)
      .select()
  }
}

