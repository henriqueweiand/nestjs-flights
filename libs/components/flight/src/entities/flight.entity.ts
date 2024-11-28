import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";

import { aircraft, airline } from "../interfaces/flight.interface";
import { Arrival } from "./arrival.entity";
import { Departure } from "./departure.entity";

@ObjectType()
@Entity()
export class Flight {
    @Field()
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Field(() => Departure, { nullable: true })
    @OneToOne(() => Departure, departure => departure.flight, { eager: true, nullable: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'departure_id' })
    departure?: Departure;

    @Field(() => Arrival, { nullable: true })
    @OneToOne(() => Arrival, arrival => arrival.flight, { eager: true, nullable: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'arrival_id' })
    arrival?: Arrival;

    @Field(() => String)
    @Column({ type: 'date', name: 'date' })
    date?: Date;

    @Field()
    @Column({ length: 32, name: 'status' }) // TODO: Change to enum
    status: string;

    @Field()
    @Column({ length: 32, name: 'number' })
    number: string;

    @Field()
    @Column({ length: 32, name: 'iata' })
    iata: string;

    @Field()
    @Column({ length: 32, name: 'icao' })
    icao: string;

    @Field(() => DataProviderEnum)
    @Column({
        type: 'enum',
        enum: DataProviderEnum,
        nullable: false,
    })
    provider: DataProviderEnum;

    // @Field({ nullable: true })
    @Column({ type: 'json', nullable: true })
    airline?: airline

    // @Field({ nullable: true })
    @Column({ type: 'json', nullable: true })
    aircraft?: aircraft;

    @Field({ nullable: true })
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
