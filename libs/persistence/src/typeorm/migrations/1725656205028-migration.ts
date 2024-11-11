import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725656205028 implements MigrationInterface {
    name = 'Migration1725656205028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
