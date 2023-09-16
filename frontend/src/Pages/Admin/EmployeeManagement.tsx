import EmployeeDisplay from "../../Components/EmployeeDisplay";
import Header from "../../Components/Header";
import Menu from "../../Components/Menu";
import CreateEmployeeModal from "../../Components/EmployeeManagment/CreateEmployeeModal";

import { Row, Col, Container, Table, Button } from "react-bootstrap";

import axios from "axios";

import React, { useState } from "react";
function EmployeeManagement() {
	const [showCreateEmployeeModal, setShowCreateEmployeeModal] =
		useState(false);

	const handleCreateEmployee = async (employeeData: {
		name: string;
		password: string;
	}) => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				"http://localhost:3001/employees",
				employeeData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Employee created:", response.data);
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
			{/* Render the CreateEmployeeModal */}
			<CreateEmployeeModal
				show={showCreateEmployeeModal}
				onHide={() => setShowCreateEmployeeModal(false)}
				onCreateEmployee={handleCreateEmployee}
			/>
		</>
	);
}

export default EmployeeManagement;
