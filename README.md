# EtudeCas-Culturelive
Étude de cas Backend Engineer - Alternance Culturelive


# Résumé des étapes pour afficher l'exercice

## Étapes suivies

1. **Analyse de l'email et du lien fourni** :
   - J'ai reçu un lien vers un site Web (`https://djob-website-test.nw.r.appspot.com`) contenant un exercice caché.
   - Le lien indiquait qu’il fallait utiliser nos compétences de recherche et d’analyse pour récupérer l'exercice.

2. **Inspection de la page Web** :
   - Utilisation des **outils de développement du navigateur** pour inspecter le contenu de la page :
     - Analyse du code source HTML et des commentaires.
     - Exploration des fichiers liés, comme les fichiers JavaScript et CSS.
   - Découverte d’un **jeton encodé (JWT)** dans un commentaire HTML.

3. **Décodage du jeton JWT** :
   - Utilisation d’un script Python pour décoder le contenu du jeton en **base64**.
   - Résultat du décodage :
     - Un message contenant un **code d'accès** : `934b1ee5-4c73-4d3d-93b9-3ccbbf964e9d`.
     - Une indication que ce code devait être utilisé comme paramètre pour afficher l'exercice.

4. **Exploration et test des endpoints** :
   - Test de l'URL avec le code d'accès en tant que **paramètre GET** (`?code=...`) dans le navigateur et Postman.
   - Aucune réponse significative obtenue dans un premier temps.

5. **Ajout des headers nécessaires** :
   - Inspection des **requêtes réseau** dans le navigateur pour analyser les headers utilisés par le site.
   - Ajout des headers requis, notamment :
     - `Authorization: Bearer YOUR_TOKEN`
     - `Content-Type: application/json`
   - Utilisation de Postman pour envoyer une requête avec ces headers.

6. **Affichage de l'exercice** :
   - Après avoir correctement configuré la requête (URL, paramètres et headers), le serveur a répondu avec le contenu de l'exercice.

---

## Points techniques clés utilisés

- **Outils de développement navigateur** :
- **Network Tab** pour examiner les requêtes envoyées et les headers nécessaires.
- **Sources Tab** pour explorer les fichiers JavaScript.
- **Postman** pour simuler des requêtes HTTP.
- **Python** pour décoder un JWT et extraire les informations importantes.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# Film Rental Application

## Description

Cette application gère un système de location de films. Elle permet aux utilisateurs (clients) de louer des films tout en offrant une gestion automatisée des notifications de rappel pour éviter les retards. L'application est construite avec **NestJS** et utilise **PostgreSQL** comme base de données pour stocker les informations liées aux clients, aux films et aux locations.

Une documentation complète de l'API est disponible grâce à **Swagger** à l'adresse suivante :  
**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

---

## Fonctionnalités

### Gestion des Clients
- **Ajouter** un nouveau client.
- **Modifier** les informations d'un client.
- **Lister** tous les clients ou effectuer des recherches avec des filtres.

### Gestion des Films
- **Ajouter** un nouveau film au catalogue.
- **Modifier** les détails d'un film.
- **Lister** tous les films ou effectuer des recherches par titre, langue ou année de sortie.
- **Supprimer** un film.

### Gestion des Locations
- **Effectuer une nouvelle location** pour un client.
- **Lister** toutes les locations ou filtrer par client ou date.
- **Recevoir des rappels automatiques** par email avant la date de retour (J-5 et J-3).

### Gestion des Tâches Planifiées
- **Lister** toutes les tâches planifiées (J-5 et J-3).
- **Lancer manuellement** une tâche planifiée.
- **Vérifier l’état** d’une tâche planifiée.

---

## Architecture Technique

### Base de Données

L'application utilise une base de données PostgreSQL avec un schéma basé sur **Sakila**, mais **modifié** pour répondre aux besoins spécifiques de l'application. Ce schéma garantit une gestion fiable des données pour les clients, les films et les locations, tout en intégrant des champs supplémentaires tels que les fuseaux horaires nécessaires aux rappels.

Les entités principales incluent :
- **Customer** : Gère les informations des clients.
- **Film** : Stocke les détails des films disponibles à la location.
- **Rental** : Enregistre les informations relatives aux locations effectuées.

