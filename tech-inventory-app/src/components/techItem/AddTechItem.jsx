// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import TechDataService from '../../services/TechDataService';
import { Link } from 'react-router-dom';

function AddTechItem() {
  const [techItem, setTechItem] = useState({
    techType: '',
    techName: '',
    amount: 0
  });
  const [submitted, setSubmitted] = useState(false);

  const saveTechItem = (e) => {
    e.preventDefault();
    const data = {
      techType: techItem.techType,
      techName: techItem.techName,
      amount: techItem.amount
    };

    TechDataService.create(data)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          setSubmitted(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const newTechItem = () => {
    setSubmitted(false);
    setTechItem({ techType: '', techName: '', amount: 0 });
  };

  return (
    <div className="form-container">
      {!submitted ? (
        <form onSubmit={saveTechItem}>
          <div className="form-header">
            <h4>New Tech Item</h4>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="font-weight-bolder">Tech Information</h5>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <label className="form-label">Tech Type</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={techItem.techType}
                    onChange={(e) => setTechItem({ ...techItem, techType: e.target.value })}
                    name="techType"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Tech Name</label>
                  <input
                    className="form-input"
                    required
                    value={techItem.techName}
                    onChange={(e) => setTechItem({ ...techItem, techName: e.target.value })}
                    name="techName"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label htmlFor="amount">Amount</label>
                  <input
                    className="form-input"
                    type="number"
                    required
                    value={techItem.amount}
                    onChange={(e) => setTechItem({ ...techItem, amount: e.target.value })}
                    name="amount"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="form-submit-button">Save</button>
          </div>
          <div className="text-right">
            <button className='cancel-button'><Link to="/tech-list" style={{ textDecoration: 'none' }} className='link-text'>Cancel</Link></button>
          </div>
        </form>
      ) : (
        <div className="success-message">
          <h4>You submitted successfully!</h4>
          <button className="add-another-button" onClick={newTechItem}>Add Another</button>
          <button><Link to="/tech-list" style={{ textDecoration: 'none' }} className='link-text'>Back to List</Link></button>
        </div>
      )}
    </div>
  );
}

export default AddTechItem;
