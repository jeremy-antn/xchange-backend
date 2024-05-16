const { deleteTeacher } = require('../controllers/teacherController'); // Importer directement la fonction du contrôleur
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
  test('devrait supprimer un enseignant par ID', async () => {
    // Créer un enseignant exemple dans la base de données
    const teacher = new Teacher({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      teacherGroup: 'Mathematics',
      password: 'password123', // Ajouter un mot de passe pour satisfaire la validation du schéma
    });
    await teacher.save();

    // Simuler la méthode findByIdAndDelete pour retourner l'enseignant supprimé
    Teacher.findByIdAndDelete = jest.fn().mockResolvedValue(teacher);

    const req = mockRequest({ id: teacher._id });
    const res = mockResponse();

    await deleteTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(200); // Vérifier que le statut de la réponse est 200
    expect(res.json).toHaveBeenCalledWith({ message: 'Enseignant supprimé avec succès' });

    // Assurer que la méthode findByIdAndDelete est appelée avec le bon ID de l'enseignant
    expect(Teacher.findByIdAndDelete).toHaveBeenCalledWith(teacher._id);
  });

  test('devrait retourner 404 si l\'enseignant n\'est pas trouvé', async () => {
    // Simuler la méthode findByIdAndDelete pour retourner null (enseignant non trouvé)
    Teacher.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ id: 'non-existent-id' });
    const res = mockResponse();

    await deleteTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(404); // Vérifier que le statut de la réponse est 404
    expect(res.json).toHaveBeenCalledWith({ message: 'Enseignant non trouvé' });
  });

  // Ajouter plus de cas de test si nécessaire
});
