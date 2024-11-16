import { Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";
import { Country } from "@components/country/entities/country.entity";
import { Departure } from "@components/flight/entities/departure.entity";
import { Arrival } from "@components/flight/entities/arrival.entity";

@Entity()
export class Airport {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ length: 255, name: 'airport_name', nullable: true })
    name?: string;

    @Column({ length: 32, name: 'iata_code' })
    aitaCode: string;

    @Column({ length: 32, name: 'icao_code' })
    acaoCode: string;

    @Column({ length: 32, name: 'latitude', nullable: true })
    latitude?: string;

    @Column({ length: 32, name: 'longitude' })
    longitude: string;

    @Column({ length: 32, name: 'timezone', nullable: true })
    timezone?: string;

    @Column({ length: 12, name: 'gmt', nullable: true })
    gmt?: string;

    @Column({ length: 32, name: 'phone_number', nullable: true })
    phoneNumber?: string;

    @Column({ length: 12, name: 'external_id' })
    externalId: string;

    @ManyToOne(() => Country, country => country.airports, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'country_id', })
    country: Country;

    // Necessery fields to be able to search by country name later
    @Column({ length: 255, name: 'country_name', nullable: true })
    countryName?: string;

    @OneToMany(() => Departure, departure => departure.airport)
    departures: Departure[];

    @OneToMany(() => Arrival, arrival => arrival.airport)
    arrivals: Arrival[];

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

    constructor(entity: DeepPartial<Airport>) {
        Object.assign(this, entity);
    }
}
