import { Field } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { SocialProviderEnum } from "../enums/federated-identity.enum";
import { User } from "./user.entity";

@Entity()
export class FederatedIdentity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Field(() => SocialProviderEnum)
    @Column({
        type: 'enum',
        enum: SocialProviderEnum,
        nullable: false,
    })
    provider: SocialProviderEnum;

    @Column({ type: 'json', nullable: false })
    data: any;

    @ManyToOne(() => User, user => user.federatedIdentity, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
    createdDate?: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
    modifiedDate?: Date;

    constructor(entity: DeepPartial<FederatedIdentity>) {
        Object.assign(this, entity);
    }
}
