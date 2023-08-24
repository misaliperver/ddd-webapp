import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Order')
export class TypeOrmOrder {
  @PrimaryColumn()
  id: string;

  @Column({ type: "float" })
  total_product_value: number;

  @Column({ type: "float" })
  total_shipping_value: number;

  @Column({ nullable: true })
  client_name?: string;

  @Column({ nullable: true })
  client_address?: string;

  @Column()
  status: string;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  orders: Array<{ id: string, name: string, price: number }>

}
