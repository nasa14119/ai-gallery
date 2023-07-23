import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth.context";
import { ThemeProvider } from "./context/theme.context";
import Dashboard from "./pages/Dashboard";
import {AddImage} from "./pages/Dashboard/AddImage"
import ProtectedRoute from "./pages/ProtectedRoute";
import AlReadyLogin from "./pages/AlReadyLogin";
import { DashboardContainer } from "./pages/Dashboard/DashboardContainer";
import { Edit } from "./pages/Dashboard/Edit";
import { Settings } from "./pages/Settings";
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AlReadyLogin />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardContainer/>}>
              <Route index element={<Dashboard />} />
              <Route path="add-image" element={<AddImage />}/>
              <Route path="edit/:id" element={<Edit />}/>
            </Route>
            <Route path="/settings" element={<Settings/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
