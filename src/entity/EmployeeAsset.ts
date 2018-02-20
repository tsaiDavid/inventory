import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from './Employee';


@Entity()
export class EmployeeAsset {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Employee, employee => employee.employeeAssets)
    employee: Employee;

    // @Column({ type: "date" })
    // dateOut: string;

    // @Column({ type: "date" })
    // dateReturned: string;

    @Column()
    conditionOut: string;

    // @Column()
    // conditionReturned: string;

    // @Column({ type: "text" })
    // otherDetails: string;

}
