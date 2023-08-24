import { Brand, BrandView } from "@Modules/Products/Domain/Brand/Brand";
import { TypeOrmBrand } from "./TypeOrmBrand";
import { BrandId } from "@Modules/Products/Domain/Brand/BrandId";

export class BrandOrmMapper {
  public static toOrmEntity(domainBrand: BrandView): TypeOrmBrand {
    const ormBrand: TypeOrmBrand = new TypeOrmBrand();

    ormBrand.id = (domainBrand as Brand).Id.Id;
    ormBrand.name = (domainBrand as Brand).Name;

    return ormBrand;
  }
  
  public static toOrmEntities(domainBrands: BrandView[]): TypeOrmBrand[] {
    return domainBrands.map(domainBrand => this.toOrmEntity(domainBrand));
  }
  
  public static toDomainEntity(ormBrand: TypeOrmBrand): BrandView {
    const domainBrand: BrandView = new Brand({
      Id: new BrandId(ormBrand.id),
      Name: ormBrand.name,
    });
    
    return domainBrand;
  }
  
  public static toDomainEntities(ormBrands: TypeOrmBrand[]): BrandView[] {
    return ormBrands.map(ormBrand => this.toDomainEntity(ormBrand));
  }
}
