import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import burgerImage from "../assets/bars-solid.svg";

function Header() {
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
							<Nav.Link href="/login" onClick={logout()}>
								Logout
							</Nav.Link>
							<Nav.Link href="/projects">Projects</Nav.Link>
							<Nav.Link href="/employeemanage">
								Employee Management
							</Nav.Link>
							<Nav.Link href="/projectmanage">
								Project Management
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
