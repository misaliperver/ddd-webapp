import { Inject, Injectable } from "@nestjs/common";
import { DataSource, InsertResult, Repository, SelectQueryBuilder } from "typeorm";
import { TypeOrmProduct } from "./TypeOrmProduct";
import { TypeOrmBrand } from "../Brand/TypeOrmBrand";
import { ProductView } from "@Modules/Products/Domain/Product/Product";
import { ProductOrmMapper } from "./ProductOrmMapper";
import { RepositoryFindOptionsPayload } from "@BuildingBlocks/Infrastructure/IRepostioryOptions";
import { IProductRepository } from "@Modules/Products/Domain/Product/IProductRepository";
import { InjectDataSource } from "@nestjs/typeorm";


@Injectable()
export class ProductRepository extends Repository<TypeOrmProduct> implements IProductRepository {
  private readonly alias: string = 'product';
  // private readonly excludeRemovedProductClause: string = `"${this.alias}"."removedAt" IS NULL`;

  constructor(@InjectDataSource("productsConnection") private dataSource: DataSource) {
    super(TypeOrmProduct, dataSource.createEntityManager());
  }

  public async findProducts(by: { brand_id?: string, productIds?: string[] }, options: RepositoryFindOptionsPayload = {}): Promise<ProductView[]> {
    const query: SelectQueryBuilder<TypeOrmProduct> = this.buildProductQueryBuilder();

    this.extendQueryWithByProperties(by, query);
    
    // if (!options.includeRemoved) {
    //   query.andWhere(this.excludeRemovedProductClause);
    // }
    if (options.limit) {
      query.limit(options.limit);
    }
    if (options.offset) {
      query.limit(options.offset);
    }

    const ormProducts: TypeOrmProduct[] = await query.getMany();

    const domainProducts: ProductView[] = ProductOrmMapper.toDomainEntities(ormProducts);
   
    return domainProducts;
  }
    
  public async addProduct(product: ProductView): Promise<{id: string}> {
    const ormProduct: TypeOrmProduct = ProductOrmMapper.toOrmEntity(product);
    
    const insertResult: InsertResult = await this
      .createQueryBuilder(this.alias)
      .insert()
      .into(TypeOrmProduct)
      .values([ormProduct])
      .execute();
    
    return {
      id: insertResult.identifiers[0].id
    };
  }
  
  private buildProductQueryBuilder(): SelectQueryBuilder<TypeOrmProduct> {
    return this
      .createQueryBuilder(this.alias)
      .select()
      .leftJoinAndMapOne(
        `${this.alias}.brand`,
        TypeOrmBrand,
        'brand',
        `${this.alias}."brand_id" = brand.id`
      );
  }
  
  private extendQueryWithByProperties(by: { brand_id?: string, productIds?: string[] }, query: SelectQueryBuilder<TypeOrmProduct>): void {
    if (by.brand_id) {
      query.andWhere(`"${this.alias}"."brand_id" = :brand_id`, { brand_id: by.brand_id });
    }
    if (by.productIds) {
      query.andWhere(`"${this.alias}"."id" IN (:...productIds)`, { productIds: by.productIds });
    }
  }
    
}