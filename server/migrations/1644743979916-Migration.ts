import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1644743979916 implements MigrationInterface {
    name = "Migration1644743979916";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`program\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`exercise\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`programId\` int NOT NULL, \`sets\` int NULL, \`duration\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `ALTER TABLE \`program\` ADD CONSTRAINT \`FK_d593ec621c4a47fd51ab7f9a23d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`exercise\` ADD CONSTRAINT \`FK_d6ee1314e6186c071e925af6c34\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise\` DROP FOREIGN KEY \`FK_d6ee1314e6186c071e925af6c34\``);
        await queryRunner.query(`ALTER TABLE \`program\` DROP FOREIGN KEY \`FK_d593ec621c4a47fd51ab7f9a23d\``);
        await queryRunner.query(`DROP TABLE \`exercise\``);
        await queryRunner.query(`DROP TABLE \`program\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
