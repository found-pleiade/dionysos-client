# Dionysos client
Share and watch movies with your friends.

# Dev

## Project setup

### 1. Install NodeJS
The best way to get NodeJS is with [nvm](https://github.com/nvm-sh/nvm) or [nvm for Windows](https://github.com/coreybutler/nvm-windows).  
The NodeJS version used for the project is the `16.15.1`  

### 2. Install pnpm
Pnpm is used as the packet manager for it’s speed and space efficiency while remaining compatible with Tauri.  
`npm install -g pnpm`  

### 3. Install Tauri dependencies
You need to install Rust and some other dependencies.  
You can check os dependent installation [here](https://tauri.studio/v1/guides/getting-started/prerequisites/).

### 4. Clone and install JS dependencies
Clone the project, go into it and install the Javascript dependencies.
```
git clone git@github.com:Brawdunoir/dionysos-client.git  
cd dionysos-client  
pnpm i
```

## Commands

### Dev
You can now run the app with hot-reloading.  
`pnpm tauri dev`

### Build
Create a bundle located at `src-tauri/target/release`  
`pnpm tauri build`

### Test
Run tests in watch mode  
`pnpm test`  

Run tests once  
`pnpm test:run`

Run tests coverage  
`pnpm coverage`
