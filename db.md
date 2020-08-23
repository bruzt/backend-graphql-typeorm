
## Posgres Tests
```
sudo docker run --rm -d \
    --name postgres-typeorm-tests \
    -e POSTGRES_USER=testDB \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=tests \
    -p 5433:5432 \
    postgres:12.3
```

```
postgres://testDB:123@localhost:5433/tests
```

```
sudo docker exec -ti postgres-typeorm-tests psql -d tests -U devDB -W
```

## Posgres Dev
```
sudo docker run --rm -d \
    --name postgres-typeorm-dev \
    -e POSTGRES_USER=devDB \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=dev \
    -p 5432:5432 \
    postgres:12.3
```

```
postgres://devDB:123@localhost:5432/dev
```

```
sudo docker exec -ti postgres-typeorm-dev psql -d dev -U devDB -W
```

### TypeORM
```
npx typeorm migration:create -n migration-name
```
