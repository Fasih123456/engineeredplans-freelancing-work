import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import React, { useState, useEffect } from "react";

function Header() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const logout = () => {
		//handle logout
	};

	return (
		<>
			<Navbar expand="lg" fixed={"top"} id="header">
				<Container>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						style={{
							backgroundColor: "white",
						}}
					/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link href="/">Employee Name</Nav.Link>
							{windowWidth <= 768 && (
								<>
									<Nav.Link href="/login" onClick={logout()}>
										Logout
									</Nav.Link>
									<Nav.Link href="/projects">
										Projects
									</Nav.Link>
									<Nav.Link href="/employeemanage">
										Employee Management
									</Nav.Link>
									<Nav.Link href="/projectmanage">
										Project Management
									</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
