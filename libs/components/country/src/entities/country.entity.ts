import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Country {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column()
    name: string;

    constructor(entity: Partial<Country>) {
        Object.assign(this, entity);
    }
}
