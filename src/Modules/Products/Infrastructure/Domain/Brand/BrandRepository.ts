import { Injectable } from "@nestjs/common";
import { DataSource, InsertResult, Repository, SelectQueryBuilder } from "typeorm";
import { TypeOrmBrand } from "./TypeOrmBrand";
import { BrandOrmMapper } from "./BrandOrmMapper";
import { RepositoryFindOptionsPayload } from "@BuildingBlocks/Infrastructure/IRepostioryOptions";
import { BrandView } from "@Modules/Products/Domain/Brand/Brand";
import { IBrandRepository } from "@Modules/Products/Domain/Brand/IBrandRepository";
import { InjectDataSource } from "@nestjs/typeorm";


@Injectable()
export class BrandRepository extends Repository<TypeOrmBrand> implements IBrandRepository {
  private readonly alias: string = 'brand';
  // private readonly excludeRemovedBrandClause: string = `"${this.alias}"."removedAt" IS NULL`;

  constructor(@InjectDataSource("productsConnection") private dataSource: DataSource) {
    super(TypeOrmBrand, dataSource.createEntityManager());
  }

  public async findBrand(brand_id: string): Promise<BrandView> {
    const query: SelectQueryBuilder<TypeOrmBrand> = this.buildBrandQueryBuilder();
    query.where({ id: brand_id })
    query.execute();
  
    const ormBrand: TypeOrmBrand = await query.getOne();
    const domainBrand: BrandView = BrandOrmMapper.toDomainEntity(ormBrand);
    
    return domainBrand;
  }

  public async findBrands(by: { }, options: RepositoryFindOptionsPayload = {}): Promise<BrandView[]> {
    const query: SelectQueryBuilder<TypeOrmBrand> = this.buildBrandQueryBuilder();
      
    // if (!options.includeRemoved) {
    //   query.andWhere(this.excludeRemovedBrandClause);
    // }
    if (options.limit) {
      query.limit(options.limit);
    }
    if (options.offset) {
      query.limit(options.offset);
    }
    
    const ormBrands: TypeOrmBrand[] = await query.getMany();
    const domainBrands: BrandView[] = BrandOrmMapper.toDomainEntities(ormBrands);
    
    return domainBrands;
  }
    
  public async addBrand(brand: BrandView): Promise<{id: string}> {
    const ormBrand: TypeOrmBrand = BrandOrmMapper.toOrmEntity(brand);
    
    const insertResult: InsertResult = await this
      .createQueryBuilder(this.alias)
      .insert()
      .into(TypeOrmBrand)
      .values([ormBrand])
      .execute();
    
    return {
      id: insertResult.identifiers[0].id
    };
  }
    
  private buildBrandQueryBuilder(): SelectQueryBuilder<TypeOrmBrand> {
    return this
      .createQueryBuilder(this.alias)
      .select()
  }
    
}