# Frontend Task

This project is a Next.js application built with TypeScript. It includes a basic authentication system, a dashboard, and a set of UI components.

## Setup

1.  **Install dependencies:**
    Open a terminal in the project's root directory and run the following command to install the required dependencies:
    ```bash
    npm install
    ```

2.  **Run the development server:**
    After the installation is complete, start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project is structured as follows:

-   `src/app`: Contains the main application logic and routing.
    -   `src/app/(app)`: This is a route group for the main application pages that require authentication. It has its own layout file.
    -   `src/app/(auth)`: This is a route group for authentication-related pages.
    -   `src/app/globals.css`: Global CSS styles.
    -   `src/app/layout.tsx`: The root layout for the application.
    -   `src/app/page.tsx`: The landing page of the application.
-   `src/components`: Contains reusable UI components.
    -   `src/components/ui`: Contains UI components from `shadcn/ui`.
-   `src/hooks`: Contains custom React hooks.
-   `src/lib`: Contains utility functions.
-   `src/store`: Contains the state management logic using Zustand.
    -   `src/store/auth.ts`: The authentication store.

## Tradeoffs

-   **Route Groups:** The use of route groups `(app)` and `(auth)` allows for different layouts for different parts of the application without affecting the URL structure. This is a good practice for separating public and private sections of an application.
-   **State Management:** Zustand is used for state management. It's a lightweight and simple solution, which is a good choice for a project of this size. For a larger application, a more robust solution like Redux or MobX might be considered.
-   **Styling:** The project uses Tailwind CSS for styling, which allows for rapid UI development. The `shadcn/ui` components are used as a base, which provides a good set of accessible and customizable components.

## Stuck Log

This section is for you to document any challenges you face during the development process.

*   ...

