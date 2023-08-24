import { Inject, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseLogger } from './Configurations/DatabaseLogger';
import { DatabaseConfig } from './Configurations/DatabaseConfig';

import { TypeOrmProduct } from './Domain/Product/TypeOrmProduct';
import { ProductRepository } from './Domain/Product/ProductRepository';
import { TypeOrmBrand } from './Domain/Brand/TypeOrmBrand';
import { BrandRepository } from './Domain/Brand/BrandRepository';

import { AddNewProductCommandHandler } from '../Application/AddNewProduct/AddNewProductCommandHandler';
import { ListProductQueryHandler } from '../Application/ListProducts/ListProductQueryHandler';
import { ProductRepositoryDIToken } from '../Domain/Product/IProductRepository';
import { BrandRepositoryDIToken } from '../Domain/Brand/IBrandRepository';
import { DataSource } from 'typeorm';
import { ProductSeed } from './Seedings/ProductSeed';
import { BrandSeed } from './Seedings/BrandSeed';
import { GetProductsByIdsQueryHandler } from '../Application/GetProductsByIds/GetProductsByIdsQueryHandler';

const CommandHandlers = [
    AddNewProductCommandHandler,
];

const QueryHandlers = [
    ListProductQueryHandler,
    GetProductsByIdsQueryHandler,
];

const Seedings = [
    BrandSeed,
    ProductSeed,
]

const persistence = [
    {
        provide: ProductRepositoryDIToken,
        useClass: ProductRepository,
    },
    {
        provide: BrandRepositoryDIToken,
        useClass: BrandRepository,
    }
];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forRoot({
            name                     : 'productsConnection',
            type                     : 'postgres',
            host                     : DatabaseConfig.DB_HOST,
            port                     : DatabaseConfig.DB_PORT,
            username                 : DatabaseConfig.DB_USERNAME,
            password                 : DatabaseConfig.DB_PASSWORD,
            database                 : DatabaseConfig.DB_NAME,
            logging                  : DatabaseConfig.DB_LOG_ENABLE ? 'all' : false,
            logger                   : DatabaseConfig.DB_LOG_ENABLE ? DataBaseLogger.new() : undefined,
            entities                 : [
                TypeOrmBrand,
                TypeOrmProduct,
            ],
            migrationsRun            : true,
            migrations               : [`./Migrations/**/*{.ts,.js}`],
            migrationsTransactionMode: 'all',
            synchronize: true,
        }),
    ],
    providers: [
        ...persistence,
        ...CommandHandlers,
        ...QueryHandlers,
        ...Seedings,
    ],
    exports: [
        ...persistence,
        ...CommandHandlers,
        ...QueryHandlers,
    ]
})
export class ProductsModule {}
