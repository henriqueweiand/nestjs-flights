import { Column, CreateDateColumn, DeepPartial, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";

@Entity()
export class Country {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ length: 255, nullable: true })
    capital?: string;

    @Column({ length: 12, name: 'currency_code', nullable: true })
    currencyCode?: string;

    @Column({ length: 32 })
    continent: string;

    @Column({ length: 255, name: 'country_name' })
    countryName: string;

    @Column({ length: 255, name: 'currency_name', nullable: true })
    currencyName?: string;

    @Column({ length: 32, name: 'phone_prefix', nullable: true })
    phonePrefix?: string;

    @Column({ length: 12, name: 'external_id' })
    externalId: string;

    @Column({ length: 12, name: 'country_iso2' })
    countryIso2: string;

    @Column({ length: 12, name: 'country_iso3' })
    countryIso3: string;

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
