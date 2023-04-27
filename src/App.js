import './App.css';
import data from './mockData.json';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import ReadOnlyRow from './components/ReadOnlyRow';

function App() {
  const [details, setDetails] = useState(data);
  const [addData, setAddData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    contactNo: ""
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addData };
    newFormData[fieldName] = fieldValue;

    setAddData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      firstName: addData.firstName,
      lastName: addData.lastName,
      contactNumber: addData.contactNumber,
    };

    const newContacts = [...details, newContact];
    setDetails(newContacts);
  };
  const handleDeleteClick = (contactId) => {
    var res = window.confirm("Are you sure to delete this entry?");
    if (res) {
      const newContacts = [...details];

      const index = details.findIndex((contact) => contact.id === contactId);

      newContacts.splice(index, 1);

      setDetails(newContacts);
    }
  };

  function handleSort() {
    const sortedData = [...details].sort((a, b) => {
      return a.firstName > b.firstName ? 1 : -1;
    });
    setDetails(sortedData);
  }

  const handleSearch = (event) => {
    const newContacts = [...details];
    let value = event.target.value.toLowerCase();
    let result = [];
    result = newContacts.filter((data) => {
      const fname = data.firstName;
      const lname = data.lastName;
      const name = fname + " " + lname;
      return name.search(value) != -1;
    });
    setDetails(result);
  }

return (
  <div className="app-container">
    <h2>Add a Contact</h2>
    <form onSubmit={handleAddFormSubmit} className='addForm'>
      <input
        type="text"
        name="firstName"
        required="required"
        placeholder="Enter First Name"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="lastName"
        required="required"
        placeholder="Enter Last Name"
        onChange={handleAddFormChange}
      />
      <input
        type="number"
        name="contactNumber"
        required="required"
        placeholder="Enter Contact Number"
        onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>

    <input type='text' placeholder='Search' onChange={handleSearch} style={{ width: '30%', height: 35, marginBottom: 25, marginTop: 25 }} />

    <form>
      <table>
        <thead>
          <tr>
            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Name</th>
            {/* <th>Last Name</th> */}
            <th>Contact</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {details.map((contact) => (
            <ReadOnlyRow
              contact={contact}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </tbody>
      </table>
    </form>
  </div>
)
}

export default App;
