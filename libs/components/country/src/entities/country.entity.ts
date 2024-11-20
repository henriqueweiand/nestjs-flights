import { Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";
import { Airport } from "@components/airport/entities/airport.entity";

@ObjectType()
@Entity()
export class Country {
    @Field()
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Field({ nullable: true })
    @Column({ length: 255, nullable: true })
    capital?: string;

    @Field({ nullable: true })
    @Column({ length: 12, name: 'currency_code', nullable: true })
    currencyCode?: string;

    @Field({ nullable: true })
    @Column({ length: 32 })
    continent?: string;

    @Field({ nullable: true })
    @Column({ length: 255, name: 'country_name' })
    countryName?: string;

    @Field({ nullable: true })
    @Column({ length: 255, name: 'currency_name', nullable: true })
    currencyName?: string;

    @Field({ nullable: true })
    @Column({ length: 32, name: 'phone_prefix', nullable: true })
    phonePrefix?: string;

    @Field({ nullable: true })
    @Column({ length: 12, name: 'external_id' })
    externalId: string;

    @Field({ nullable: true })
    @Column({ length: 12, name: 'country_iso2' })
    countryIso2: string;

    @Field({ nullable: true })
    @Column({ length: 12, name: 'country_iso3' })
    countryIso3: string;

    @Field(() => [Airport])
    @OneToMany(() => Airport, airport => airport.country, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    airports: Airport[];

    @Field(() => DataProviderEnum)
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
