import { Row, Col, Container, Table, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EmployeeDisplay() {
	const [employees, setEmployees] = useState([]);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState();
	const [newUserName, setNewUserName] = useState("");

	const handleClose = () => setShowEditModal(false);
	const handleShow = (employee: any) => {
		setShowEditModal(true);
		setSelectedEmployee(employee);
	};

	const handleEditSaves = async () => {
		console.log(newUserName);
		try {
			const token = localStorage.getItem("token");
			const response = await axios.put(
				`http://localhost:3001/employees/${selectedEmployee.employeeId}`,
				{
					username: newUserName,
					employeeId: selectedEmployee.employeeId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Employee updated:", response.data);
			setShowEditModal(false);
			setNewUserName("");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		axios
			.get("http://localhost:3001/employees", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setEmployees(response.data);
			})
			.then(() => {
				console.log(employees);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleDeleteEmployee = async (employeeId) => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.delete(
				`http://localhost:3001/employees/${employeeId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Employee deleted:", response.data);
			setEmployees(
				employees.filter(
					(employee) => employee.employeeId !== employeeId
				)
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Table className="employee-table">
				<thead>
					<tr>
						<th>Employee Name</th>
						<th>Hours Tracked</th>
						<th>Hours Per Week</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee, index) => (
						<tr key={index}>
							<td>{employee.name}</td>
							<td>0</td>
							<td>0</td>
							<td>
								<i
									className="fa-solid fa-trash fa-icon"
									onClick={() =>
										handleDeleteEmployee(
											employee.employeeId
										)
									}
								></i>
								<i
									className="fa-solid fa-pen-to-square fa-icon"
									onClick={() => handleShow(employee)}
								></i>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={showEditModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlInput1"
						>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="email"
								value={newUserName ? newUserName : ""}
								placeholder={selectedEmployee?.name}
								onChange={(e) => {
									setNewUserName(e.target.value);
								}}
								autoFocus
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleEditSaves}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default EmployeeDisplay;
