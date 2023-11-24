var CategoryControllers = require('../src/controllers/CategoryControllers')
var Category = require('../src/models/Category')
const request = require('supertest')
const app = require('../src/app.js')

jest.mock('../src/models/Category')

describe('getCategoryById', () => {
    let req, res, jsonMock, statusMock;

    beforeEach(() => {
        req = { params: { id: 'test-id' } };
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = { json: jsonMock, status: statusMock };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should return category data when found', async () => {
        const mockCategoryData = { _id: 'test-id', name: 'Test Category' };

        // Mock findOne Category
        Category.findById.mockResolvedValue(mockCategoryData);

        await CategoryControllers.getCategoryById(req, res);

        expect(Category.findById).toHaveBeenCalledWith('test-id')
        expect(res.json).toHaveBeenCalledWith({
            status: 'OK',
            message: 'Found category successfully',
            data: mockCategoryData,
        });
    });

});

describe('Integration Tests', () => {
    it('should get category by ID not found', async () => {
        const response = await request(app).get('/bookstore/api/v1/categories/1').send();

        expect(response.status).toBe(404);

        const data = response.body;
        expect(data).toBeDefined();
        expect(data.message).toBe(undefined);
    });

});