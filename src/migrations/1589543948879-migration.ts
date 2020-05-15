import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1589543948879 implements MigrationInterface {
    name = 'migration1589543948879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06"`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_3e40c7eb24da0c2814f7fc15c76"`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ALTER COLUMN "topicId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "roomId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_3e40c7eb24da0c2814f7fc15c76" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_3e40c7eb24da0c2814f7fc15c76"`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06"`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "roomId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ALTER COLUMN "topicId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_3e40c7eb24da0c2814f7fc15c76" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
