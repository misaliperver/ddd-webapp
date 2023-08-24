import { Brand } from "@Modules/Products/Domain/Brand/Brand";
import { BrandId } from "@Modules/Products/Domain/Brand/BrandId";

describe('Modules.Products.Domain.Brand', () => {
    describe('Create', () => {

        test('Create Brand instance tobe:', () => {
            const brand = Brand.Create({
                Name: "Mercedes",
            });

            // Arch
            expect(brand.Id).toBeInstanceOf(BrandId);
            expect(typeof brand.Name).toBe("string");

            // Value
            expect(brand.Id.Id).toBeDefined();
            expect(brand.Name).toBe("Mercedes");
        });

    });

});