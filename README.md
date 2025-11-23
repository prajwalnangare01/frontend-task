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
<<<<<<< HEAD

## Patch Changes (Nov 22–23)
- Added SSR middleware protection for /dashboard
- Added 300–500ms skeleton loading delay for KPIs
- Updated deploy URL
- Improved UI/UX responsiveness and accessibility
=======
<<<<<<< HEAD
-   `src/store`: Contains the state management logic using Zustand.
    -   `src/store/auth.ts`: The authentication store.
=======
    -   `src/lib/jwt.ts`: JWT token generation and verification utilities.
-   `src/store`: Contains the state management logic using Zustand.
    -   `src/store/auth.ts`: The authentication store.
-   `src/app/api`: Contains API route handlers.
    -   `src/app/api/auth/login/route.ts`: Login endpoint that generates JWT and sets httpOnly cookie.
    -   `src/app/api/auth/logout/route.ts`: Logout endpoint that clears authentication cookie.
    -   `src/app/api/auth/verify/route.ts`: Verification endpoint to check authentication status.
-   `middleware.ts`: Next.js middleware for server-side route protection.
>>>>>>> 22e67dc (done)

## Tradeoffs

-   **Route Groups:** The use of route groups `(app)` and `(auth)` allows for different layouts for different parts of the application without affecting the URL structure. This is a good practice for separating public and private sections of an application.
-   **State Management:** Zustand is used for state management. It's a lightweight and simple solution, which is a good choice for a project of this size. For a larger application, a more robust solution like Redux or MobX might be considered.
-   **Styling:** The project uses Tailwind CSS for styling, which allows for rapid UI development. The `shadcn/ui` components are used as a base, which provides a good set of accessible and customizable components.

## Patch Changes

### 24-hour Patch Updates

1. **Protected Route (SSR)**: Implemented server-side redirect for `/dashboard` route. Unauthenticated users are now redirected to `/login` using Next.js middleware, ensuring protection at the server level before any client-side code executes.

2. **Skeleton Loading**: Updated skeleton loading time from 1500ms to 400ms (within the 300-500ms requirement) for a faster perceived loading experience on the dashboard KPIs.

3. **JWT Authentication with httpOnly Cookies**: Implemented a production-ready authentication system using JWT tokens stored in httpOnly cookies. This provides:
   - **Security**: Tokens are stored in httpOnly cookies, preventing XSS attacks
   - **Server-side validation**: Middleware validates JWT tokens before allowing access
   - **API routes**: `/api/auth/login`, `/api/auth/logout`, and `/api/auth/verify` handle authentication
   - **Token expiration**: JWT tokens expire after 24 hours
   - **Automatic cleanup**: Invalid/expired tokens are automatically cleared

### Authentication Flow

- **Login**: User credentials are validated server-side, JWT token is generated and stored in httpOnly cookie
- **Protected Routes**: Middleware validates JWT token before allowing access to `/dashboard`
- **Logout**: httpOnly cookie is cleared server-side
- **State Sync**: Client-side Zustand store syncs with server authentication status on app load

### Environment Variables

For production, set the following environment variable:
```
JWT_SECRET=your-secret-key-minimum-32-characters-long
```

If not set, a default secret is used (not recommended for production).

### Deploy URL

[[Add your latest deploy URL here]](https://frontend-task-seven-mauve.vercel.app/login)



>>>>>>> 451689dd034250e99ab690166c87f1a66b2a3c2a
