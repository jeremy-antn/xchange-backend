# xchange-backend

## Github

```bash 
git add . # Ajouter des fichiers au prochain commit
git commit -m "description" # Commit avec une description
git push -u origin main # Pousser les changements vers la branche principale du dépôt distant
```

### Revenir au dernier commit

```bash 
git reset --hard HEAD
```

### Création d'une nouvelle branche

```bash 
git checkout -b nom_de_votre_branche
```

### Changer de branche

```bash 
git checkout nom_de_votre_branche
```

### Fusionner une branche de fonctionnalité dans la branche principale

```bash 
git checkout main # Vérifier si vous êtes dans la branche principale (main)
git merge nom_de_votre_branche # Fusionner la branche de fonctionnalité dans la branche principale
```

## Préparation d'environnement

### Installation NPM pour télécharger les dépendences

```bash 
npm install
```
