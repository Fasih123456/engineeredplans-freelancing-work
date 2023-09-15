import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import EmployeeManagement from "./Pages/Admin/EmployeeManagement";
import EmployeeTimeTracking from "./Pages/EmployeeTimeTracking";
import ProjectManagement from "./Pages/Admin/ProjectManagement";
import Projects from "./Pages/Projects";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<EmployeeTimeTracking />} />
					<Route
						path="/projectmanage"
						element={<ProjectManagement />}
					/>
					<Route
						path="/employeemanage"
						element={<EmployeeManagement />}
					/>
					<Route path="/projects" element={<Projects />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
