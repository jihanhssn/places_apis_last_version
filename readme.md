# LemonPlaces

## Getting started

* run `npm i`
* run `npm i -g sequelize nodemon`.
* run `cp .env-example configs.env`.
* Edit `.env` file with your real env variables.

```bash
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```

## migrate and seed db tables
```bash
 NODE_ENV=local sequelize db:migrate && NODE_ENV=local sequelize db:seed:all
```
## Start the app
```bash
 NODE_ENV=local supervisor bin/lemon-place
```

### Models and Migrations Generation 
```
sequelize model:generate --name user --attributes full_name:string 
```

this will generate a migration to the migrations path and model will be added in the specified path