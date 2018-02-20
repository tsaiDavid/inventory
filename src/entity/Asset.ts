import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Asset {

    @PrimaryGeneratedColumn()
    assetId: number;

    @Column()
    assetTypeCode: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "text" })
    otherDetails: string;

}
