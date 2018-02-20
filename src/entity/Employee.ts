import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EmployeeAsset } from './EmployeeAsset';

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => EmployeeAsset, employeeAsset => employeeAsset.employee)
    employeeAssets: EmployeeAsset[];

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    // @Column()
    // department: string;

}
