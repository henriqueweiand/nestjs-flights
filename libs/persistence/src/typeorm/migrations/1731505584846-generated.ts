import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1731505584846 implements MigrationInterface {
    name = 'Generated1731505584846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "capital" character varying(255), "currency_code" character varying(12), "continent" character varying(32) NOT NULL, "country_name" character varying(255) NOT NULL, "currency_name" character varying(255), "phone_prefix" character varying(32), "external_id" character varying(12) NOT NULL, "provider" "public"."country_provider_enum" NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
