// Strict mode for highlighting potential issues
import { StrictMode } from "react";
// Font Awesome icons
import "@fortawesome/fontawesome-free/css/all.min.css";
// React 18 root creator
import { createRoot } from "react-dom/client";
// Router tools
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// Redux provider
import { Provider } from "react-redux";
// Redux store
import { store } from "./Store/store.js";
// Global styles
import "./index.css";
// Chart config (executes once)
import "../src/api/chartConfig.js";
// Main app wrapper
import App from "./App.jsx";
// Pages
import Home from "./Components/Home_page/Home.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Clubs from "./Components/Clubs/Clubs.jsx";
import AnimeListPage from "./Components/AnimeList/AnimeListPage.jsx";
import Sign from "./Login_Signin/Signin/Signin.jsx";
import Login from "./Login_Signin/Login/Login.jsx";
import About from "./Components/About/About.jsx";
import ReviewsPage from "./Components/Reviews/ReviewsPage.jsx";
import AnimeDetails from "./Components/Reviews/AnimeDetails.jsx";
import CreateClub from "./Components/Clubs/CreateClub.jsx";
import ClubDetails from "./Components/Clubs/ClubDetails.jsx";
import ClubChat from "./Components/Clubs/ClubChat.jsx";
import ClubPolls from "./Components/Clubs/ClubPoll.jsx";

// Context providers
import { AuthProvider } from "./Context/AuthContext.jsx";
import ProtectedRoute from "./Store/ProtectedRoute.jsx";
import { AnimeProvider } from "./Context/AnimeContext.jsx";
import { NewsProvider } from "./Context/NewsContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import { AnimeListProvider } from "./Context/AnimeListContext.jsx";
import { ClubProvider } from "./Context/ClubContext.jsx";

// Router setup
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Main layout
    children: [
      { path: "/", element: <Navigate to="/home" /> }, // Redirect root → home

      { path: "/about", element: <About /> }, // Public page

      { path: "/signin", element: <Sign /> }, // Signup
      { path: "/login", element: <Login /> }, // Login

      // Protected routes (requires auth)
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "/Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/Clubs",
        element: (
          <ProtectedRoute>
            <Clubs />
          </ProtectedRoute>
        ),
      },

      {
        path: "/clubs/create",
        element: (
          <ProtectedRoute>
            <CreateClub />
          </ProtectedRoute>
        ),
      },

      {
        path: "/clubs/:id",
        element: (
          <ProtectedRoute>
            <ClubDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "/clubs/:id/chat",
        element: (
          <ProtectedRoute>
            <ClubChat />
          </ProtectedRoute>
        ),
      },

      {
        path: "/clubs/:id/polls",
        element: (
          <ProtectedRoute>
            <ClubPolls />
          </ProtectedRoute>
        ),
      },

      {
        path: "/AnimeList",
        element: (
          <ProtectedRoute>
            <AnimeListPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/reviews",
        element: (
          <ProtectedRoute>
            <ReviewsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/anime/:id",
        element: (
          <ProtectedRoute>
            <AnimeDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// Render app to DOM
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Redux wrapper */}
    <AuthProvider>
      {/* Auth wrapper */}
      <AnimeProvider>
        {/* Anime data */}
        <NewsProvider>
          {/* News data */}
          <AnimeListProvider>
            {/* User anime list */}
            <ClubProvider>
              {/* Clubs data */}
              <RouterProvider router={router} /> {/* React Router */}
            </ClubProvider>
          </AnimeListProvider>
        </NewsProvider>
      </AnimeProvider>
    </AuthProvider>
  </Provider>
);
