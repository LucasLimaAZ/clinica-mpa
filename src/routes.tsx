import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./protected-route";
import NewPatientPage from "./pages/NewPatientPage";
import PatientsPage from "./pages/PatientsPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import { createMemoryRouter } from "react-router-dom";
import MessagesPage from "./pages/MessagesPage";
import MedicationsPage from "./pages/MedicationsPage";

export const router = createMemoryRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/novo-paciente",
    element: (
      <ProtectedRoute>
        <NewPatientPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pacientes",
    element: (
      <ProtectedRoute>
        <PatientsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/receitas",
    element: (
      <ProtectedRoute>
        <PrescriptionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recados",
    element: (
      <ProtectedRoute>
        <MessagesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/remedios",
    element: (
      <ProtectedRoute>
        <MedicationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
