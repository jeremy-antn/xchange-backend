# xchange-backend

## Préparation d'environnement

### Docker

#### Installation

https://docs.docker.com/get-docker/

#### Création d'un container avec une image mongodb

1. Vérification de la version

```bash
docker --version
```

2.

```bash
docker pull mongo
```

3.

```bash
docker run --name mongodb-container -d -p 27017:27017 mongo
```

4. Vérification du containter

```bash
docker ps
```

### Installation Nodejs

https://nodejs.org/en/download

### Installation NPM pour télécharger les dépendences

```bash
npm install
```

### Création des fichiers dans la racine du projet

- .env
