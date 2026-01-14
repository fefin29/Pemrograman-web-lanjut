## Masuk ke Direktori week10

```bash
cd week10
```

## Install Dependencies

```bash
npm install --save-dev html-webpack-plugin copy-webpack-plugin favicons-webpack-plugin clean-webpack-plugin webpack-dev-server webpack-cli style-loader css-loader file-loader jsdom webpack webpack-pwa-manifest regenerator-runtime idb
```

## Jalankan WebSocket Server dan Client

```bash
node ./src/_ws/server.js
node ./src/_ws/client.js
```

## Jalankan Dev Server

```bash
./node_modules/.bin/webpack-dev-server
```

## Akses di Browser

Akses di browser di alamat `http://localhost:8080` (atau port lain jika 8080 sudah terpakai).