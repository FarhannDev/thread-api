export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  database: {
    uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/nestjs-app',
  },
});
