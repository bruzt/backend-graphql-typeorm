import db from '../database/connection';

interface IEntitiesList {
    name: string;
    tableName: string;
}

async function getEntities() {
    const entities: IEntitiesList[] = [];
    (await db).entityMetadatas.forEach(
        x => entities.push({ name: x.name, tableName: x.tableName })
    );
    return entities;
}

async function cleanAll(entities: IEntitiesList[]) {

    try {

        for (const entity of entities) {

            await (await db).query(`TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE ;`);
        }

    } catch (error) {
        throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
}

export default async function clearDBTables() {

    const entities = await getEntities();
    await cleanAll(entities);
}