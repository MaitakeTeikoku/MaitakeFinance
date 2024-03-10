# testReact
## Todo
1. GitHubからクローン。
    ```bash
    git clone https://github.com/MaitakeTeikoku/MaitakeFinance.git
    ```
1. Reactのプロジェクトを作成。
    ```bash
    npx create-react-app maitake-finance --template typescript
    ```
1. Reactのライブラリをインストール。
    ```bash
    npm install @mui/joy @emotion/react @emotion/styled
    npm install @mui/icons-material
    npm install react-loader-spinner
    npm install react-cookie
    ```
    * https://mhnpd.github.io/react-loader-spinner/
1. Reactのファイルをルートに移動。
1. Reactのpackage.jsonの2行目に以下を追記。
    ```json
    "homepage": "https://MaitakeTeikoku.github.io/MaitakeFinance",
    ```
1. .github/workflowsにYAMLファイルを作成。以下の箇所はリポジトリ名に変更。
    ```yaml
    jobs:
      build:
        steps:
          name: Build
            env:
              PUBLIC_URL: /MaitakeFinance
    ```
1. コミットしてプッシュ。
    ```bash
    git add .
    git commit -m "commit"
    git push
    ```
    * エラーが起きるときは以下を実行してみる。
        ```bash
        git config http.postBuffer 524288000
        git config --global http.version HTTP/1.1
        ```



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
