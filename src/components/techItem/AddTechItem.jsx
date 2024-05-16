// eslint-disable-next-line no-unused-vars
import React, { useState, useReducer } from 'react';
import TechDataService from '../../services/TechDataService';
import { Link } from 'react-router-dom';

// Reducer for custom tech registration states
function addTechItemReducer(state, action) {
  switch (action.type) {
    case 'set_tech_item':
      return { techItem: action.payload };
    case 'complete_submission':
      return { submitted: true };
      case 'new_submission':
      return { submitted: false };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function AddTechItem() {
  // const [techItem, setTechItem] = useState({
  //   techType: '',
  //   techName: '',
  //   amount: 0
  // });
  // const [submitted, setSubmitted] = useState(false);

  const [state, dispatch] = useReducer(
    addTechItemReducer, {
    techItem: {
      techType: '',
      techName: '',
      amount: ''
    },
    submitted: false,
  }
  )

  const saveTechItem = (e) => {
    e.preventDefault();
    const data = {
      techType: state.techItem.techType,
      techName: state.techItem.techName,
      amount: state.techItem.amount
    };

    TechDataService.create(data)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          // setSubmitted(true);
          dispatch ({ type: 'complete_submission' })
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const newTechItem = () => {
    // setSubmitted(false);
    dispatch ({ type: 'new_submission' });
    // setTechItem({ techType: '', techName: '', amount: 0 });
    dispatch ({ type: 'set_tech_item', payload: { techType: '', techName: '', amount: 0 } })
  };

  return (
    <div className="form-container">
      {!state.submitted ? (
        <>
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
                    value={state.techItem.techType}
                    onChange={(e) => 
                      // setTechItem({ ...techItem, techType: e.target.value })
                      dispatch ({ 
                        type: 'set_tech_item', 
                        payload: { ...state.techItem, techType: e.target.value } 
                      })
                    }
                    name="techType"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Tech Name</label>
                  <input
                    className="form-input"
                    required
                    value={state.techItem.techName}
                    onChange={(e) => 
                      // setTechItem({ ...techItem, techName: e.target.value })
                      dispatch ({ 
                        type: 'set_tech_item', 
                        payload: { ...state.techItem, techName: e.target.value } 
                      })
                    }
                    name="techName"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label htmlFor="amount">Amount</label>
                  <input
                    className="form-input"
                    type="number"
                    required
                    value={state.techItem.amount}
                    onChange={(e) => 
                      // setTechItem({ ...techItem, amount: e.target.value })
                      dispatch ({ 
                        type: 'set_tech_item', 
                        payload: { ...state.techItem, amount: e.target.value } 
                      })
                    }
                    name="amount"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="form-submit-button">Save</button>
          </div>
        </form>
        <div className="text-right">
        <Link to="/tech-list" style={{ textDecoration: 'none' }} className='link-text'><button className='cancel-button'>Cancel</button></Link>
      </div>
      </>
      ) : (
        <div className="success-message">
          <h4>You submitted successfully!</h4>
          <button className="blue-width-button" onClick={newTechItem}>Add Another</button>
          <Link to="/tech-list" style={{ textDecoration: 'none' }} className='link-text'><button className="blue-width-button">Back to List</button></Link>
        </div>
      )}
    </div>
  );
}

export default AddTechItem;
