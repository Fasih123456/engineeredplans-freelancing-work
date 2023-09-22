//CSS imports
import "./App.css";

//Library imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//Component Imports
import Login from "./Pages/Login";
import EmployeeManagement from "./Pages/Admin/EmployeeManagement";
import EmployeeTimeTracking from "./Pages/EmployeeTimeTracking";
import ProjectManagement from "./Pages/Admin/ProjectManagement";
import Projects from "./Pages/Projects";

//TODO: Force react app to send you to login page if you dont have valid token
function App() {
	const token = localStorage.getItem("token");

	return (
		<>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<BrowserRouter>
				<Routes>
					{token ? (
						<>
							<Route
								path="/"
								element={<EmployeeTimeTracking />}
							/>
							<Route
								path="/projectmanage"
								element={<ProjectManagement />}
							/>
							<Route
								path="/employeemanage"
								element={<EmployeeManagement />}
							/>
							<Route path="/projects" element={<Projects />} />
						</>
					) : (
						<Route path="*" element={<Navigate to="/login" />} />
					)}
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
