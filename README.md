# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Project Name: MovieFlix

## Project Description: 

Movieflix is movie library app that allows users to search for movies, view movie details, add to watchlist and mark watched.

## Features to imlement in future:

- implement delete account feature
- Show trailer of the movie
- Add rating feature for users
- Remove rating feature for users
- Add ad banners
- Add in-app purchases to remove ads



## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up Appwrite Project, Authentication, and Database

   Follow these steps to configure your Appwrite backend:

   a. **Install and Run Appwrite**: Ensure you have an Appwrite instance running (e.g., via Docker). Refer to the official Appwrite documentation for installation instructions.

   b. **Create a New Project**:
      - Create a project in your Appwrite console (e.g., "MovieFlix").
      - Note `Project ID` and `Project Name` for `EXPO_PUBLIC_APPWRITE_PROJECT_ID` and `EXPO_PUBLIC_APPWRITE_PROJECT_NAME` in your `.env` file.

   c. **Add a Platform**:
      - In your project, add a "React Native" platform.
      - For "React Native", enter a `Package Name` (e.g., `com.yourcompany.movieflix`).
      - Note your Appwrite instance URL for `EXPO_PUBLIC_APPWRITE_ENDPOINT`.

   d. **Configure Authentication**:
      - Enable "Email/Password" authentication under "Auth" -> "Settings" -> "Providers".

   e. **Create a Database**:
      - Create a database (e.g., "MovieFlixDB").
      - Note the `Database ID` for `EXPO_PUBLIC_APPWRITE_DATABASE_ID`.

   f. **Create a Collection**:
      - Inside your database, create a collection (e.g., "Movies").
      - Note the `Collection ID` for `EXPO_PUBLIC_APPWRITE_COLLECTION_ID`.

   g. **Add Attributes to the Collection**:
      - Add the following attributes to the "Movies" collection:
         - `title` (String, Required)
         - `overview` (String, Required)
         - `poster_path` (String, Required)
         - `release_date` (String, Optional)
         - `vote_average` (Float, Optional)
         - `is_watched` (Boolean, Required, Default `false`)
         - `is_watchlist` (Boolean, Required, Default `false`)
         - `user_id` (String, Required)

   h. **Set Collection Permissions**:
      - Set "Create", "Read", "Update", and "Delete" document permissions for the "Users" role in the "Movies" collection. Ensure your application logic enforces ownership (users can only manage their own documents).
3. Create .env file in the root directory and add the following variables

   ```bash
   EXPO_PUBLIC_TMDB_API_KEY=
   EXPO_PUBLIC_TMDB_ACCESS_TOKEN=
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=
   EXPO_PUBLIC_APPWRITE_PROJECT_NAME=
   EXPO_PUBLIC_APPWRITE_ENDPOINT=
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=
   EXPO_PUBLIC_APPWRITE_PLATFORM=
   ```
4. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
