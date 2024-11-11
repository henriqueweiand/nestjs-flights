import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725814715203 implements MigrationInterface {
    name = 'Migration1725814715203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "externalId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD "url" character varying`);
        await queryRunner.query(`ALTER TABLE "event" ADD "locale" character varying`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "locale"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "externalId"`);
    }

}
