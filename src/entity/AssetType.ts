import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Asset } from './Asset';

@Entity()
export class AssetType {

    // Ex: 111 - Hardware, 222 - Software, 333 - Subscription
    @PrimaryColumn()
    code: number;

    @OneToMany(type => Asset, asset => asset.id)
    assets: Asset[];

    @Column()
    assetTypeDescription: string;

}
