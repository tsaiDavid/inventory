import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    Column,
    ManyToOne
} from "typeorm";
import { EmployeeAsset } from './EmployeeAsset';
import { AssetType } from './AssetType';

@Entity()
export class Asset {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(type => EmployeeAsset, employeeAsset => employeeAsset.employee)
    employeeAssets: EmployeeAsset[];

    // Primary/Foreign Key
    @ManyToOne(type => AssetType, assetType => assetType.code)
    assetType: AssetType;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "text", nullable: true })
    otherDetails: string;

}
