import * as dotenv from 'dotenv';

dotenv.config({ path: './config.env.dev' });
describe('test', () => {
    it('test', () => {
        expect(1).toBe(1)
    })
})
