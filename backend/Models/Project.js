class Project {
	constructor(projectId, project_name) {
		this.projectId = projectId; //TODO: will be a randomly generated number
		this.project_name = project_name;
		this.employees = [];
	}

	addEmployee(employee) {
		this.employees.push(employee);
	}
}

module.exports = Project;
