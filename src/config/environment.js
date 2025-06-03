const environment = {
    API_AUTH_URL: process.env.NEXT_PUBLIC_API_AUTH_URL || process.env.API_AUTH_URL || 'http://localhost:3001/auth',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
}

export default environment;