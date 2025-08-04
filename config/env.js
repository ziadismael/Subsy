import { config } from 'dotenv';

config( {path : `.env.${process.env.NODE_ENV || 'development'}.local`,} );

export const {
    PORT,
    DB_URI,
    NODE_ENV,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_KEY, ARCJET_ENV
} = process.env;

#UPSTASH
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="eyJVc2VySUQiOiI2YTcwMzg0MS0wNTJkLTRhMzgtYmQ3Zi00MzZjMDUyNDM4MGUiLCJQYXNzd29yZCI6IjZmY2Y2NWM0MjIxMDQ0NWZhNzIzMTk1NGQyYmMzZWQxIn0="
QSTASH_CURRENT_SIGNING_KEY="sig_7FcG1kJGRMAQ71r9ZvHhvQeADd2U"
QSTASH_NEXT_SIGNING_KEY="sig_6obzK5r9AA1D275vmMgj31DyqxcF"