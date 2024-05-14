// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import TechDataService from "../../services/TechDataService";
import { Link } from 'react-router-dom';

function techItemReducer(state, action) {
  switch (action.type) {
    case 'set_current_tech_item':
      return { currentTechItem: action.payload };
    case 'set_submitted':
      return { submitted: true };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function TechItem() {
  // const [currentTechItem, setCurrentTechItem] = useState(null);
  // const [submitted, setSubmitted] = useState(false);
  // const [message, setMessage] = useState('');
  const { id } = useParams();
  // const navigate = useNavigate();

  const [state, dispatch] = useReducer(
    techItemReducer, {
      currentTechItem: null,
      submitted: false,
    }
  );

  useEffect(() => {
    getTechItem(id);
  }, [id]);

  const getTechItem = (id) => {
    TechDataService.get(id)
      .then(response => {
        // setCurrentTechItem(response.data);
        dispatch({
          type: 'set_current_tech_item',
          payload: response.data,
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTechItem = (e) => {
    e.preventDefault();
    TechDataService.update(state.currentTechItem.id, state.currentTechItem)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          // setSubmitted(true);
          dispatch({ type: 'set_submitted' })
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="form-container">
      {!state.submitted ? (
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
                        value={state.currentTechItem ? state.currentTechItem.techType : ''}
                        onChange={(e) =>
                          // setCurrentTechItem({ ...currentTechItem, techType: e.target.value })
                          dispatch({
                            type: 'set_current_tech_item',
                            payload: { ...state.currentTechItem, techType: e.target.value }
                          })
                        }
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label">Tech Name</label>
                      <input
                        type="text"
                        className="form-input"
                        required
                        value={state.currentTechItem ? state.currentTechItem.techName : ''}
                        onChange={(e) =>
                          // setCurrentTechItem({ ...currentTechItem, techName: e.target.value })
                          dispatch({
                            type: 'set_current_tech_item',
                            payload: { ...state.currentTechItem, techName: e.target.value }
                          })
                        }
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="amount">Amount</label>
                      <input
                        type="number"
                        className="form-input"
                        required
                        value={state.currentTechItem ? state.currentTechItem.amount : ''}
                        onChange={(e) =>
                          // setCurrentTechItem({ ...currentTechItem, amount: e.target.value })
                          dispatch({
                            type: 'set_current_tech_item',
                            payload: { ...state.currentTechItem, amount: e.target.value }
                          })
                        }
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
            <Link to="/" style={{ textDecoration: 'none' }} className='link-text'>
              <button className='cancel-button'>
                Cancel
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="success-message">
          <h4>You edited successfully!</h4>
          <Link to="/tech-list" style={{ textDecoration: 'none' }} className='link-text'><button>Back to List</button></Link>
        </div>
      )}
    </div>
  );
}

export default TechItem;
