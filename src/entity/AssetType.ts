import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AssetType {

    @PrimaryGeneratedColumn()
    assetTypeCode: number;

    @Column()
    assetTypeDescription: string;
    // eg Hardware, Software, Printer

}
