import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class creatAdms1604778835993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'adms',
            columns: [ 
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'senha',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'cnpj',
                    type: 'varchar',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('adms');
    }

}
