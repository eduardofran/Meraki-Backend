# Meraki-Backend
# Project Name

## Introduction

Nuestro proyecto se llama MERAKI, Es una pagina web con la que puedes buscar viajes, aventuras experiencias a la vez que ayudas a las personas, esas mismas personas te daran comida y alojamiento .

## User Stories 
### Sin Token 
 
* El usuario puede acceder al home 
* El usuario puede filtrar 
* El usuario puede ver eventos especificos 
* El usuario puede ver perfiles de usuarios 
* El usuario puede ver una lista de eventos 
* El usuario puede registrarse 
* El usuario puede iniciar sesion

### Con Token
* El usuario puede editar su cuenta 
* El usuario puede eliminar su cuenta
* El usuario puede añadir a favoritos los eventos 
* El usuario puede mandar una solicitud de contacto a un creador de evento  
* El usuario puede crear eventos 
* El usuario puede marcar como completados eventos especificos.
* El usuario puede valorar eventos 
* El usuario puede editar eventos creados
* El usuario puede borrar eventos creados
* El usuario puede ver su lista de favoritos


## MODELS

### USER MODEL

| KEY       | TYPE     | REQUIRED | REFERENCE | VALIDATIONS          | DEFAULT|
|-----------|----------|----------|-----------|----------------------|--------| 
| name      | String   | true     |           |                      |        |
| email     | String   | true     |           | regex(email-unique)  |        |
| password  | String   | true     |           | min(6)               |        |
| country   | String   | true     |           |                      |        |
| birthday  | Date     | true     |           |                      |        |
| photoURL  | String   | false    |           |                      |  Url   |
| bio       | String   | false    |           | Min: 50 max: 160     |        |
| languages | [String] | false    |           |                      |        |
| createdAt | Date     | false    |           |                      |Date.Now|   
| skills    | [String] | false    |           |                      |        |
| favEvents |[ObjectId]| false    |  events   |                      |        |


### EVENT MODEL

| KEY            | TYPE     | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT |
|----------------|----------|-----------|----------|-----------------------|
| title          | String   | -         | true     | -                     |
| description    | String   | -         | true     | Max 1000              |
| country        | String   | -         | true     | -                     |
| city           | String   | -         | true     | -                     |
| street         | String   | -         | true     | -                     |
| strNum         | String   | -         | true     | -                     |
| skillsRequired | [String] | -         | false    | -                     |
| offers         | [String] | -         | true     | -                     |
| workHours      | Number   | -         | true     | -                     |
| available      | [String] | -         | true     | -                     |
| minStay        | String   | -         | true     | -                     |
| mainPhoto      | String   | -         | true     | -                     |
| gallery        | [String] | -         | false    | -                     |
| createdAt      | Date     | -         | false    | Date.Now              |
| creator        | ObjectId | user      | true     | -                     |
| reviews        |[ObjectId]| reviews   | true     |                       |

### INTERACTION USERS

| KEY            | TYPE     | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT |
|----------------|----------|-----------|----------|-----------------------|
| completed      | booleans | false     | false    | -                     |        
| user           | ObjectId | user      | false    | -                     | 
| event          | ObjectId | event     | false    | -                     | 



### REVIEWS MODEL
| KEY      | TYPE     | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT       |
| -------- | -------- | --------- | -------- | ----------------------------|
| comment  | String   | -         | true     | -                           |
| user     | ObjectId | user      | true     | current_user                |
| createdAt| Date     | -         | false    | Date.Now                    |
| stars    | Numbers  | -         | false    | -                           |

