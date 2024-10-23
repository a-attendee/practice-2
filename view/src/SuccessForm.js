import React from 'react'
import './SuccessForm.css'

const SuccessForm = () => {
  return (
    <div className="authorization-message-container">
      <h2>Authorization Status</h2>
      <form className="authorization-message-form">
        <div className="form-group">
          <input type="text" value="Successfully authorized" readOnly />
        </div>
      </form>
    </div>
  );
};

export default SuccessForm;

