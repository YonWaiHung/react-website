// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import TechDataService from "../../services/TechDataService";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "../deleteModal/Modal";

// Reducer for custom tech list states
function techItemListReducer(state, action) {
  switch (action.type) {
    case 'set_tech_items':
      return{
        ...state,
        techItems: action.payload,
      };
    case 'set_current_index':
      return { 
        ...state,
        currentIndex: -1 
      };
    case 'set_tech_name':
      return{
        ...state,
        techName: action.payload,
      };
    case 'set_modal_open':
      return { 
        ...state,
        modalOpen: true 
      };
    case 'set_modal_close':
      return { 
        ...state,
        modalOpen: false 
      };
    case 'set_item_to_delete':
      return{
        ...state,
        itemToDelete: action.payload,
      };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function TechItemList() {
  // const [techItems, setTechItems] = useState([]);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [techType, setTechType] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState(null);

  const [state, dispatch] = useReducer(
    techItemListReducer, {
      techItems: [],
      currentIndex: -1,
      techType: "",
      modalOpen: false,
      itemToDelete: null
    }
  )

  useEffect(() => {
    retrieveTechItems();
  }, []);

  const retrieveTechItems = () => {
    TechDataService.getAll()
      .then(response => {
        // setTechItems(response.data);
        dispatch({
          type: 'set_tech_items',
          payload: response.data,
        })
      })
      .catch(error => {
        console.log(error);
      });
  };

  const refreshList = () => {
    retrieveTechItems();
    // setCurrentIndex(-1);
    dispatch({ type: 'set_current_index' })
  };

  const searchTechName = () => {
    TechDataService.findByTechName(state.techName)
      .then(response => {
        console.log(response.data);
        // setTechItems(response.data);
        dispatch({
          type: 'set_tech_items',
          payload: response.data,
        })
      })
      .catch(error => {
        console.log(error);
      });
  };

  // const onEditButton = (techItem) => {
  //   setCurrentTechItem(techItem);
  //   console.log(techItem);
  //   // Navigate to tech item details page
  // };

  const onDeleteButton = (techItem) => {
    // Assign selected tech item data to itemToDelete state
    // setItemToDelete(techItem);
    dispatch({
      type: 'set_item_to_delete',
      payload: techItem,
    })
    // set isModalOpen state to true, effectively opening the modal
    // setIsModalOpen(true);
    dispatch({ type: 'set_modal_open' })
  };

  // Delete selected data row from the database & refresh the list to reflect the changes
  const handleConfirmDelete = () => {
    TechDataService.delete(state.itemToDelete.id)
      .then(response => {
        console.log(response);
        // setIsModalOpen(false);
        dispatch({ type: 'set_modal_close' })
        refreshList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="list">
      <div>
        <div className="search-input-group">
          <input 
            type="text" 
            placeholder="Search by Tech Name" 
            value={state.techName} 
            onChange={(e) => 
            // setTechType(e.target.value)
            dispatch ({
              type: 'set_tech_name',
              payload: e.target.value,
            })} />
          <div>
            <button className="btn btn-outline-secondary" type="button" onClick={searchTechName}>Search</button>
          </div>
        </div>
      </div>
      <div>
        <div className="card-header">
            <h2>Tech Items</h2>
          <Link to="/tech-list/add" style={{ textDecoration: 'none' }} className='link-text'><button>Register New Tech</button></Link>
        </div>
        <div>
          <table id="datatable-basic" className="table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Type</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {state.techItems.length ? (
                state.techItems.map((techItem, index) => (
                  <tr key={index} className={index === state.currentIndex ? "active" : ""}>
                    <td >
                      <Link to={`/techItems/${techItem.id}`} style={{ textDecoration: 'none' }}><MdEdit /></Link>
                      {/* When clicked, trigger onDeleteButton function */}
                      <MdDelete onClick={() => onDeleteButton(techItem)} />
                    </td>
                    <td>{techItem.techType}</td>
                    <td>{techItem.techName}</td>
                    <td>{techItem.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className='emptyListTextRow'>No data present in the list...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        // For verifying the delete modal is desired to be opened
        isOpen={state.modalOpen}
        // If called, turn isModalOpen state to false, effectively closing Modal
        onClose={() => 
          // setIsModalOpen(false)
          dispatch ({ type: 'set_modal_close' })
        }
        // If called, trigger handleConfirmDelete function
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default TechItemList;
