

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
bunx prisma pull

# Prismaを使用しマイグレーション
bunx prisma migrate dev --name change-user

# Prismaクライアントの生成
bunx prisma generate
```

# React Hook Form

```bash
bun add react-hook-form zod @hookform/resolvers react-modal
```


# その他のインストール

```bash
bun add hono
bun add swr
bun add @supabase/auth-helpers-nextjs
```