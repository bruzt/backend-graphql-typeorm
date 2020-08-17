import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableUsersProjects1597441796796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'users_projects',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: "'working'"
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                {
                    name: 'projectId',
                    type: 'int',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true
                },
            ]
        }));

        await queryRunner.createForeignKeys('users_projects', [
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['projectId'],
                referencedTableName: 'projects',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('users_projects');
    }
}
