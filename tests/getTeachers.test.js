const { getTeachers } = require('../controllers/teacherController');
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils');
const Teacher = require('../models/teacherModel');

// Mock request and response objects
const mockRequest = () => {
  const req = {};
  return req;
};
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeAll(async () => {
  await connectToTestDB();
});

afterAll(async () => {
  await disconnectFromTestDB();
});

describe('Teacher API', () => {
  test('should get all teachers', async () => {
    // Create some sample teachers in the database
    const teacher1 = new Teacher({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
      password: 'password123', // Add a password to satisfy the schema validation
    });
    const teacher2 = new Teacher({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      teacherGroup: 'Physics',
      password: 'password456', // Add a password to satisfy the schema validation
    });
    await teacher1.save();
    await teacher2.save();

    const req = mockRequest();
    const res = mockResponse();

    await getTeachers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([expect.objectContaining({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
    }), expect.objectContaining({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      teacherGroup: 'Physics',
    })]);

    // You can add more specific assertions if needed
  });

  // Add more test cases as needed
});
