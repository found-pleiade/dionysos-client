# Dionysos client
Share and watch movies with your friends.

# Dev

### NodeJS
The best way to get NodeJS is with [nvm](https://github.com/nvm-sh/nvm) or [nvm for Windows](https://github.com/coreybutler/nvm-windows).  
The NodeJS version used for the project is the `16.15.1`  

### Packet manager
Pnpm is used as the packet manager for it’s speed and space efficiency while remaining compatible with Tauri.  
`npm install -g pnpm`  

### Tauri
You need to install Rust and some dependencies.  
You can check os dependent installation [here](https://tauri.studio/v1/guides/getting-started/prerequisites/).

### Setup the project
Clone the project, go into it and install the Javascript dependencies.  
```git clone git@github.com:Brawdunoir/dionysos-client.git```  
```cd dionysos-client```  
```pnpm i```

### Dev
You can now run the app with hot-reloading.  
```pnpm tauri dev```

### Build
```pnpm tauri build```  
Bundle: ```src-tauri/target/release```

### Test
Run tests in watch mode  
```pnpm test```  

Run tests once  
```pnpm test:run```

Run tests coverage  
```pnpm coverage```
