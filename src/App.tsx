import Login from './components/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="/login" element={<Login/>} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
