import { Product, ProductView } from "./Product";
import { ProductBrand } from "./ProductBrand";

export class ProductDto {
    Id: string;
    Name: string;
    ProductBrand: {
        Id: string,
        Name: string,
    }
    Price: number;

    constructor(products: ProductView) {
        this.Id = (products as Product).Id.Id;
        this.Name = (products as Product).Name;
        this.ProductBrand = {
            Id: ((products as Product).ProductBrand as ProductBrand).Id.Id,
            Name: ((products as Product).ProductBrand as ProductBrand).Name,
        }
        this.Price = (products as Product).Price.Value;
    }
}