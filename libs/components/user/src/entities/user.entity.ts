import { Field } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeepPartial, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FederatedIdentity } from "./federated-identity.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Field()
    name: string;

    @Field()
    @Column({ name: 'email', unique: true })
    email: string;

    @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
    createdDate?: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
    modifiedDate?: Date;

    @Field(() => [FederatedIdentity])
    @OneToMany(
        () => FederatedIdentity,
        federatedIdentity => federatedIdentity.user,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, cascade: true }
    )
    federatedIdentity: FederatedIdentity[]

    constructor(entity: DeepPartial<User>) {
        Object.assign(this, entity);
    }
}
