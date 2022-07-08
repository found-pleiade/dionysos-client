# Dionysos client
Share and watch movies with your friends.

# Dev

### Packet manager
pnpm is used as the packet manager for it’s speed and space efficiency while remaining compatible with Tauri.  

You can install it with : ```npm install -g pnpm```  

If npm is not installed, you can get it with [nvm](https://github.com/nvm-sh/nvm) or [nvm for Windows](https://github.com/coreybutler/nvm-windows). It’s packed with NodeJS.

### Tauri
You need to install Rust and some dependencies.
You can check os dependent installation [here](https://tauri.studio/v1/guides/getting-started/prerequisites/).

### Setup the project
Clone the project
```
git clone git@github.com:Brawdunoir/dionysos-client.git
```
CD Into the project directory
```
cd dionysos-client
```
Install dependencies
```
pnpm i
```

### Dev
You can now run the app with hot-reloading
```
pnpm tauri dev
```

### Build
```
pnpm tauri build
```
Bundle: ```src-tauri/target/release```

### Test
run tests
```
pnpm test:run
```
run tests with hot reload
```
pnpm test
```
run coverage tests
```
pnpm coverage
```