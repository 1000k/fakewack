# fakewack

## Requirements

- podman compose

## Getting Started

Initialize database:

```sh
npm run db:startup
```

Then launch dev server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### After changing DB scheme

```sh
npx prisma migrate dev
```

## Deploy on Vercel

### Migration to production DB

1. Copy DB's secret from "Vercel > Storage > (your-db-name) > .env.local"
2. Paste it to `/.env.production`
3. Type the following command:

```
dotenv -e .env.production -- npx prisma migrate deploy
```
