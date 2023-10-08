//React imports
import { serverRequest } from "../../GlobalFunctions";
import { useState } from "react";

//Library imports
import { Row, Col, Container, Button } from "react-bootstrap";

//Component imports
import EmployeeDisplay from "../../Components/EmployeeManagment/EmployeeDisplay";
import Header from "../../Components/Header";
import Menu from "../../Components/Menu";
import CreateEmployeeModal from "../../Components/EmployeeManagment/CreateEmployeeModal";

//This component is the main page for the Employee Management page, it renders the employee display component. This page is for admin view and displays all employees
function EmployeeManagement() {
	const [showCreateEmployeeModal, setShowCreateEmployeeModal] =
		useState(false);

	const handleCreateEmployee = async (employeeData: {
		name: string;
		password: string;
	}) => {
		try {
			await serverRequest({
				method: "post",
				url: "employees",
				data: employeeData,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Header />
			<Container fluid>
				<Row>
					<Col xs={2}>
						<Menu />
					</Col>
					<Col xs={10}>
						<Container className="wrapper">
							<Row>
								<Col>
									<Button
										onClick={() =>
											setShowCreateEmployeeModal(true)
										}
									>
										Create Employee
									</Button>
								</Col>
							</Row>
							<Row>
								<EmployeeDisplay />
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>

			<CreateEmployeeModal
				show={showCreateEmployeeModal}
				onHide={() => setShowCreateEmployeeModal(false)}
				onCreateEmployee={handleCreateEmployee}
			/>
		</>
	);
}

export default EmployeeManagement;