#### Ressources Fournies
Dans le fichier ZIP, vous trouverez :
1. **Schéma de la base de données** :
   - Le fichier `db/schema.sql` contient la définition complète des tables et relations utilisées dans cette application.
   - Cela inclut les entités **Customer**, **Film** et **Rental**, adaptées aux fonctionnalités de l'application.

2. **Données initiales** :
   - Le fichier `db/data.sql` contient des données de test prêtes à l'emploi pour un fonctionnement optimal de l'application (exemple : clients, films, locations).

### Prérequis Techniques

1. **Base de Données PostgreSQL** :
   - Installer la base de données "Sakila" et charger le schéma ainsi que les données initiales.

2. **NestJS** :
   - Initialiser un projet avec les modules nécessaires :
     - **Customer** : Pour gérer les clients.
     - **Film** : Pour gérer les films.
     - **Rental** : Pour gérer les locations.

3. **Tâches Planifiées** :
   - Une tâche à **J-5** pour envoyer un rappel au client cinq jours avant la date de retour.
   - Une tâche à **J-3** pour envoyer un rappel trois jours avant la date de retour.
   - Ces tâches utilisent le package `@nestjs/schedule`.

4. **Simulations d’email** :
   - Les envois d’emails sont simulés par des **logs** pour simplifier les tests.

---

## Installation

### Prérequis
- **Node.js** : Version >= 16.
- **PostgreSQL** : Version >= 13.
- **npm** : Version >= 8.

### Étapes d'installation

1. **Créer la base de données** :
   - Dans PostgreSQL, créez une base de données nommée `sakila` :
     ```bash
     CREATE DATABASE sakila;
     ```

2. **Charger le schéma** :
   - Importez le fichier `schema.sql` dans la base de données :
     ```bash
     psql -U postgres -d sakila -f db/schema.sql
     ```

3. **Insérer les données** :
   - Importez les données initiales avec le fichier `data.sql` :
     ```bash
     psql -U postgres -d sakila -f db/data.sql

1. **Télécharger les ressources** :
   - Téléchargez le fichier ZIP contenant le projet et ses ressources (code source, fichiers de configuration, schéma de base de données, etc.).

2. **Extraire le fichier ZIP** :
   - Décompressez le fichier ZIP dans un répertoire de votre choix.
   - Exemple :
     ```bash
     unzip film-rental-resources.zip -d film-rental
     cd film-rental
     ```

3. **Installer les dépendances** :
   - À la racine du projet extrait, exécutez :
     ```bash
     npm install
     ```

4. **Configurer l’environnement** :
   - Un fichier `.env.example` est fourni dans le ZIP.
   - Copiez ce fichier et renommez-le `.env` :
     ```bash
     cp .env.example .env
     ```
   - Modifiez les variables d'environnement dans le fichier `.env` si nécessaire :
     ```
     DATABASE_HOST=localhost
     DATABASE_PORT=5432
     DATABASE_USERNAME=postgres
     DATABASE_PASSWORD=VotreMotDePasse
     DATABASE_NAME=sakila
     ```

6. **Lancer l’application** :
   - Démarrez le serveur avec la commande :
     ```bash
     npm run start:dev
     ```

7. **Accéder à la documentation Swagger** :
   - Ouvrez votre navigateur et accédez à [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

---

## Points Clés de l’Application

### Documentation API avec Swagger
La documentation Swagger offre une interface conviviale pour tester et comprendre l’API. Vous pouvez y consulter :
- Les descriptions détaillées des endpoints.
- Les modèles de requêtes et réponses.
- Les codes de statut pour chaque opération.

### Notifications Automatiques
Les tâches planifiées utilisent `@nestjs/schedule` pour envoyer automatiquement des rappels aux clients avant la date de retour des films.

---

## Bonnes Pratiques et Conseils

- **Modifications autorisées** : Vous pouvez adapter le schéma Sakila pour répondre aux besoins spécifiques.
- **Synchronisation** : Gardez `synchronize` désactivé en production pour éviter des altérations inattendues dans la base de données.
- **Logs SQL** : Les logs de requêtes SQL sont activés pour simplifier le débogage.

---

## Contact

**Email** : ma.elouahbi@gmail.com  

