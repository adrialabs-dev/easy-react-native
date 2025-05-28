// #!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str) && !str.includes(' ') && !str.includes('-') && !str.includes('_');
}

async function getValidAppName() {
  let appName;
  let isValid = false;

  while (!isValid) {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Enter the name of your application (must be camelCase, e.g., myApp):',
        validate: (input) => {
          if (!input) return 'Please enter a name.';
          if (!isCamelCase(input)) {
            return '❌ Must be camelCase (e.g., myApp). No spaces, hyphens, or underscores!, Delete it and try again.';
          }
          return true;
        },
      },
    ]);

    appName = answer.appName;
    isValid = isCamelCase(appName);

    if (!isValid) {
      console.log(chalk.red('✖ Invalid name. Try again.'));
      console.log(chalk.yellow('Examples:'), 'myApp, coolProject, reactNativeApp');
    }
  }

  return appName;
}

async function main() {
  console.log(chalk.blue('🚀 React Native Project Setup 🚀'));

  
  const appName = await getValidAppName();

  
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'reactNavigation',
      message: 'Install React Navigation?',
      choices: ['Yes', 'No'],
    },
    {
      type: 'list',
      name: 'stackNavigation',
      message: 'Install Stack Navigator?',
      choices: ['Yes', 'No'],
    },
    {
      type: 'list',
      name: 'bottomTabsNavigation',
      message: 'Install Bottom Tabs Navigator?',
      choices: ['Yes', 'No'],
    },
    {
      type: 'list',
      name: 'drawerNavigation',
      message: 'Install Drawer Navigator?',
      choices: ['Yes', 'No'],
    },
    {
      type: 'list',
      name: 'axios',
      message: 'Install Axios?',
      choices: ['Yes', 'No'],
    },
    {
      type: 'list',
      name: 'files',
      message: 'Add folder structure (src/)?',
      choices: ['Yes', 'No'],
    },
  ]);

  const spinner = ora('Creating project...').start();

  try {
    execSync(`npx @react-native-community/cli@latest init ${appName}`, { stdio: 'inherit' });
    spinner.succeed(chalk.green('Project created successfully! ✅'));

    if (answers.reactNavigation === 'Yes') {
      console.log(chalk.blue('Installing React Navigation...'));
      execSync(`cd ${appName} && npm install @react-navigation/native react-native-screens react-native-safe-area-context`, { stdio: 'inherit' });
    }

    if (answers.stackNavigation === 'Yes') {
      console.log(chalk.blue('Installing Stack Navigator...'));
      execSync(`cd ${appName} && npm install @react-navigation/stack react-native-gesture-handler @react-native-masked-view/masked-view`, { stdio: 'inherit' });
    }

    if (answers.bottomTabsNavigation === 'Yes') {
      console.log(chalk.blue('Installing Bottom Tabs Navigator...'));
      execSync(`cd ${appName} && npm install @react-navigation/bottom-tabs`, { stdio: 'inherit' });
    }

    if (answers.drawerNavigation === 'Yes') {
      console.log(chalk.blue('Installing Drawer Navigator...'));
      execSync(`cd ${appName} && npm install @react-navigation/drawer react-native-gesture-handler react-native-reanimated`, { stdio: 'inherit' });
    }

    if (answers.axios === 'Yes') {
      console.log(chalk.blue('Installing Axios...'));
      execSync(`cd ${appName} && npm install axios`, { stdio: 'inherit' });
    }

    if (answers.files === 'Yes') {
      console.log(chalk.blue('Creating folder structure...'));
      execSync(`cd ${appName} && mkdir -p src/components src/screens src/api src/utils src/navigation src/assets`, { stdio: 'inherit' });
    }

    console.log(chalk.yellow('If you are on Mac, run:'));
    console.log(chalk.yellow(`cd ${appName} && npx pod-install`));
    console.log(chalk.green('To run your project:'));
    console.log(chalk.green(`cd ${appName} && npm run android`));
    console.log(chalk.cyan('For iOS: npm run ios'));
    console.log(chalk.gray('App is ready! (っ◕‿◕)っ'));
  } catch (error) {
    spinner.fail(chalk.red('Error creating project ❌'));
    console.error(error);
  }
}

main().catch(console.error);