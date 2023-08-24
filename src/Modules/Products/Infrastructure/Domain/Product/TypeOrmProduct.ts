import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TypeOrmBrand } from '../Brand/TypeOrmBrand';

@Entity('Product')
export class TypeOrmProduct {
  @PrimaryColumn()
  id: string;

  @Column()
  brand_id: string;

  @Column()
  name: string;

  @Column({ type: "decimal" })
  price: number;

  public brand: { id: string, name: string };
  
}
