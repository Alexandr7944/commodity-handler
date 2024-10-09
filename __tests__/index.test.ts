describe('test', () => {
    it('test', () => {
        expect(1).toBe(1)
    });

    it('env test', () => {
        expect(process.env.TYPE).toBe('TEST')
    })
})
