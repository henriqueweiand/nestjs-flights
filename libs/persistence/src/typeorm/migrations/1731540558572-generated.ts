import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1731540558572 implements MigrationInterface {
    name = 'Generated1731540558572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "airport_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "latitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "gmt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "country_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "country_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "gmt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "latitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "airport_name" SET NOT NULL`);
    }

}
