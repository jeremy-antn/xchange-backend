const { getTeachers } = require('../controllers/teacherController'); // Importer directement la fonction du contrôleur
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils');
const Teacher = require('../models/teacherModel');

// Objets simulés pour la requête et la réponse
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
  await connectToTestDB(); // Se connecter à la base de données de test avant tous les tests
});

afterAll(async () => {
  await disconnectFromTestDB(); // Se déconnecter de la base de données de test après tous les tests
});

describe('API des enseignants', () => {
  test('devrait récupérer tous les enseignants', async () => {
    // Créer quelques enseignants exemples dans la base de données
    const teacher1 = new Teacher({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
      password: 'password123', // Ajouter un mot de passe pour satisfaire la validation du schéma
    });
    const teacher2 = new Teacher({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      teacherGroup: 'Physics',
      password: 'password456', // Ajouter un mot de passe pour satisfaire la validation du schéma
    });
    await teacher1.save();
    await teacher2.save();

    const req = mockRequest();
    const res = mockResponse();

    await getTeachers(req, res);

    expect(res.status).toHaveBeenCalledWith(200); // Vérifier que le statut de la réponse est 200
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        teacherGroup: 'Mathematics',
      }), 
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        teacherGroup: 'Physics',
      })
    ]);

    // Vous pouvez ajouter des assertions plus spécifiques si nécessaire
  });

  // Ajouter plus de cas de test si nécessaire
});
