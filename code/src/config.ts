import dotenv from 'dotenv'


class Config {
    serverPort: number
    jwtSecret: string
    constructor(serverPort: number, jwtSecret: string) {
        this.serverPort = serverPort
        this.jwtSecret = jwtSecret
    }
}

function parseConfig(): Config {

    dotenv.config()
    let serverPort: number = Number(process.env.SERVER_PORT) || 3000
    let jwtSecret: string = process.env.SER || 'Every adventure requires a first step.'
    
    return new Config(serverPort, jwtSecret)
}

const config: Config = parseConfig()
export default config
