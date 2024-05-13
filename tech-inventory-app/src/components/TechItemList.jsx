// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TechDataService from "../services/TechDataService";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "./Modal";

function TechItemList() {
  const [techItems, setTechItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [techType, setTechType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  useEffect(() => {
    retrieveTechItems();
  }, []);

  const retrieveTechItems = () => {
    TechDataService.getAll()
      .then(response => {
        setTechItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const refreshList = () => {
    retrieveTechItems();
    setCurrentIndex(-1);
  };

  const searchTechType = () => {
    TechDataService.findByTechType(techType)
      .then(response => {
        console.log(response.data);
        setTechItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onAddButton = () => {
    // Navigate to add tech item page
  };

  // const onEditButton = (techItem) => {
  //   setCurrentTechItem(techItem);
  //   console.log(techItem);
  //   // Navigate to tech item details page
  // };

  const onDeleteButton = (techItem) => {
    // Assign selected tech item data to itemToDelete state
    setItemToDelete(techItem);
    // set isModalOpen state to true, effectively opening the modal
    setIsModalOpen(true);
  };

  // Delete selected data row from the database & refresh the list to reflect the changes
  const handleConfirmDelete = () => {
    TechDataService.delete(itemToDelete.id)
      .then(response => {
        console.log(response.data);
        setIsModalOpen(false);
        refreshList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="list">
      <div>
        <div className="input-group">
          <input type="text" placeholder="Search by Tech Type" value={techType} onChange={(e) => setTechType(e.target.value)} />
          <div>
            <button className="btn btn-outline-secondary" type="button" onClick={searchTechType}>Search</button>
          </div>
        </div>
      </div>
      <div>
        <div className="card-header">
          <div>
            <h5>Tech Items</h5>
          </div>
          <button onClick={onAddButton}><Link to="/add" style={{ textDecoration: 'none' }} className='link-text'>Register New Tech</Link></button>
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
            {techItems.length ? (
              techItems.map((techItem, index) => (
                <tr key={index} className={index === currentIndex ? "active" : ""}>
                  <td >
                    <Link to={`/techItems/${techItem.id}`} ><MdEdit/></Link>
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
        isOpen={isModalOpen} 
        // If called, turn isModalOpen state to false, effectively closing Modal
        onClose={() => setIsModalOpen(false)} 
        // If called, trigger handleConfirmDelete function
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
}

export default TechItemList;
