import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Asset } from './Asset';
import { Employee } from './Employee';


@Entity()
export class EmployeeAsset {

    // Primary/Foreign Key
    @ManyToOne(type => Asset, asset => asset.employeeAssets)
    asset: Asset;

    // Primary/Foreign Key
    @ManyToOne(type => Employee, employee => employee.employeeAssets)
    employee: Employee;

    // Primary Key
    @PrimaryColumn({ type: "timestamp" })
    dateOut: string;

    @Column({ type: "timestamp", nullable: true })
    dateReturned: string;

    @Column()
    conditionOut: string;

    @Column({ nullable: true })
    conditionReturned: string;

    @Column({ type: "text", nullable: true })
    otherDetails: string;

}
