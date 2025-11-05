const mockPrisma = {
    user:{
        findUnique: jest.fn(),
        create:jest.fn(),
        update:jest.fn(),
        findFirst: jest.fn()
    }
}
export default mockPrisma