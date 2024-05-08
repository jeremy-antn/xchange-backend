const { deleteTeacher } = require('../controllers/teacherController'); // Import the controller function directly
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils');
const Teacher = require('../models/teacherModel');

// Mock request and response objects
const mockRequest = (params) => {
  const req = {
    params: params,
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
  test('should delete teacher by ID', async () => {
    // Create a sample teacher in the database
    const teacher = new Teacher({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
      password: 'password123', // Add a password to satisfy the schema validation
    });
    await teacher.save();

    // Mock the findByIdAndDelete method to return the deleted teacher
    Teacher.findByIdAndDelete = jest.fn().mockResolvedValue(teacher);

    const req = mockRequest({ id: teacher._id });
    const res = mockResponse();

    await deleteTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Teacher deleted successfully' });

    // Ensure that the findByIdAndDelete method is called with the correct teacher ID
    expect(Teacher.findByIdAndDelete).toHaveBeenCalledWith(teacher._id);
  });

  test('should return 404 if teacher not found', async () => {
    // Mock the findByIdAndDelete method to return null (teacher not found)
    Teacher.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ id: 'non-existent-id' });
    const res = mockResponse();

    await deleteTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Teacher not found' });
  });

  // Add more test cases as needed
});
