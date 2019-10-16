# Kubetron

![Screenshot of Kubetron](https://github.com/GreenKnight15/kubetron/assets/kubetron.png)

## Description
The idea of kubetron is to create a cross platform stand alone k8s dashboard. The are many command line utilities but would like to bring more style with some easy of life functionality.

## Running Electron

Run `npm run electron` this will build the angualr front end and start the electron app. The node server will start as the electron window spawns. 

This takes time to start since the angular code needs to be transpiled first. When developing start a local sever of the node app and the angualr frontend. This will alow you to develop in the brower with on save updates. When changes are done they will transfer into the electron container seamlessly.

## Node Server

### Local Development
Run `node server ./server` to start the node server locally. Navigate to `http://localhost:3000/`. this node app is started when the electron app starts. It is the interface with the [kubernetes-client](https://github.com/kubernetes-client/javascript).

## Angular Frontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Contributing 
Open tickets for features additions and feel free to open a pull request!
