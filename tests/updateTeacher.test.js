const { updateTeacher } = require('../controllers/teacherController'); // Import the controller function directly
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils');
const Teacher = require('../models/teacherModel');

// Mock request and response objects
const mockRequest = (params, body) => {
  const req = {
    params: params,
    body: body,
  };
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
  test('should update teacher details', async () => {
    // Create a sample teacher in the database
    const teacher = new Teacher({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
      password: 'password123', // Add a password to satisfy the schema validation
    });
    await teacher.save();

    const updatedData = {
      firstName: 'Johnathan',
      lastName: 'Doeington',
      email: 'john.doe@example.com',
      teacherGroup: 'Science',
      modules: ['Physics', 'Chemistry'],
    };

    const req = mockRequest({ id: teacher._id }, updatedData);
    const res = mockResponse();

    await updateTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Teacher updated successfully',
      teacher: expect.objectContaining({
        firstName: 'Johnathan',
        lastName: 'Doeington',
        email: 'john.doe@example.com',
        teacherGroup: 'Science',
        modules: ['Physics', 'Chemistry'],
      }),
    }));

    // Ensure that the password field is not included in the response
    expect(res.json.mock.calls[0][0].teacher.password).toBeUndefined();
  });

  // Add more test cases as needed
});
