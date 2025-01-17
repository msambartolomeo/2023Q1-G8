import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import MainLayout from "./LayOut/MainLayout";
import DoctorPage from "./pages/DoctorPage";
import FileReader from "./pages/FileReader";
import PageNotFound from "./pages/404Page";
import CallBackPage from "./pages/CallbackPage";
import NotPermitedPage from "./pages/401Page";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/callback" element={<CallBackPage role={"pacient"}/>}/>
          <Route path="/doctor/callback" element={<CallBackPage role={"doctor"} />}/>
          <Route path="/doctor/pacients" element={<DoctorPage />} />
          <Route path="/history/:pacientEmail?" element={<FileReader />} />
          <Route path="401" element={<NotPermitedPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
