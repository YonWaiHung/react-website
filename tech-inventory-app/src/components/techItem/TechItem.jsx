// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TechDataService from "../../services/TechDataService";
import { Link } from 'react-router-dom';

function TechItem() {
  const [currentTechItem, setCurrentTechItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  // const [message, setMessage] = useState('');
  const { id } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    getTechItem(id);
  }, [id]);

  const getTechItem = (id) => {
    TechDataService.get(id)
      .then(response => {
        setCurrentTechItem(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTechItem = (e) => {
    e.preventDefault();
    TechDataService.update(currentTechItem.id, currentTechItem)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          setSubmitted(true);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="form-container">
      {!submitted ? (
        <>
        <form onSubmit={updateTechItem}>
          <div className="form-header">
            <h4>Editing Tech Item</h4>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="card">
                <h5 className="font-weight-bolder">Tech Item Information</h5>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label className="form-label">Tech Type</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={currentTechItem ? currentTechItem.techType : ''}
                      onChange={(e) => setCurrentTechItem({ ...currentTechItem, techType: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label">Tech Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={currentTechItem ? currentTechItem.techName : ''}
                      onChange={(e) => setCurrentTechItem({ ...currentTechItem, techName: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="number"
                      className="form-input"
                      required
                      value={currentTechItem ? currentTechItem.amount : ''}
                      onChange={(e) => setCurrentTechItem({ ...currentTechItem, amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="form-submit-button">
              Save
            </button>
          </div>
          
        </form>
        <div className="text-right">
        <button className='cancel-button'>
          <Link to="/" style={{ textDecoration: 'none' }} className='link-text'>
            Cancel
          </Link>
        </button>
      </div>
      </>
      ) : (
        <div className="success-message">
          <h4>You edited successfully!</h4>
          <button><Link to="/" style={{ textDecoration: 'none' }} className='link-text'>Back to List</Link></button>
        </div>
      )}
    </div>
  );
}

export default TechItem;
