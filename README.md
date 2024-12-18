# Elysia-RTU

Elysia-RTU (Ready To Use). Elysia framework with structured schema and some helper. If you are too lazy to initiate Elysia project, then this is what you looking for 🤩. For now, Elysia-RTU has some feature including database seeder, logger (with winston), API response handler and little config for database. Unfortunately for this version only provided for mongodb, we will add more feature further.

# Commands

## Database Seeder

To seed database, simply just run this command :

```bash
bun migrate --seed
```

```bash
bun migrate --populate
```

```bash
bun migrate --pop
```

To clear database, simply just run this command :

```bash
bun migrate --clear
```

```bash
bun migrate --cl
```

```bash
bun migrate --thanos-snap
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
