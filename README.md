THIS IS THE FRONT END CODE - there is another repo for the back end 

This makes pages
https://dev.dsqawqiqetm4f.amplifyapp.com/admin/dashboard
this is the editor when you click on a page
https://dev.dsqawqiqetm4f.amplifyapp.com/admin/editor

We have slide making button on the left
and a preview in the center
and details on the right

We also have something that if you do explainerpage.com/user/email@domain.com
it wil email admin they are on the page
and you can go to the page and watch them from the text and email


# We are building a
dots editor
scrolldown editor
text editor for slides that are like normal pages
2d with a lottie component
3d
images

# and the backend will have
text editor
2d svg maker
2d animator
3d code editor with three.js
3d editor

### Branches
dev
main
abctextamplify

## Storybook

### Instalation of dependencies

```bash
$ yarn
```

### Run

```bash
$ yarn storybook
```

### To only **build** components of the Desing System

```bash
$ yarn storybook:prepare
```

### How to use components
---

```jsx
// src/components/MyComponent.js
import React from 'react'

// import the component like this
import { Button } from '../ui/components/buttons/base/example';
// or like this
import Input from '../ui/components/input';

// and import your style
import '../assets/styles/ui/components/input/base/index.css';
import '../assets/styles/ui/components/buttons/base/index.css';
import './MyComponent.css'

const App = () => {
  const [value, setValue] = React.useState('Value')
  
  return (
    <div>
      <Input className="custom-input" onChange={(e) => setValue(e.target.value)} value={value} />
      
      <Button className="custom-btn" onClick={() => setValue('')}>
        My button of the example to clean value
      </Button>
    </div>
  )
}

export default App
```
### Note:

**To learn more** about how to use each component, you can run the command `yarn storybook` and check the **documentation** for each component

---

### when your building
make a branch with the feature - 
commit lots
then pr back and make glidaa the approver
make addition to the readme
keep the css next to the componnent - with same name in a folder
put images in the assets folder in their section

this is the backend
the front end of any page is here
https://github.com/glidaa/epboilerplate
look at the officeworks branch
### `Amplify backend 
```bash
#install amplify globally
npm install -g @aws-amplify/cli
amplify configure
# enter in the amplify details then checkout environment https://docs.amplify.aws/cli/teams/overview
amplify checkout -b dev
#Initialize your locla envrionment
amplify init
#pull latest backend changes
amplify pull
# upload changes
amplify push
```
you can amplify mock as well https://docs.amplify.aws/cli#infrastructure-as-code




## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### `Amplify

-install amplify globally

`npm install -g @aws-amplify/cli`

-make update changes to your backend

`amplify pull`

-upload changes to your backend

`amplify push`


# Technical decisions
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
