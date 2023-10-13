//Library imports
import { Table, Form, Button, Modal } from "react-bootstrap";
//React imports
import { useState, useEffect } from "react";
import { serverRequest } from "../../GlobalFunctions";
import { toast } from "react-toastify";

//Component imports
import CreateEmployeeModal from "./CreateEmployeeModal";

//TODO: editing employee information succesfully/unsuccesfully should be given a toast
interface EmployeeModalProps {
	show: boolean;
	handleClose: () => void;
	handleEditSaves: () => void;
	selectedEmployee: {
		employeeId: number;
		name: string;
	};
	newUserName: string;
	setNewUserName: (name: string) => void;
}

function ViewEmployeeModal({
	show,
	handleClose,
	handleEditSaves,
	selectedEmployee,
	newUserName,
	setNewUserName,
}: EmployeeModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Employee Information</Modal.Title>
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
	);
}

interface Employee {
	employeeId: string;
	name: string;
}

function EmployeeDisplay() {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
	const [newUserName, setNewUserName] = useState<String>("");

	const handleClose = () => setShowEditModal(false);
	const handleShow = (employee: any) => {
		setShowEditModal(true);
		setSelectedEmployee(employee);
	};

	const handleEditSaves = async () => {
		try {
			serverRequest({
				method: "put",
				url: `employees/${selectedEmployee?.employeeId}`,
				data: {
					username: newUserName,
					employeeId: selectedEmployee?.employeeId,
				},
			}).then((response) => {
				if (response.status == 204) {
					toast.success("Employee Updated");
				} else if (response.status == 404) {
					toast.error("Server Error occurred, please contact admin");
				}
			});

			setShowEditModal(false);
			setNewUserName("");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		serverRequest({
			method: "get",
			url: "employees",
		})
			.then((response) => {
				setEmployees(
					response.data.map((employee: Employee) => ({
						employeeId: employee.employeeId,
						name: employee.name,
					}))
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleDeleteEmployee = async (employeeId: string) => {
		try {
			serverRequest({
				method: "delete",
				url: `employees/${employeeId}`,
			}).then((response) => {
				console.log(response);
				if (response.status === 204) {
					toast.success("Employee Deleted");
				} else if (response.status === 404) {
					toast.error("Server Error occurred, please contact admin");
				}
			});

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
						<th>Projects Involved</th>
						<th>Hours Tracked</th>
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
			<ViewEmployeeModal
				show={showEditModal}
				handleClose={handleClose}
				handleEditSaves={handleEditSaves}
				selectedEmployee={selectedEmployee}
				newUserName={newUserName}
				setNewUserName={setNewUserName}
			/>
		</>
	);
}

export default EmployeeDisplay;
