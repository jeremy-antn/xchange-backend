const { createTeacher } = require('../controllers/teacherController'); // Importer directement la fonction du contrôleur
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils');
const Teacher = require('../models/teacherModel');

// Objets simulés pour la requête et la réponse
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
  await connectToTestDB(); // Se connecter à la base de données de test avant tous les tests
});

afterAll(async () => {
  await disconnectFromTestDB(); // Se déconnecter de la base de données de test après tous les tests
});

describe('API des enseignants', () => {
  test('devrait créer un nouvel enseignant', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      teacherGroup: 'Mathematics',
      password: 'A.123456*', // Supposant que c'est un format de mot de passe valide
    };

    await createTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(201); // Vérifier que le statut de la réponse est 201
    expect(res.json).toHaveBeenCalledWith({
      message: 'Compte enseignant créé avec succès.',
      teacher: expect.any(Object) // Vous pouvez ajouter des assertions plus spécifiques ici
    });

    // Vérifier si l'enseignant est effectivement enregistré dans la base de données
    const savedTeacher = await Teacher.findOne({ email: req.body.email });
    expect(savedTeacher).toBeDefined();
    expect(savedTeacher.firstName).toBe(req.body.firstName);
    expect(savedTeacher.lastName).toBe(req.body.lastName);
    expect(savedTeacher.email).toBe(req.body.email);
    expect(savedTeacher.teacherGroup).toBe(req.body.teacherGroup);
    
    // Vous pouvez ajouter plus d'assertions si nécessaire
  });

  // Ajouter plus de cas de test si nécessaire
});
