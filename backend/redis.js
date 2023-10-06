import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.isAlive()
        this.client.on('error', (err) => {
            console.log('Error'+ err);
        });
        this.client.on('connect', () => {
            console.log('Connected');
        })
    }
    async isAlive() {
        await this.client.connect()
        return this.client.connected;
    }
}

const redisClient = new RedisClient();
export default redisClient;