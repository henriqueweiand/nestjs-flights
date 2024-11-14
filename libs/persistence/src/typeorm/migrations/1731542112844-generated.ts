import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1731542112844 implements MigrationInterface {
    name = 'Generated1731542112844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" ADD "country_id" character varying(64)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "country_id"`);
    }

}
