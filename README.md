# codex-playground

A simple React Native sign-up experience that runs on both Android and iOS using the Expo tooling.

## Getting started

1. Install the Expo CLI if you don't have it already:
   ```bash
   npm install --global expo-cli
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```

## Running on Ubuntu

1. Ensure Node.js and npm are available (Node 18+ recommended). On a fresh Ubuntu system you can install them with:
   ```bash
   sudo apt update && sudo apt install -y nodejs npm
   ```
2. Install the Expo CLI globally if you have not already:
   ```bash
   sudo npm install --global expo-cli
   ```
3. From the project directory, install dependencies and start the Expo dev server:
   ```bash
   npm install
   npm start
   ```
4. Choose **w** in the terminal to open the web preview, or connect an Android emulator/physical device and choose **a**. iOS simulators are not available on Ubuntu.

## Running the app

- **Android**: `npm run android` (launches the Expo dev server and opens an emulator or connected device).
- **iOS (macOS only)**: `npm run ios`.
- **Web preview**: `npm run web`.

You can also run `npm start` to pick a platform interactively in the Expo Dev Tools.

## Linting

Run `npm run lint` to check for basic code-quality issues.
