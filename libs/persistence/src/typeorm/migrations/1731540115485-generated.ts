import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1731540115485 implements MigrationInterface {
    name = 'Generated1731540115485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."airport_provider_enum" AS ENUM('AVIATION_STACK')`);
        await queryRunner.query(`CREATE TABLE "airport" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "airport_name" character varying(255) NOT NULL, "iata_code" character varying(32) NOT NULL, "icao_code" character varying(32) NOT NULL, "latitude" character varying(32) NOT NULL, "longitude" character varying(32) NOT NULL, "timezone" character varying(32), "gmt" character varying(12) NOT NULL, "phone_number" character varying(32), "external_id" character varying(12) NOT NULL, "country_name" character varying(255) NOT NULL, "country_iso2" character varying(12) NOT NULL, "provider" "public"."airport_provider_enum" NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."country_provider_enum" AS ENUM('AVIATION_STACK')`);
        await queryRunner.query(`CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "capital" character varying(255), "currency_code" character varying(12), "continent" character varying(32) NOT NULL, "country_name" character varying(255) NOT NULL, "currency_name" character varying(255), "phone_prefix" character varying(32), "external_id" character varying(12) NOT NULL, "country_iso2" character varying(12) NOT NULL, "country_iso3" character varying(12) NOT NULL, "provider" "public"."country_provider_enum" NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TYPE "public"."country_provider_enum"`);
        await queryRunner.query(`DROP TABLE "airport"`);
        await queryRunner.query(`DROP TYPE "public"."airport_provider_enum"`);
    }

}
