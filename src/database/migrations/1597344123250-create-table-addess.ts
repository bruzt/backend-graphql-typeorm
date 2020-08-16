import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableAddess1597429812912 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'address',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },

                {
                    name: 'street',
                    type: 'varchar',
                    isNullable: false,
                },

                {
                    name: 'number',
                    type: 'varchar',
                    isNullable: true,
                },

                {
                    name: 'neighborhood',
                    type: 'varchar',
                    isNullable: false,
                },

                {
                    name: 'city',
                    type: 'varchar',
                    isNullable: false,
                },

                {
                    name: 'uf',
                    type: 'varchar',
                    isNullable: false,
                },

                {
                    name: 'zipcode',
                    type: 'varchar',
                    isNullable: false,
                },

                {
                    name: 'userId',
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
            ]
        }));

        await queryRunner.createForeignKey('address', new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('address');
    }
}
