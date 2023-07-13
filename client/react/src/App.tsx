import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./LayOut/MainLayout";
import DoctorPage from "./pages/DoctorPage";
import FileReader from "./pages/FileReader";
import PageNotFound from "./pages/404Page";
import CallBackPage from "./pages/CallbackPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/callback" element={<CallBackPage/>}/>
          <Route path="/doctor/pacients" element={<DoctorPage />} />
          <Route path="/history" element={<FileReader />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
