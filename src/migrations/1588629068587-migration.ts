import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1588629068587 implements MigrationInterface {
    name = 'migration1588629068587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "vote" integer NOT NULL, "name" character varying NOT NULL, "topicId" uuid, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "topic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "roomId" uuid, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_3e40c7eb24da0c2814f7fc15c76" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_3e40c7eb24da0c2814f7fc15c76"`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06"`, undefined);
        await queryRunner.query(`DROP TABLE "room"`, undefined);
        await queryRunner.query(`DROP TABLE "topic"`, undefined);
        await queryRunner.query(`DROP TABLE "vote"`, undefined);
    }

}
