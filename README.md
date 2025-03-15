# Project Architecture Description and Setup Guide

## Project Architecture

### Main Folders

- app/ – contains navigation between screens.
- assets/ – resources like icons, images, and fonts.
- components/ – shared components for reuse.
- constants/ – files with global constants (e.g., colors, styles).
- features/ – core app functionality organized by modules. Each module may include subfolders like api, components, views, hooks, and others that are relevant to the module. Each module can also export parts of its functionality:
  - movie-details/ – logic for movie details.
  - movies/ – logic for searching and displaying movies.
  - persons/ – logic for handling the person entity (actors, directors, etc.).
- hooks/ – custom hooks for managing state and other logic.
- providers/ – contexts for managing global state (e.g., favorite movies).
- utils/ – utility functions.

---

## Running the Project

### 1. Install Necessary Tools

- [Node.js](https://nodejs.org/) (recommended version – LTS)
- npm or yarn
- Expo CLI:

```sh
  npm install -g expo-cli
```

### 2. Clone the Repository and Install Dependencies

```sh
git clone https://github.com/skochkodmytro/movies-pet
cd movies-pet
npm install # or yarn install
```

### 3. Run the Project

```sh
expo start
```

This command will open Expo Developer Tools in your browser, where you can choose an emulator or connect a real device via Expo Go. You can scan the QR code in the terminal with your camera.
