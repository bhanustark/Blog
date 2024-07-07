# Blog

Create .env file in project root directory and add mongo uri and secret
PORT, ANDROID_APP_ID, ANDROID_APP_SHA256, MONGO_URI_DEV fields are optional

```bash
APP_NAME=Public App
PORT=3000
MONGO_URI='mongodb://127.0.0.1:27017/something?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10'
MONGO_URI_DEV='mongodb://127.0.0.1:27017/something_dev?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10'
ANDROID_APP_ID=in.publicapp.android
ANDROID_APP_SHA256=9F:38:3B:85:34:AF:FB:A7:43:EA:C4:E2:39:38:3F:34:FC:E2:F7:A7:EA:DE:3C:02:B6:15:AB:8E:CB:8D:DB:C8
GOOGLE_ANALYTICS_CODE=G-B62PJ5TRQD
SECRET=k3d7snDw37shdfjkDFHE3ed
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```