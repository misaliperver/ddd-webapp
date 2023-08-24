import { Product, ProductView } from "@Modules/Products/Domain/Product/Product";
import { TypeOrmProduct } from "./TypeOrmProduct";
import { ProductId } from "@Modules/Products/Domain/Product/ProductId";
import { ProductBrand } from "@Modules/Products/Domain/Product/ProductBrand";
import { Money } from "@Modules/Products/Domain/Product/Money";
import { BrandId } from "@Modules/Products/Domain/Brand/BrandId";

export class ProductOrmMapper {
  public static toOrmEntity(domainProduct: ProductView): TypeOrmProduct {
    const ormProduct: TypeOrmProduct = new TypeOrmProduct();

    ormProduct.id = (domainProduct as Product).Id.Id;
    ormProduct.name = (domainProduct as Product).Name;
    ormProduct.brand_id = ((domainProduct as Product).ProductBrand as ProductBrand).Id.Id;
    ormProduct.price = (domainProduct as Product).Price.Value;

    return ormProduct;
  }
  
  public static toOrmEntities(domainProducts: ProductView[]): TypeOrmProduct[] {
    return domainProducts.map(domainProduct => this.toOrmEntity(domainProduct));
  }
  
  public static toDomainEntity(ormProduct: TypeOrmProduct): ProductView {
    const domainProduct: ProductView = new Product({
      Id: new ProductId(ormProduct.id),
      Name: ormProduct.name,
      Price: new Money(ormProduct.price),
      ProductBrand: new ProductBrand({
        Id: new BrandId(ormProduct.brand.id),
        Name: ormProduct.brand.name,
      })
    });
    
    return domainProduct;
  }
  
  public static toDomainEntities(ormProducts: TypeOrmProduct[]): ProductView[] {
    return ormProducts.map(ormProduct => this.toDomainEntity(ormProduct));
  }
}
