import { getAuth } from "firebase/auth";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Project from "./pages/Project";

function IsAuthed() {
  const auth = getAuth();
  if (auth.currentUser) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}

function IsNotAuthed() {
  const auth = getAuth();
  if (!auth.currentUser) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

function Unkonwn() {
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<IsNotAuthed />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<IsAuthed />}>
          <Route path="/projects/:projectId" element={<Project />} />
          <Route path="/" element={<Projects />} />
        </Route>
        <Route path="*" element={<Unkonwn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
