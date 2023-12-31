//Component imports

//Library imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//React imports
import { useState, useEffect } from "react";

function Header() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const username = localStorage.getItem("username");

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		localStorage.removeItem("employeeId");
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
							<Nav.Link href="/">
								{Math.random() < 0.5
									? `Hello, ${username}`
									: `Bonjour, ${username}`}
							</Nav.Link>
							{windowWidth <= 768 && (
								<>
									<Nav.Link href="/login" onClick={logout}>
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
