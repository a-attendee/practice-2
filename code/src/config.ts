import dotenv from 'dotenv'


class Config {
    serverPort: number
    constructor(serverPort: number) {
        this.serverPort = serverPort
    }
}

function parseConfig(): Config {

    dotenv.config()
    let serverPort: number = Number(process.env.SERVER_PORT) || 3000

    return new Config(serverPort)
}

const config: Config = parseConfig()
export default config
