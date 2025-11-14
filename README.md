# Aerosol

## Usage

### With Node.js

1. Install dependencies:

   ```sh
   npm install
   ```

2. Run client and server concurrently in development mode:

   ```sh
   npm run dev
   ```

3. Build client and server to dist/:

   ```sh
   npm run build
   ```

### With Bun

1. Install dependencies:

   ```sh
   bun install
   ```

2. (BROKEN) Run client and server concurrently in development mode:

   ```sh
   bun dev --workspaces
   ```

   > [!WARNING]
   >
   > Due to oven-sh/bun [#8788](https://github.com/oven-sh/bun/issues/8788),
   > the client and server cannot be interrupted with Ctrl+C when running scripts
   > in context of a workspace with `-F/--filter` or `--workspaces`. For now, you
   > can work around this by manually cd'ing into each project and running `bun dev`.

3. (BROKEN) Build client and server concurrently:

   ```sh
   bun build --workspaces
   ```
