# Blog

Create .env file in project root directory and add mongo uri and secret
```bash
MONGO_URI='mongodb://127.0.0.1:27017/something?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10'
MONGO_URI_DEV='mongodb://127.0.0.1:27017/something_dev?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10'
SECRET=Kj3krljr3lkjdsaao323KD
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```