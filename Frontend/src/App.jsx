import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import TextEditor from "./components/TextEditor/TextEditor"
import Home from "./components/Home/Home"
import { v4 as uuidV4 } from "uuid"
import Login from "@/components/Auth/Login"
import SignUp from "@/components/Auth/SignUp"
import DashBoard from "@/components/DashBoard/DashBoard"
import { UserProvider, useUser } from './UserContext.jsx'

function RedirectToNewDocument() {
  const id = React.useMemo(() => uuidV4(), []);
  return <Navigate to={`/document/${id}`} replace />;
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/document" element={<RedirectToNewDocument />} />
          <Route path="/document/:id" element={<TextEditor />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
