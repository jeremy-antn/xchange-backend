const { getTeacherById } = require('../controllers/teacherController'); // Importer directement la fonction du contrôleur
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils');
const Teacher = require('../models/teacherModel');

// Objets simulés pour la requête et la réponse
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
  await connectToTestDB(); // Se connecter à la base de données de test avant tous les tests
});

afterAll(async () => {
  await disconnectFromTestDB(); // Se déconnecter de la base de données de test après tous les tests
});

describe('API des enseignants', () => {
  test('devrait récupérer un enseignant par ID', async () => {
    // Créer un enseignant exemple dans la base de données
    const teacher = new Teacher({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
      password: 'password123', // Ajouter un mot de passe pour satisfaire la validation du schéma
    });
    await teacher.save();

    const req = mockRequest({ id: teacher._id }); // Passer l'ID de l'enseignant créé
    const res = mockResponse();

    await getTeacherById(req, res);

    expect(res.status).toHaveBeenCalledWith(200); // Vérifier que le statut de la réponse est 200
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
    }));

    // S'assurer que le champ mot de passe n'est pas inclus dans la réponse
    expect(res.json.mock.calls[0][0].password).toBeUndefined();
  });

  // Ajouter plus de cas de test si nécessaire
});
