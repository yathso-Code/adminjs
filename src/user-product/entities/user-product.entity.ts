import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserProduct {
   @PrimaryGeneratedColumn()
   productid: number;

   @Column()
   name: string;

   @Column()
   cat: string;

   @Column()
   price: number;

   @Column()
   userid: number;
}
