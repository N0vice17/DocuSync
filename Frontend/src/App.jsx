import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import TextEditor from "./components/TextEditor"
import Home from "./components/Home/Home"
import { v4 as uuidV4 } from "uuid"

function RedirectToNewDocument() {
  const id = React.useMemo(() => uuidV4(), []);
  return <Navigate to={`/document/${id}`} replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<RedirectToNewDocument />} />
        <Route path="/document/:id" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}
