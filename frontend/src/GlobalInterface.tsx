export interface PrivilegeInterface {
	employeeId: string;
	permissionId: string;
	permissionType: "admin" | "user";
}

export interface ProjectInterface {
	projectId: number;
	project_name: string;
	employeeIds: string;
}

export interface TaskInterface {
	taskId: string;
	employeeId: string;
	projectId: string;
	date: string;
	time: number;
}

export interface EmployeeInterface {
	employeeId: string;
	name: string;
}
