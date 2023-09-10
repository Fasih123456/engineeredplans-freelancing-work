import { Container, Row, Col } from "react-bootstrap";

function Menu() {
	return (
		<Container className="menu-left">
			<div className="each-menu-section">
				<h2 className="menu-section-heading">Manage</h2>
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
			<div className="each-menu-section">
				<h2 className="menu-section-heading">Admin Panel</h2>
				<Row className="each-menu-row">
					<Col>
						<i className="fa-solid fa-dollar-sign fa-icon"></i>{" "}
						<a href="#" className="menu-link">
							Project Management
						</a>
					</Col>
				</Row>
				<Row className="each-menu-row">
					<Col>
						<i className="fa-solid fa-user fa-icon"></i>{" "}
						<a href="#" className="menu-link">
							Employee Management
						</a>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default Menu;
