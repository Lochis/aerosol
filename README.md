# Aerosol

## Usage

1. Install Bun: https://bun.sh/

2. Install dependencies using Bun:

   ```sh
   bun install
   ```

3. In the `server/` directory, create a `.env` file and fill out the following:

   ```env
   MONGODB_URI=mongodb+srv://user:password@example.com/Aerosol?appName=Default
   JWT_SECRET=
   NODE_ENV=development
   PORT=3000
   ```

4. Run client and server in development mode:

   ```sh
   bun dev
   ```

5. Build the client and server files (note the extra `run` keyword):

   ```sh
   bun run build
   ```
