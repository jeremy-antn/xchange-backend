const { updateTeacher } = require('../controllers/teacherController'); // Importer directement la fonction du contrôleur
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils');
const Teacher = require('../models/teacherModel');

// Objets simulés pour la requête et la réponse
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
  await connectToTestDB(); // Se connecter à la base de données de test avant tous les tests
});

afterAll(async () => {
  await disconnectFromTestDB(); // Se déconnecter de la base de données de test après tous les tests
});

describe('API des enseignants', () => {
  test('devrait mettre à jour les détails de l\'enseignant', async () => {
    // Créer un enseignant exemple dans la base de données
    const teacher = new Teacher({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
      password: 'password123', // Ajouter un mot de passe pour satisfaire la validation du schéma
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

    expect(res.status).toHaveBeenCalledWith(200); // Vérifier que le statut de la réponse est 200
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

    // S'assurer que le champ mot de passe n'est pas inclus dans la réponse
    expect(res.json.mock.calls[0][0].teacher.password).toBeUndefined();
  });

  // Ajouter plus de cas de test si nécessaire
});
