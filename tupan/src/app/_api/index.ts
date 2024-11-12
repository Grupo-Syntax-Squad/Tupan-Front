import * as dotenv from 'dotenv';
dotenv.config();

export const api_route: string = process.env.BACKEND_URL || 'http://localhost:8000/';
