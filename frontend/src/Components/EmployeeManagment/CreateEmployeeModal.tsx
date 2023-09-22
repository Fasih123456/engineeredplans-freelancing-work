//React imports
import { useState } from "react";

//Library Imports
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreateEmployeeModalProps {
	show: boolean;
	onHide: () => void;
	onCreateEmployee: (employeeData: {
		name: string;
		password: string;
	}) => void;
}

//TODO: Add option to set projects in this section
function CreateEmployeeModal({
	show,
	onHide,
	onCreateEmployee,
}: CreateEmployeeModalProps) {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleCreateClick = () => {
		if (!name || !password) {
			toast.error("Please enter a name and password");
			return;
		}

		if (password.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}

		if (name.length < 3) {
			toast.error("Name must be at least 3 characters long");
			return;
		}

		if (name === password) {
			toast.error("Name and password cannot be the same");
			return;
		}

		if (name.toLowerCase() === "admin") {
			toast.error("Name cannot be admin");
			return;
		}

		const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
		const numbers = /[0-9]/g;
		const capitalLetters = /[A-Z]/g;

		if (!specialChars.test(password)) {
			toast.error("Password must contain at least one special character");
			return;
		}

		if (!numbers.test(password)) {
			toast.error("Password must contain at least one number");
			return;
		}

		if ((password.match(capitalLetters) || []).length < 2) {
			toast.error("Password must contain at least two capital letters");
			return;
		}

		toast.success(`Welcome to our Company ${name}!`);

		onCreateEmployee({ name, password });
		onHide();
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Create Employee</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
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
	);
}

export default CreateEmployeeModal;
