---
title: care-protect-ui readme
---

![](https://codimd.xyron.io/uploads/upload_1edf920d3be898ca75de75dbb3001ba5.png)


<!---  See https://shields.io. You might want to include dependencies, project status and licence info here --->

![GitHub repo size](https://img.shields.io/github/repo-size/AppertaFoundation/care-protect-ui) ![GitHub contributors](https://img.shields.io/github/contributors/AppertaFoundation/care-protect-ui) ![GitHub stars](https://img.shields.io/github/stars/AppertaFoundation/care-protect-ui?style=social) ![GitHub forks](https://img.shields.io/github/forks/AppertaFoundation/care-protect-ui?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/appertauk?style=social) ![Twitter Follow](https://img.shields.io/twitter/follow/opusvl?style=social)

## Introduction

Care Protect is a web/mobile application which provides dashboards and assessment tools to detect and manage acute deterioration in residents and patients in care settings; it facilitates a safe shift in care to the care setting, recording both clinical and non clinical assessments using the ISBAR communication tool. Additionally, 

- Carer concern (DENWIS)
- NEWS2 assessments and monitoring
- SEPSIS screening

Additionally, Care Protect provides COVID19 management tools; 

- COVID19 assessment
- Detailed COVID19 status indicators 
- COVID19 test status 
- COVID19 isolation status

This repository contains the front end user interface for the Care Protect product. 

**Attention! The application is at an early stage of development. We kindly ask for your understanding if something "doesn't work" but please raise any bugs or issues [here](https://github.com/AppertaFoundation/care-protect-ui/issues) . New changes and updates appear every day.**

## Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

<!--- These are just example requirements. Add, duplicate or remove as required --->

- You have installed the latest version of yarn package manager. [Official docs](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- ~~You have downloaded and set up a [Middleware]()~~ The middleware is currently being finalised, but you can run the Care Protect UI application statically using the dummy data provided.

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

2. Install globally a server

   `$ yarn global add serve`

3. The build folder is ready to be deployed. You may serve it with a static server:

   `$ serve -s build`

And your app is served [localhost:5000](localhost:5000)

### Development Mode (Recommended)

- ~~Run with middleware.~~

  ~~`$ yarn start`~~

- Static one

  - Add in to file .env.local (root directory) `REACT_APP_STATIC=true`
  - And `$ yarn start`   

## Understanding the structure of the Care Protect UI application

### Technologies

Used Technologies

- [React](https://reactjs.org/)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Yarn](https://yarnpkg.com/)
- [Material-UI](https://material-ui.com/)
- [Styled Components](https://github.com/styled-components/styled-components)
- [JestJs](https://jestjs.io/)

Application created with [create-react-app](https://github.com/facebook/create-react-app) and template [React Boilerplate CRA](https://github.com/react-boilerplate/react-boilerplate-cra-template)

**More detailed informations:**

- [Application structure](https://github.com/AppertaFoundation/care-protect-ui/wiki)
- [Architecture](https://github.com/AppertaFoundation/care-protect-ui/wiki)
- [Theme, Styling](https://github.com/AppertaFoundation/care-protect-ui/wiki)
- [Using Static data (mocks)](https://github.com/AppertaFoundation/care-protect-ui/wiki)
- [Testing](https://github.com/AppertaFoundation/care-protect-ui/wiki)

### Clinical Models

Care Protect UI has been developed to make use of the Care Protect clinical models which can be [here](https://github.com/AppertaFoundation/care-protect-openEHR). 

## Bugs and Feature Requests

Have a bug or a feature request? First, please search for existing and closed issues. If your problem or idea has not been addressed, please [open a new issue](https://github.com/AppertaFoundation/care-protect-ui/issues/new).

## Contributing to Care Protect UI

If you are thinking of making a contribution to Care Protect UI project please contact our team at info@apperta.org.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Disclaimer 

Care Protect UI is provided under an GNU Affero GPL v3.0 (AGPL v3.0) license and all terms of that license apply (https://www.gnu.org/licenses/agpl-3.0.en.html). Use of the Care Protect software or code is entirely at user risk. The Apperta Foundation does not accept any responsibility for loss or damage to any person, property or reputation as a result of using the software or code. No warranty is provided by any party, implied or otherwise. For use of the software or code. This software and code is not guaranteed safe to use in a clinical environment; any user is advised to undertake a safety assessment to confirm that deployment matches local clinical safety requirements.

## Contributors

[![](https://github.com/adabedi.png?size=50)](https://github.com/adabedi) [![](https://github.com/david-jobling.png?size=50)](https://github.com/david-jobling)

## License

This project uses the following license: [License](https://github.com/AppertaFoundation/care-protect-ui/blob/main/LICENSE>).
