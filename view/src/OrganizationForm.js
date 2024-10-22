// OrganizationForm.js
import React from 'react';
import './OrganizationForm.css'; // Import the CSS file

const OrganizationForm = () => {
    // Hard-coded values for the organization
    const organizationData = {
        name: "Helping Hands Charity",
        description: "We aim to provide support and resources to underprivileged communities."
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Organization Data Submitted:', organizationData);
    };

    return (
        <div className="organization-form-container">
            <h2>Organization Form</h2>
            <form onSubmit={handleSubmit} className="organization-form">
                <div className="form-group">
                    <label htmlFor="name">Organization Name:</label>
                    <input type="text" id="name" value={organizationData.name} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={organizationData.description} readOnly />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default OrganizationForm;

