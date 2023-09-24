import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userEmail: string;

  @Column()
  shippingAddress: string;

  // list of the purchased product ids
  // the type should be Product[] but for simplicity
  // I am using array of strings(ids)
  @Column('varchar', { array: true })
  products: string[];

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
