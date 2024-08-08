# Bunをインストールする

```bash
curl -fsSL https://bun.sh/install | bash
```

# Next.jsプロジェクトをBunで作成する

```bash
bun create next-app ./frontend
cd frontend
bun install
```

# Shadcn/uiのセットアップ

```bash
bun add -D shadcn-ui
bun shadcn-ui init
bun shadcn-ui add button
bun shadcn-ui add form
bun shadcn-ui add input
bun shadcn-ui add card
bun shadcn-ui add skeleton
```

# Supabaseの型収集

```bash
bunx supabase login
bunx supabase gen types typescript --project-id [SupabaseのreferenceID] > src/app/type/database.types.ts
```

# Prismaのセットアップ

```bash
# Prismaのインストール
bun add prisma --save-dev
bun add @prisma/client

# Prismaの初期化
bunx prisma init
bunx prisma db pull

# Prismaを使用しマイグレーション
bunx prisma migrate dev --name change-user

# Prismaクライアントの生成
bunx prisma generate
```

# React Hook Form

```bash
bun add react-hook-form zod @hookform/resolvers react-modal
```

# Prettierの導入

```bash
bun add -D prettier
```

```json:package.json
"scripts": {
    "lint": "eslint .",
},
```

※ prettierrc を追加すること

# ESLintの導入

```bash
bun add -D eslint
bun add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import eslint-plugin-jsx-a11y @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

```json:package.json
"scripts": {
    "format": "prettier --write 'src/**/*.{ts,tsx}'",
},
```

※ eslint.config.mjs を追加すること

# テスト導入

```bash
bun add -d jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
bun add -d @types/jest
bun add -d jest-environment-jsdom
bun add -d jsdom
bun add -d @happy-dom/global-registrator
```

```bash
npm i --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest jest-environment-jsdom
npm i --save-dev ts-node
```

```json:package.json
"scripts": {
    "test": "npx jest --verbose",
},
```

# E2Eの導入

```bash
sudo add-apt-repository universe
sudo apt-get update
sudo apt-get install -y libwoff1 libvpx7 libevent-2.1-7 libopus0 libwebpdemux2 libharfbuzz-icu0 libenchant-2-2 libsecret-1-0 libhyphen0 libmanette-0.2-0 libflite1 libgles2
sudo apt-get install -y gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-ugly gstreamer1.0-libav
sudo apt-get install -y libenchant1c2a libgtk-3-0 libgbm1 libnotify4 libnss3 libxss1 libasound2 libxtst6 xdg-utils

# Playwrightのインストール
bun add -d @playwright/test
# Playwrightが使用するブラウザがインストール
bunx playwright install
```

```json:package.json
"scripts": {
    "test:e2e": "bun playwright test"
},
```

※ playwright.config.ts を追加すること

# その他のインストール

```bash
bun add hono
bun add swr
bun add @supabase/auth-helpers-nextjs
```
