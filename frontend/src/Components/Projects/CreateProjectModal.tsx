import { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
//Interface
import { EmployeeInterface } from "../../GlobalInterface";

interface CreateProjectModalProps {
	show: boolean;
	onHide: () => void;
	onCreateProject: (projectData: {
		name: string;
		employeeIds: string[];
	}) => void;
	employees: EmployeeInterface[];
}

//TODO: a pagination system for the employees
function CreateProjectModal({
	show,
	onHide,
	onCreateProject,
	employees,
}: CreateProjectModalProps) {
	const [name, setName] = useState("");
	const [employeeIds, setEmployeeIds] = useState<string[]>([]);

	//console.log(employees);

	//When a checkbox is clicked, the corresponding employee id is added to the employeeIds state
	const handleCheckboxChange = (employeeId: string) => {
		console.log("selected " + employeeId);
		if (employeeIds.includes(employeeId)) {
			setEmployeeIds(employeeIds.filter((id) => id !== employeeId));
		} else {
			setEmployeeIds([...employeeIds, employeeId]);
		}
	};

	const renderEmployees = () => {
		const eachInstance: JSX.Element[] = [];

		for (let i = 0; i < employees.length; i++) {
			//console.log(employees[i].employeeId);

			eachInstance.push(
				<Form.Check
					key={employees[i].employeeId}
					type="checkbox"
					label={employees[i].name}
					onChange={() =>
						handleCheckboxChange(employees[i].employeeId)
					}
				/>
			);
		}

		return <>{eachInstance}</>;
	};

	const handleCreateClick = () => {
		if (!name) {
			toast.error("Please enter a name");
			return;
		}

		if (employeeIds.length === 0) {
			toast.error("Please select at least one employee");
			return;
		}

		onCreateProject({ name, employeeIds });
		onHide();
	};

	return (
		<>
			<Modal show={show} onHide={onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Create Project</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="name">
							<Form.Label>Project Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter project name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Employees</Form.Label>
							{renderEmployees()}
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onHide}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleCreateClick}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default CreateProjectModal;
