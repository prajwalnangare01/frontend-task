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

## Patch Changes (Nov 22–23)
- Added SSR middleware protection for /dashboard
- Added 300–500ms skeleton loading delay for KPIs
- Updated deploy URL
- Improved UI/UX responsiveness and accessibility
