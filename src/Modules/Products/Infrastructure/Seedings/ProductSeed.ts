import { GuidGenerator } from "@BuildingBlocks/Common/Utils/GuidGenerator";
import { TypeOrmProduct } from "../Domain/Product/TypeOrmProduct";
import { DataSource } from "typeorm";
import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class ProductSeed implements OnApplicationBootstrap {
    constructor(
        @InjectDataSource("productsConnection") private readonly dataSource: DataSource,
    ) {}

    async onApplicationBootstrap() {
        const exists = await this.dataSource.manager.findOne(TypeOrmProduct, { where: {} });
        
        if (exists) return;

    
        for (const entity of this.getSeeds()) {
            await this.dataSource.manager.save(TypeOrmProduct, entity);
        }
    }

    getSeeds() {
        const ormProduct1: TypeOrmProduct = new TypeOrmProduct();
        ormProduct1.id = GuidGenerator.generate();
        ormProduct1.name = 'Cin';
        ormProduct1.brand_id = 'ff7e1009-99d3-4e68-af52-e773abb5ced1';
        ormProduct1.price = 10;

        const ormProduct2: TypeOrmProduct = new TypeOrmProduct();
        ormProduct2.id = GuidGenerator.generate();
        ormProduct2.name = 'Benimo';
        ormProduct2.brand_id = 'ff7e1009-99d3-4e68-af52-e773abb5ced1';
        ormProduct2.price = 20;

        const ormProduct3: TypeOrmProduct = new TypeOrmProduct();
        ormProduct3.id = GuidGenerator.generate();
        ormProduct3.name = 'Çikolatalı Gofret';
        ormProduct3.brand_id = 'ff7e1009-99d3-4e68-af52-e773abb5ced2';
        ormProduct3.price = 10;

        const ormProduct4: TypeOrmProduct = new TypeOrmProduct();
        ormProduct4.id = GuidGenerator.generate();
        ormProduct4.name = 'Popkek';
        ormProduct4.brand_id = 'ff7e1009-99d3-4e68-af52-e773abb5ced2';
        ormProduct4.price = 5;

        const ormProduct5: TypeOrmProduct = new TypeOrmProduct();
        ormProduct5.id = GuidGenerator.generate();
        ormProduct5.name = 'Buzparmak';
        ormProduct5.brand_id = 'ff7e1009-99d3-4e68-af52-e773abb5ced3';
        ormProduct5.price = 12;

        const ormProduct6: TypeOrmProduct = new TypeOrmProduct();
        ormProduct6.id = GuidGenerator.generate();
        ormProduct6.name = 'Cornetto';
        ormProduct6.brand_id = 'ff7e1009-99d3-4e68-af52-e773abb5ced3';
        ormProduct6.price = 25;


        return [ormProduct1, ormProduct2, ormProduct3, ormProduct4, ormProduct5, ormProduct6];
    }
}