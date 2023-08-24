import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Brand')
export class TypeOrmBrand {
  @PrimaryColumn()
  public id: string;
  
  @Column()
  name: string;
}
