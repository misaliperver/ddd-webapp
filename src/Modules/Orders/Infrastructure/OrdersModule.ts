import { Inject, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseLogger } from './Configurations/DatabaseLogger';
import { DatabaseConfig } from './Configurations/DatabaseConfig';

import { TypeOrmOrder } from './Domain/Order/TypeOrmOrder';
import { OrderRepository } from './Domain/Order/OrderRepository';
import { CreateOrderCommandHandler } from '../Application/CreateOrder/CreateOrderCommandHandler';
import { AddClientInfoCommandHandler } from '../Application/AddClientInfo/AddClientInfoCommandHandler';
import { ComplatePaymentCommandHandler } from '../Application/ComplatePayment/ComplatePaymentCommandHandler';
import { ComplateShipmentCommandHandler } from '../Application/ComplateShipment/ComplateShipmentCommandHandler';
import { ComplateCommandHandler } from '../Application/Complate/ComplateCommandHandler';
import { OrderRepositoryDIToken } from '../Domain/Orders/IOrderRepository';
import { ProductService } from './IntegrationService/ProductService';
import { GetOrderQueryHandler } from '../Application/GetOrder/GetOrderQueryHandler';
import { EmailService } from './IntegrationService/EmailService';



const CommandHandlers = [
    CreateOrderCommandHandler,
    AddClientInfoCommandHandler,
    ComplatePaymentCommandHandler,
    ComplateShipmentCommandHandler,
    ComplateCommandHandler,
];

const QueryHandlers = [
    GetOrderQueryHandler,
];

const persistence = [
    {
        provide: OrderRepositoryDIToken,
        useClass: OrderRepository,
    },
];

const IntegrationServices = [
    ProductService,
    EmailService,
]

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forRoot({
            name                     : 'orderConnection',
            type                     : 'postgres',
            host                     : DatabaseConfig.DB_HOST,
            port                     : DatabaseConfig.DB_PORT,
            username                 : DatabaseConfig.DB_USERNAME,
            password                 : DatabaseConfig.DB_PASSWORD,
            database                 : DatabaseConfig.DB_NAME,
            logging                  : DatabaseConfig.DB_LOG_ENABLE ? 'all' : false,
            logger                   : DatabaseConfig.DB_LOG_ENABLE ? DataBaseLogger.new() : undefined,
            entities                 : [
                TypeOrmOrder,
            ],
            migrationsRun            : true,
            migrations               : [`./Migrations/**/*{.ts,.js}`],
            migrationsTransactionMode: 'all',
            synchronize: true,
        }),
    ],
    providers: [
        ...IntegrationServices,
        ...persistence,
        ...CommandHandlers,
        ...QueryHandlers,
    ],
    exports: [
        ...persistence,
        ...CommandHandlers,
        ...QueryHandlers,
    ]
})
export class OrdersModule {}
