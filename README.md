# Dionysos client

Share and watch movies with your friends.

# Developpers

## Project setup

### 1. Install NodeJS

The best way to get NodeJS is with [nvm](https://github.com/nvm-sh/nvm) or [nvm for Windows](https://github.com/coreybutler/nvm-windows).  
The NodeJS version used for the project is the `16.15.1`

### 2. Install pnpm

Pnpm is used as the packet manager for it’s speed and space efficiency.  
`npm install -g pnpm`

### 3. Clone and install JS dependencies

Clone the project, go into it and install the Javascript dependencies.

```
git clone git@github.com:found-pleiade/dionysos-client.git
cd dionysos-client
pnpm i
```

## Commands

### Dev

You can now run the app with hot-reloading.  
`pnpm dev`

### Test

Run tests in watch mode  
`pnpm test`

Run tests once  
`pnpm test:run`

Run tests coverage  
`pnpm coverage`
