# care-protect-ui

>

## Summary

Application is a User Interface in Care Protect Project.

## Status

![](https://img.shields.io/badge/Status-unstable-orange)

The application is at a very early stage of development. The prototype and the first release have not been published yet. We insist to have this in mind if you would like to run it. The current version is unstable and often updated.

## Stack

- ReactJs
- TypeScript
- yarn
- Material-UI

## How to run?

### Prep / deps

1. Install and set up yarn package manager. [Official docs](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
2. ~~Download and set up a [Middleware]()~~ Middleware is not available yet, but you can run Client App Statically with prepared by us dummy data.

### Installation

1. Clone this repo

   `$ git clone git@github.com:AppertaFoundation/care-protect-ui.git`

2. Go to the project directory

   `$ cd care-protect-ui`

3. Until the first release, please make sure that you are on the develop branch.

   `$ git checkout develop`

4. Install dependencies

   `$ yarn install`

### Build

1 .You have to options create static build(without middleware) ~~or with it.~~

- ~~To create a standard build.~~

  ~~`$ yarn build`~~

- Static one

  - Add in to file .env.production (root directory)

    `REACT_APP_STATIC=true`

  - Run in consol:
    `$ yarn build`
  - Add in to file .env.production (root directory)

2. Install globally a server

   `$ yarn global add serve`

3. The build folder is ready to be deployed. You may serve it with a static server:

   `$ serve -s build`

And your app is served [localhost:5000](localhost:5000)

### Run locally in development mode

- ~~Run with middleware.~~

  ~~`$ yarn start`~~

- Static one

  - Add in to file .env.local (root directory)

    `REACT_APP_STATIC=true`

  - Run in consol:
    `$ yarn build`
  - Add in to file .env.production (root directory)

And you app is running on [localhost:3000](localhost:3000)
