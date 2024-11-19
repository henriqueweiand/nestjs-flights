import { Column, CreateDateColumn, DeepPartial, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";
import { Airport } from "@components/airport/entities/airport.entity";

import { Flight } from "./flight.entity";

// TODO: Review all nullable fields after having data
@Entity()
export class Departure {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @OneToOne(() => Flight, flight => flight.departure)
    flight: Flight;

    @Column({ length: 32, name: 'iata', nullable: true }) // TODO: Change to enum
    iata: string;

    @Column({ length: 32, name: 'icao', nullable: true })
    icao: string;

    @Column({ length: 32, name: 'terminal', nullable: true })
    terminal: string;

    @Column({ length: 32, name: 'gate', nullable: true })
    gate: string;

    @Column({ length: 32, name: 'delay', nullable: true })
    delay: string;

    @Column({ length: 32, name: 'baggage', nullable: true })
    baggage: string;

    @Column({ type: 'timestamp', name: 'scheduled', nullable: true })
    scheduled?: Date;

    @Column({ type: 'timestamp', name: 'estimated', nullable: true })
    estimated?: Date;

    @Column({ type: 'timestamp', name: 'actual', nullable: true })
    actual?: Date;

    @Column({ type: 'timestamp', name: 'estimated_runway', nullable: true })
    estimatedRunway?: Date;

    @Column({ type: 'timestamp', name: 'actual_runway', nullable: true })
    actualRunway?: Date;

    @Column({ length: 255, name: 'airport_name', nullable: true })
    airportName?: string;

    @ManyToOne(() => Airport, airport => airport.departures)
    airport: Airport;

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

    constructor(entity: DeepPartial<Departure>) {
        Object.assign(this, entity);
    }
}
