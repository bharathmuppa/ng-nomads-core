# SCAFFOLDING PROJECT

## First Project

We started with angular project setup and without state.
Over the days once the app gets into certain stage then we started thinking about state(
ngrx) and then integrated state after first release,
by then Couple of entity interaction is built in and app become complex enough to
integrate the state and that become an activity on its own.

## Second Project

As Few of the projects started as POC, It's a common conception that we don't need state
as it makes things complex.
Then POC's got accepted and Project is based on the that POC setup coz of project
deadlines, we have to deliver, deliver(Not so uncommon).So we ended with same scenario as
before.
Which took extra sprints to just introduce state without breaking the existing setup.

## Learnings

As we navigate through different projects and requirements, we understood few points,
which are

1. Almost all poc that turns into project, will take that initial setup as base for
   project
2. Introducing state after stable project setup does require time, money and testing
   capabilities.
3. All Projects, does follow or partially follow DDD patterns.
4. Services are API based.
5. Every Project should comply with ng-nomads Standards in static code analysis, Vulnerability
   scan, Test Coverage and build time.

# Solutions

1. Tailor made Scaffolding project to kick start POC or Projects.
2. Schematic to create entities with list page, details page, auditing functionality
3. Introducing State. Both App and entity/feature specific ones
