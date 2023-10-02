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

import { serverRequest } from "./GlobalFunctions";
import { useEffect, useState } from "react";

function App() {
	const [privilege, setPrivilege] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		serverRequest({
			method: "get",
			url: `permission/${localStorage.getItem("employeeId")}`,
		}).then((response) => {
			//console.log(response.data[0].permissionType);
			setPrivilege(response.data[0].permissionType);

			//console.log(privilege);
			localStorage.setItem("permissionType", privilege);
			//console.log(localStorage.getItem("permissionType"));
		});
	}, []);

	return (
		<>
			<ToastContainer
				position="top-left"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
				pauseOnHover
				theme="dark"
			/>
			<BrowserRouter>
				<Routes>
					{token ? (
						<>
							<Route
								path="/"
								element={
									<EmployeeTimeTracking plevel={privilege} />
								}
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
