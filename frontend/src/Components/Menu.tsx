//Library imports
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { serverRequest } from "../GlobalFunctions";

function Menu() {
	const [privilege, setPrivilege] = useState("");
	const userId = localStorage.getItem("employeeId");

	useEffect(() => {
		serverRequest({
			method: "get",
			url: `permission/${userId}`,
		}).then((response) => {
			setPrivilege(response.data[0].permissionType);
		});
	}, []);

	return (
		<Container className="menu-left">
			<div className="each-menu-section">
				<h2 className="menu-section-heading">Your Pages</h2>
				<Row className="each-menu-row">
					<Col>
						<i className="fa-solid fa-clock fa-icon"></i>
						<a href="/" className="menu-link">
							TIME TRACKER
						</a>
					</Col>
				</Row>
				<Row className="each-menu-row">
					<Col>
						<i className="fa-solid fa-building fa-icon"></i>{" "}
						<a href="/projects" className="menu-link">
							Your Projects
						</a>
					</Col>
				</Row>
			</div>

			{privilege == "admin" && (
				<div className="each-menu-section">
					<h2 className="menu-section-heading">Admin Panel</h2>
					<Row className="each-menu-row">
						<Col>
							<i className="fa-solid fa-dollar-sign fa-icon"></i>
							<a href="/projectmanage" className="menu-link">
								Project Management
							</a>
						</Col>
					</Row>
					<Row className="each-menu-row">
						<Col>
							<i className="fa-solid fa-user fa-icon"></i>
							<a href="/employeemanage" className="menu-link">
								Employee Management
							</a>
						</Col>
					</Row>
				</div>
			)}

			<Row>
				<Col className="logout-col">
					<i className="fa-solid fa-right-from-bracket fa-icon"></i>
					<a
						href="/"
						className="menu-link"
						id="logout-link"
						onClick={() => {
							localStorage.removeItem("token");
							localStorage.removeItem("username");
							localStorage.removeItem("employeeId");
						}}
					>
						Logout
					</a>
				</Col>
			</Row>
		</Container>
	);
}

export default Menu;
