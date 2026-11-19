import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1794995491818 implements MigrationInterface {
    name = 'InitDB1794995491818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` varchar(500) NULL, \`is_system\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`role_id\` varchar(36) NULL, \`email\` varchar(255) NOT NULL, \`password_hash\` varchar(255) NULL, \`provider\` varchar(50) NOT NULL DEFAULT 'local', \`provider_id\` varchar(255) NULL, \`full_name\` varchar(255) NULL, \`avatar_url\` varchar(1000) NULL, \`phone_number\` varchar(20) NULL, \`company_name\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`metadata\` json NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(500) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions\` (\`role_id\` varchar(36) NOT NULL, \`permission_id\` varchar(36) NOT NULL, INDEX \`IDX_17022daf3f885f7d35423e9971\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`audit_logs\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NULL, \`action\` varchar(100) NOT NULL, \`target_id\` varchar(36) NULL, \`description\` text NULL, \`ip_address\` varchar(45) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_bd2726fd31b35443f2245b93ba\` (\`user_id\`), INDEX \`IDX_cee5459245f652b75eb2759b4c\` (\`action\`), INDEX \`IDX_2cd10fda8276bb995288acfbfb\` (\`created_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_sessions\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, \`refresh_token_hash\` char(64) NOT NULL, \`user_agent\` varchar(500) NULL, \`ip_address\` varchar(45) NULL, \`expires_at\` datetime NOT NULL, \`revoked_at\` datetime NULL, \`last_used_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_dbc81ff542b1b3366bae195f2a\` (\`expires_at\`), INDEX \`idx_user_sessions_user_expires\` (\`user_id\`, \`expires_at\`), UNIQUE INDEX \`IDX_cc132fa5f7a96610010e293e52\` (\`refresh_token_hash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_178199805b901ccd220ab7740ec\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_17022daf3f885f7d35423e9971e\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`audit_logs\` ADD CONSTRAINT \`FK_bd2726fd31b35443f2245b93ba0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` ADD CONSTRAINT \`FK_e9658e959c490b0a634dfc54783\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_sessions\` DROP FOREIGN KEY \`FK_e9658e959c490b0a634dfc54783\``);
        await queryRunner.query(`ALTER TABLE \`audit_logs\` DROP FOREIGN KEY \`FK_bd2726fd31b35443f2245b93ba0\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_17022daf3f885f7d35423e9971e\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_178199805b901ccd220ab7740ec\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`DROP INDEX \`IDX_cc132fa5f7a96610010e293e52\` ON \`user_sessions\``);
        await queryRunner.query(`DROP INDEX \`idx_user_sessions_user_expires\` ON \`user_sessions\``);
        await queryRunner.query(`DROP INDEX \`IDX_dbc81ff542b1b3366bae195f2a\` ON \`user_sessions\``);
        await queryRunner.query(`DROP TABLE \`user_sessions\``);
        await queryRunner.query(`DROP INDEX \`IDX_2cd10fda8276bb995288acfbfb\` ON \`audit_logs\``);
        await queryRunner.query(`DROP INDEX \`IDX_cee5459245f652b75eb2759b4c\` ON \`audit_logs\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd2726fd31b35443f2245b93ba\` ON \`audit_logs\``);
        await queryRunner.query(`DROP TABLE \`audit_logs\``);
        await queryRunner.query(`DROP INDEX \`IDX_17022daf3f885f7d35423e9971\` ON \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
