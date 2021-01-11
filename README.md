# Care Protect (UI)

[TOC]

<!---  See https://shields.io. You might want to include dependencies, project status and licence info here --->

https://github.com/AppertaFoundation/care-protect-ui

![GitHub repo size](https://img.shields.io/github/repo-size/AppertaFoundation/care-protect-ui) ![GitHub contributors](https://img.shields.io/github/contributors/AppertaFoundation/care-protect-ui) ![GitHub stars](https://img.shields.io/github/stars/AppertaFoundation/care-protect-ui?style=social) ![GitHub forks](https://img.shields.io/github/forks/AppertaFoundation/care-protect-ui?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/appertauk?style=social) ![Twitter Follow](https://img.shields.io/twitter/follow/opusvl?style=social)

Care Protect, it is a web/mobile application which allows manage patient conditions, infection control and make any observation on patients in care homes. Also helps to efficiently plan further patient care as a request on current main neededs of care homes stafs.
In this repository you can find user interface part.

**Attention! The application is at an early stage of development, even before the first realse. We kindly ask for your understanding if something "doesn't work" :wink:. New changes and updates appear every day.**

## Prerequisites

Before you begin, ensure you have met the following requirements:

<!--- These are just example requirements. Add, duplicate or remove as required --->

- You have installed the latest version of yarn package manager. [Official docs](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- You have a ~~download and set up a [Middleware]()~~ Middleware is not available yet, but you can run Client App Statically with prepared by us dummy data.

## Installation

1. Clone this repo

   `$ git clone git@github.com:AppertaFoundation/care-protect-ui.git`

2. Go to the project directory

   `$ cd care-protect-ui`

3. Until the first release, please make sure that you are on the develop branch.

   `$ git checkout develop`

4. Install dependencies

   `$ yarn install`

## Build

1 .You have to options create static build(without middleware) ~~or with it.~~

- ~~To create a standard build.~~

  ~~`$ yarn build`~~

- Static one

  - Add in to file .env.production (root directory)

    `REACT_APP_STATIC=true`

  - Run in consol:

    `$ yarn build`

2. Install globally a server

   `$ yarn global add serve`

3. The build folder is ready to be deployed. You may serve it with a static server:

   `$ serve -s build`

And your app is served [localhost:5000](localhost:5000)

## Run locally in development mode

- ~~Run with middleware.~~

  ~~`$ yarn start`~~

- Static one

  - Add in to file .env.local (root directory) `REACT_APP_STATIC=true`
  - And `$ yarn start`

## Understand the structure of the Care Protect UI app

### Technologies

Used Technologies

- [React](https://reactjs.org/)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Yarn](https://yarnpkg.com/)
- [Material-UI](https://material-ui.com/)
- [Styled Components](https://github.com/styled-components/styled-components)
- [JestJs](https://jestjs.io/)

Application created with [create-react-app](https://github.com/facebook/create-react-app) and template[React Boilerplate CRA](https://github.com/react-boilerplate/react-boilerplate-cra-template)

**More detailed informations:**

- [Application structure](https://github.com/AppertaFoundation/care-protect-ui/tree/main/development-docs/README.md)
- [Architecture](https://github.com/AppertaFoundation/care-protect-ui/tree/main/development-docs/README.md)
- [Theme, Styling](https://github.com/AppertaFoundation/care-protect-ui/tree/main/development-docs/README.md)
- [Using Static data (mocks)](https://github.com/AppertaFoundation/care-protect-ui/tree/main/development-docs/README.md)
- [Testing](https://github.com/AppertaFoundation/care-protect-ui/tree/main/development-docs/README.md)

## Contributing to Care Protect UI

To contribute to Care-Protect UI, follow these steps:

`nedd to be specyfied`

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contributors

[![](https://github.com/adabedi.png?size=50)](https://github.com/adabedi) [![](https://github.com/david-jobling.png?size=50)](https://github.com/david-jobling)

## Contact

## License

This project uses the following license: [License](https://github.com/AppertaFoundation/care-protect-ui/blob/main/LICENSE>).
