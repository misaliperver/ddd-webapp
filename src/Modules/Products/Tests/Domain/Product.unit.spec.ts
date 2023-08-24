import { BusinessRuleValidationException } from "@BuildingBlocks/Domain/BusinessRuleValidationException";
import { BrandId } from "@Modules/Products/Domain/Brand/BrandId";
import { Money } from "@Modules/Products/Domain/Product/Money";
import { Product } from "@Modules/Products/Domain/Product/Product";
import { ProductBrand } from "@Modules/Products/Domain/Product/ProductBrand";
import { ProductId } from "@Modules/Products/Domain/Product/ProductId";

const CreateNewProductBrand = (Id, Name) => {
    return ProductBrand.Create({
        Id: BrandId.Create(Id),
        Name,
    });
}
const CreateNewProduct = () => {
    return Product.Create({
        Name: "E200",
        ProductBrand: CreateNewProductBrand("1234","Mercedes"),
        Price: Money.Create(1000000),
    });
}

describe('Modules.Products.Domain.Product', () => {
    describe('Create', () => {

        test('While we create the product instance tobe:', () => {
            const product = CreateNewProduct();

            // Arch
            expect(product.Id).toBeInstanceOf(ProductId);
            expect(typeof product.Name).toBe("string");
            expect((product.ProductBrand as ProductBrand).Id).toBeInstanceOf(BrandId);
            expect(typeof (product.ProductBrand as ProductBrand).Name).toBe("string");
            expect(product.Price).toBeInstanceOf(Money);

            // Value
            expect(product.Id.Id).toBeDefined();
            expect(product.Name).toBe("E200");
            expect((product.ProductBrand as ProductBrand).Id.Id).toBeDefined();
            expect((product.ProductBrand as ProductBrand).Name).toBe("Mercedes");
            expect(product.Price.Value).toBe(1000000);
        });

        test('While we create the product unknown value, intance get error', () => {
            const payload: any = {
                Name: "E200",
                ProductBrand: CreateNewProductBrand("1234","Mercedes"),
                Price: 1000,
            }
            try {
                Product.Create(payload);
            } catch (err) {
                expect(err).toBeInstanceOf(BusinessRuleValidationException);
            }
           
        })

    });

    describe('EditProductName', () => {
        test('Product instance tobe:', () => {
            const product = CreateNewProduct();

            product.EditProductName('E350');

            // Value
            expect(product.Name).toBe("E350");
        });
    });

    describe('EditProductBrand', () => {
        test('Product instance tobe:', () => {
            const product = CreateNewProduct();

            const productBrand = CreateNewProductBrand("1234", "Volvo");
            product.EditProductBrand(productBrand);

            // Value
            expect((product.ProductBrand as ProductBrand).Id.Id).toBe("1234");
            expect((product.ProductBrand as ProductBrand).Name).toBe("Volvo");

        });
    })

});