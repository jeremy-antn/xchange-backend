const { createTeacher } = require('../controllers/teacherController'); // Import the controller function directly
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils');
const Teacher = require('../models/teacherModel');

// Mock request and response objects
const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
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
  test('should create a new teacher', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      teacherGroup: 'Mathematics',
      password: 'A.123456*', // Assuming this is a valid password format
    };

    await createTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Teacher account created successfully.',
      teacher: expect.any(Object) // You can add more specific assertions here
    });

    // Check if the teacher is actually saved in the database
    const savedTeacher = await Teacher.findOne({ email: req.body.email });
    expect(savedTeacher).toBeDefined();
    expect(savedTeacher.firstName).toBe(req.body.firstName);
    expect(savedTeacher.lastName).toBe(req.body.lastName);
    expect(savedTeacher.email).toBe(req.body.email);
    expect(savedTeacher.teacherGroup).toBe(req.body.teacherGroup);
    
    // You can add more assertions if needed
  });

  // Add more test cases as needed
});
