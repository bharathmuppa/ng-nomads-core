# Node CLI project to integrate project creation and integration 


## Running Local

- Run `npm link`
- then run `starter --name=demo-app` to create a scaffodling project
- then run `entity --name=someentity` in app/src folder, to create an entity with details,list, audit and state management.

## Publish to repository


## Usage after publish (For consumers)

### With global installations
- run `npm i -g ng-nomads`
- then run `starter --projectName=demo-app` to create a scaffodling project
- then run `entity --name=someentity` in app/src folder, to create an entity with details,list, audit and state management.


### Without global installations

- then run `npx ng-nomads starter --projectName=demo-app` to create a scaffodling project
- then run `npx ng-nomads entity --name=someentity` in `app/src folder`, to create an entity with details,list, audit and state management.