interface Config {
    env: string;
    jwtSecret: string;
    jwtRefreshSecret: string;
    port: number | string;
    mongoUri: string;
}

const config: Config = {
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'scoobySnax',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'scoobySnax2',
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI || ''
}
export default config
