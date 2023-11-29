console.log(`
#  Node CLI project to integrate project creation and integration 


## Running Local

- Run `npm link`
- then run `starter --name=demo-app` to create a scaffodling project
- then run `entity --name=someentity` in app/src folder, to create an entity with details,list, audit and state management.

## Publish to repository


## Usage after publish (For consumers)

### With global installations
- run `npm i @ng-nomads -g`
- then run `starter --name=demo-app` to create a scaffodling project
- then run `entity --name=someentity` in app/src folder, to create an entity with details,list, audit and state management.


### Without global installations

- then run `npx @ng-nomads-angular/ng-nomads starter --name=demo-app` to create a scaffodling project
- then run `npx @ng-nomads-angular/ng-nomads entity --name=someentity` in app/src folder, to create an entity with details,list, audit and state management.
`)