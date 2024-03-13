import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Homepage from './pages/HomePage';

function App() {
 
  return (
    <div className={`bg-gray-700 min-h-[100vh] flex`}>
      <Routes>
        <Route path="/" element={ <Homepage />} />
        <Route path="/chats" element={<Home />} />

        {/* Bulunamayan sayfalar için yönlendirme */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

