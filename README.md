# pling-challenge

## Description

The task was to create a simple full stack application where one can
create and list patients of a clinic.


## Technology stack
This repo contains the API that will be consumed by a client implemented using
React and Next.js, and you can check it out on [Client Repo](https://github.com/clarammdantas/pling-challenge-client). We use Node.js
with Typescript and Express to write the API and Mongoose library to work with
our database in MongoDB using the Atlas cloud service. The deploy was done in
Heroku, and is accessible thorough this URL https://polar-hollows-71390.herokuapp.com/.

Aside that, we are using ESLint as our linter. It should be good to use Prettier
as well to reinforce code style. Also, we use Nodemon to help in the development
and keep watching for changes in the source code so it can run the project
again, excluding the need for us to manually do this.

## Project structure

### Project tree

### Class diagram

## API Documentation

Ideally, I would have used OpenAPI specification but, to be faster, I'm going
to describe here all the available endpoints and give an example for each of
them. The base URL is https://polar-hollows-71390.herokuapp.com . You can run
tests in Postman.

### Create a paient

POST
/patient/create

```json
{
    "name": "Amelia",
    "address": {
        "street": "Rua Aderaldo Monteiro",
        "district": "Catole",
        "zipCode": "58429000",
        "number": "212",
        "complement": "Proximo a padaria santiago"
    },
    "age": "32",
    "cpf": "007.819.118-98",
    "sex": "1",
    "profession": "Engenheira de Software",
    "cellNumber": "83999867387"
}
```

### Add a record to a patient

PATCH
/patient/addRecord/:patienId

```json
{
    "annotations": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    "prescription": "Sushi e agua"
}
```

### List patients

We implemented the listing with pagination, so you neeed to provide a page in
the query.

GET
/patient/list/:page

### Get patient by CPF

GET
/patient/getByCPF/:cpf

The CPF can be given in any form as long as it has the correct number. We use
a regex in the backend to standardize the CPF and thus do the query correctly.

### Update patient

PATCH
/patient/edit/:patientId

```json
{
    "name": "Joana Machado",
    "age": 20
}
```

### Delete patient

DELETE
/patient/delete/:patientId

### Get total number of pages

GET
/patient/getTotalPages

## Running the project

You can run the linters by typing:
`npm run lint`

To run the application using Nodemon:
`npx nodemon`
