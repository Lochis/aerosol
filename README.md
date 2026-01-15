# Aerosol

A social media platform with real-time chatting, markdown rendering, and syntax highlighting.

## Usage

1. Install Bun: https://bun.sh/

2. Install dependencies using Bun:

   ```sh
   bun install
   ```

3. Create a `.env` file and fill out the following:

   ```env
   MONGODB_URI=mongodb+srv://user:password@example.com/Aerosol?appName=Default
   JWT_SECRET=
   NODE_ENV=development
   CLIENT_API_BASE=http://localhost:3000/api
   ```

4. Run client and server in development mode:

   ```sh
   bun dev
   ```

5. Build the client and server files (note the extra `run` keyword):

   ```sh
   bun run build
   ```
