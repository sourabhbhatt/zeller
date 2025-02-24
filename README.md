ZellerCodeChallenge

🚀 Project Overview

ZellerCodeChallenge is a React Native application that fetches and displays a list of users using GraphQL with Apollo Client. It allows filtering users based on roles, supports search functionality, and includes clean UI components.

📌 Features

React Native 0.78.0

GraphQL Apollo Client integration

User list with filtering (Admin, Manager, etc.)

Search functionality

Pull-to-refresh

Custom UI components (Buttons, Headers, Radio buttons, Loaders)

Navigation using React Navigation

State persistence using MMKV

Linting & Testing support

iOS & Android support

🛠️ Setup & Installation

1️⃣ Clone the Repository

  git clone <repo-url>
  cd ZellerCodeChallenge

2️⃣ Install Dependencies

  yarn install

3️⃣ Setup iOS (For macOS Users)

  cd ios
  pod install
  cd ..

4️⃣ Start the Development Server

  yarn start

5️⃣ Run the Application

For Android:

yarn a

For iOS:

yarn i

📜 Scripts

Command

Description

yarn start

Starts the Metro bundler with cache reset

yarn a

Runs the app on Android

yarn i

Runs the app on iOS

yarn gc

Cleans Android build cache

yarn pod-update

Updates and installs iOS pods

yarn pod-r

Deintegrates pods (Removes installed CocoaPods)

yarn pod-i

Installs iOS dependencies (pods)

yarn lint

Runs ESLint for linting

yarn test

Runs Jest tests

📦 Dependencies

{
  "@apollo/client": "^3.13.1",
  "@react-navigation/native": "^7.0.14",
  "@react-navigation/stack": "^7.1.1",
  "graphql": "^16.10.0",
  "react": "19.0.0",
  "react-native": "0.78.0",
  "react-native-gesture-handler": "^2.24.0",
  "react-native-mmkv": "^3.2.0",
  "react-native-safe-area-context": "^5.2.0",
  "react-native-screens": "^4.9.0",
  "react-native-vector-icons": "^10.2.0"
}


📂 Folder Structure

ZellerCodeChallenge/
│── src/
│   ├── assets/         # Colors, fonts, images
│   ├── components/     # UI components (Buttons, Loaders, Headers, etc.)
│   ├── graphql/        # GraphQL Queries & Apollo Client setup
│   ├── navigation/     # Navigation setup
│   ├── screens/        # Screens (User List, Home, etc.)
│   ├── utils/          # Helper functions and storage
│── ios/                # iOS native code
│── android/            # Android native code
│── App.tsx             # Entry point
│── package.json        # Project configuration
│── README.md           # Documentation

🎉 Acknowledgements

React Native Team for building an awesome framework.

Apollo Client for seamless GraphQL integration.

React Navigation for handling smooth app navigation.

Testing Library for React Native testing utilities.