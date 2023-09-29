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

interface Privilege {
	type: "admin" | "user";
}

//TODO: The privilege state is not setting properly
function App() {
	const [privilege, setPrivilege] = useState<Privilege>({ type: "user" });
	const token = localStorage.getItem("token");

	useEffect(() => {
		serverRequest({
			method: "get",
			url: `permission/${localStorage.getItem("employeeId")}`,
		}).then((response) => {
			//console.log(response.data[0]);
			setPrivilege({
				type: response.data[0].permissionType,
			});

			//console.log(privilege.type);
			localStorage.setItem("permissionType", privilege.type);
			//console.log(localStorage.getItem("permissionType"));
		});
	}, []);

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
