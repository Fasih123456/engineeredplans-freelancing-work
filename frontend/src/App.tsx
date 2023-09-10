import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import EmployeeManagement from "./Pages/Admin/EmployeeManagement";
import EmployeeTimeTracking from "./Pages/EmployeeTimeTracking";
import ProjectManagement from "./Pages/Admin/ProjectManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeTimeTracking />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/employee-time-tracking" element={<EmployeeTimeTracking />} />
          <Route path="/project-management" element={<ProjectManagement />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
