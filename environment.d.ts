declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number,
            SHEET_TOKEN?: string,

            DB_HOST: string,
            DB_PORT: number,
            DB_NAME: string,

            DB_USER?: string
            DB_PASSWORD?: string

            DEV?: boolean
        }
    }
}

export {}
