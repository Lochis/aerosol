interface Config {
    env: string;
    jwtSecret: string;
    port: number | string;
    mongoUri: string;
}

const config: Config = {
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'scoobySnax',
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI || ''
}
export default config
