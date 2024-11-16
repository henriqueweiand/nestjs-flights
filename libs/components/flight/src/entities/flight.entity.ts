import { Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";

import { Departure } from "./departure.entity";
import { Arrival } from "./arrival.entity";
import { aircraft, airline } from "../interfaces/flight.interface";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @OneToOne(() => Departure, departure => departure.flight, { nullable: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'departure_id' })
    departure: Departure;

    @OneToOne(() => Arrival, arrival => arrival.flight, { nullable: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'arrival_id' })
    arrival: Arrival;

    @Column({ type: 'date', name: 'date' })
    date: Date;

    @Column({ length: 32, name: 'status' }) // TODO: Change to enum
    status: string;

    @Column({ length: 32, name: 'number' })
    number: string;

    @Column({ length: 32, name: 'iata' })
    iata: string;

    @Column({ length: 32, name: 'icao' })
    icao: string;

    @Column({
        type: 'enum',
        enum: DataProviderEnum,
        nullable: false,
    })
    provider: DataProviderEnum;

    @Column({ type: 'json', nullable: true })
    airline: airline

    @Column({ type: 'json', nullable: true })
    aircraft: aircraft;

    @Column({ length: 12, name: 'external_id', nullable: true })
    externalId?: string;

    @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
    createdDate?: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
    modifiedDate?: Date;

    constructor(entity: DeepPartial<Flight>) {
        Object.assign(this, entity);
    }
}
