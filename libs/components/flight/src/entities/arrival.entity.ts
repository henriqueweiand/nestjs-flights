import { Column, CreateDateColumn, DeepPartial, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";
import { Airport } from "@components/airport/entities/airport.entity";

import { Flight } from "./flight.entity";
import { Field, ObjectType } from "@nestjs/graphql";

// TODO: Review all nullable fields after having data
@ObjectType()
@Entity()
export class Arrival {
    @Field()
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Field(() => Flight)
    @OneToOne(() => Flight, flight => flight.departure)
    flight: Flight;

    @Field({ nullable: true })
    @Column({ length: 32, name: 'iata', nullable: true }) // TODO: Change to enum
    iata?: string;

    @Field({ nullable: true })
    @Column({ length: 32, name: 'icao', nullable: true })
    icao?: string;

    @Field({ nullable: true })
    @Column({ length: 32, name: 'terminal', nullable: true })
    terminal?: string;

    @Field({ nullable: true })
    @Column({ length: 32, name: 'gate', nullable: true })
    gate?: string;

    @Field({ nullable: true })
    @Column({ length: 32, name: 'delay', nullable: true })
    delay?: string;

    @Field({ nullable: true })
    @Column({ length: 32, name: 'baggage', nullable: true })
    baggage?: string;

    @Field({ nullable: true })
    @Column({ type: 'timestamp', name: 'scheduled', nullable: true })
    scheduled?: Date;

    @Field({ nullable: true })
    @Column({ type: 'timestamp', name: 'estimated', nullable: true })
    estimated?: Date;

    @Field({ nullable: true })
    @Column({ type: 'timestamp', name: 'actual', nullable: true })
    actual?: Date;

    @Field({ nullable: true })
    @Column({ type: 'timestamp', name: 'estimated_runway', nullable: true })
    estimatedRunway?: Date;

    @Field({ nullable: true })
    @Column({ type: 'timestamp', name: 'actual_runway', nullable: true })
    actualRunway?: Date;

    @Field({ nullable: true })
    @Column({ length: 255, name: 'airport_name', nullable: true })
    airportName?: string;

    @Field(() => Airport)
    @ManyToOne(() => Airport, airport => airport.departures)
    airport: Airport;

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

    constructor(entity: DeepPartial<Arrival>) {
        Object.assign(this, entity);
    }
}
