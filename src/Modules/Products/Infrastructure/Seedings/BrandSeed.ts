import { TypeOrmBrand } from "../Domain/Brand/TypeOrmBrand";
import { DataSource } from "typeorm";
import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class BrandSeed implements OnApplicationBootstrap {
    constructor(
        @InjectDataSource("productsConnection") private readonly dataSource: DataSource,
    ) {}

    async onApplicationBootstrap() {
        const exists =  await this.dataSource.manager.findOne(TypeOrmBrand, { where: {} });
        
        if (exists) return;

        for (const entity of this.getSeeds()) {
            await this.dataSource.manager.save(TypeOrmBrand, entity);
        }
        
    }

    getSeeds() {
        const ormBrand1: TypeOrmBrand = new TypeOrmBrand();
        ormBrand1.id = "ff7e1009-99d3-4e68-af52-e773abb5ced1";
        ormBrand1.name = 'Eti';

        const ormBrand2: TypeOrmBrand = new TypeOrmBrand();
        ormBrand2.id = "ff7e1009-99d3-4e68-af52-e773abb5ced2";
        ormBrand2.name = 'Ülker';

        const ormBrand3: TypeOrmBrand = new TypeOrmBrand();
        ormBrand3.id = "ff7e1009-99d3-4e68-af52-e773abb5ced3";
        ormBrand3.name = 'Algida';

        return [ormBrand1, ormBrand2, ormBrand3];
    }
}