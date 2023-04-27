import React from "react";
const ReadOnlyRow = ({ contact, handleDeleteClick }) => {

  const fname = contact.firstName;
  const lname = contact.lastName;
  const name = fname + " " + lname;

  return (
    <tr>
      <td>{name}</td>
      <td>{contact.contactNumber}</td>
      <td>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;