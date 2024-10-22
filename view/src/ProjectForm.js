import React from 'react';
import './ProjectForm.css'; // Import the CSS file

const ProjectForm = () => {
    // Hard-coded values
    const projectData = {
        name: "Helping Hands Charity",
        description: "We aim to provide support and resources to underprivileged communities.",
        expectedMoneyRise: 50000,
        actualMoneyRise: 30000,
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        status: "active"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Project Data Submitted:', projectData);
    };

    return (
        <div className="project-form-container">
            <h2>Project Form</h2>
            <form onSubmit={handleSubmit} className="project-form">
                <div className="form-group">
                    <label htmlFor="name">Project Name:</label>
                    <input type="text" id="name" value={projectData.name} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={projectData.description} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="expectedMoneyRise">Money Goal:</label>
                    <input type="number" id="expectedMoneyRise" value={projectData.expectedMoneyRise} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="actualMoneyRise">Money Reached:</label>
                    <input type="number" id="actualMoneyRise" value={projectData.actualMoneyRise} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" id="startDate" value={projectData.startDate} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" id="endDate" value={projectData.endDate} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" value={projectData.status} readOnly>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default ProjectForm;

