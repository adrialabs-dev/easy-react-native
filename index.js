#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

function installReactNativeCli(appName, installReactNavigation, installStackNavigation, installBottomTabsNavigation, installDrawerNavigation, installAxios, addDirectories) {

  const spinner = ora({
    spinner: 'dots10',
    color: 'blue',
    text: 'Creating a new React Native project',
  })

  spinner.start()
  execSync(`npx @react-native-community/cli@latest init ${appName}`)
  spinner.stop()

  if (installReactNavigation) {
    console.log(chalk.bgBlue('Installing React Navigation....'))
    execSync(`cd ./${appName} && npm install @react-navigation/native react-native-screens react-native-safe-area-context`)
    console.log(`React Navigation installed, read the documentation for configure your project: ${chalk.blue('https://reactnavigation.org/docs/getting-started/')}`)
  }

  if (installStackNavigation) {
    console.log(chalk.bgBlue('Installing Stack Navigator....'))
    execSync(`cd ./${appName} && npm install @react-navigation/stack react-native-gesture-handler @react-native-masked-view/masked-view`)
    console.log(`Stack Navigator installed, read the documentation for configure your project: ${chalk.blue('https://reactnavigation.org/docs/stack-navigator')}`)
  }

  if (installBottomTabsNavigation) {
    console.log(chalk.bgBlue('Installing Bottom Tabs Navigator....'))
    execSync(`cd ./${appName} && npm install @react-navigation/bottom-tabs`)
    console.log(`Bottom Tabs Navigator installed, read the documentation for configure your project: ${chalk.blue('https://reactnavigation.org/docs/bottom-tab-navigator')}`)
  }

  if (installDrawerNavigation) {
    console.log(chalk.bgBlue('Installing Drawer Navigator....'))
    execSync(`cd ./${appName} && npm install @react-navigation/drawer react-native-gesture-handler react-native-reanimated`)
    console.log(`Drawer Navigator installed, read the documentation for configure your project: ${chalk.blue('https://reactnavigation.org/docs/drawer-navigator')}`)
  }

  if (installAxios) {
    console.log(chalk.bgBlue('Installing Axios....'))
    execSync(`cd ./${appName} && npm i axios`)
    console.log(`Axios installed.`)
  }

  if (addDirectories){
    console.log(chalk.bgBlue('Adding src folder...'))
    execSync(`cd ./${appName} && mkdir src`)
    execSync(`cd ./${appName}/src && mkdir components`)
    execSync(`cd ./${appName}/src && mkdir screens`)
    execSync(`cd ./${appName}/src && mkdir api`)
    execSync(`cd ./${appName}/src && mkdir utils`)
    execSync(`cd ./${appName}/src && mkdir navigation`)
    execSync(`cd ./${appName}/src && mkdir assets`)
  }

  console.log(chalk.yellow('If you are on Mac run npx pod-install on your root folder'))
  console.log(chalk.green('To run your project: cd yourProject and write the command npm run android or yarn android'))
  console.log(chalk.cyan('For ios use npm run ios or yarn ios'))
  console.log(chalk.gray('App is ready, thank you! (っ◕‿◕)っ'));
}


async function main() {

  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Enter the name of your application:',
        validate: function (input) {
          if (!input) {
            return 'Please enter a name for your application.';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'reactNavigation',
        message: 'Do you want to install React Navigation?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'stackNavigation',
        message: 'Do you want to install Stack Navigator?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'bottomTabsNavigation',
        message: 'Do you want to install Bottom Tabs Navigator?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'drawerNavigation',
        message: 'Do you want to install Drawer Navigator?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'axios',
        message: 'Do you want to install Axios?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'files',
        message: 'Do you want to add a folder structure for your files?',
        choices: ['Yes', 'No']
      }
    ])
    .then(answers => {
      const { appName, reactNavigation, stackNavigation, bottomTabsNavigation, drawerNavigation, axios, files } = answers;
      const installReactNavigation = reactNavigation === 'Yes';
      const installStackNavigation = stackNavigation === 'Yes';
      const installBottomTabsNavigation = bottomTabsNavigation === 'Yes';
      const installDrawerNavigation = drawerNavigation === 'Yes';
      const installAxios = axios === 'Yes'
      const addDirectories = files === 'Yes'
      installReactNativeCli(appName, installReactNavigation, installStackNavigation, installBottomTabsNavigation, installDrawerNavigation, installAxios, addDirectories);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

main()

