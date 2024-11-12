import { Column, CreateDateColumn, DeepPartial, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";

@Entity()
export class Country {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ length: 255 })
    capital: string;

    @Column({ length: 12, name: 'currency_code' })
    currencyCode: string;

    @Column({ length: 12 })
    continent: string;

    @Column({ length: 255, name: 'country_name' })
    countryName: string;

    @Column({ length: 255, name: 'currency_name' })
    currencyName: string;

    @Column({ length: 12, name: 'phone_prefix' })
    phonePrefix: string;

    @Column({ length: 12, name: 'external_id' })
    externalId: string;

    @Column({
        type: 'enum',
        enum: DataProviderEnum,
        nullable: false,
    })
    provider: DataProviderEnum;

    @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
    createdDate?: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
    modifiedDate?: Date;

    constructor(entity: DeepPartial<Country>) {
        Object.assign(this, entity);
    }
}
