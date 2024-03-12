import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userid: number;

    @Column()
    name: string;

    @Column({ nullable: true }) // Allow null values for the email column
    email: string;

    @Column()
    age: number;

    @Column({ nullable: true })
    password: string;

    @Column('simple-array',{  array: true,  default: [], nullable: true })
    addToCard: string[];

}
