import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../../MyContext';

const GroupCreationComponent = () => {
  const { userdetails } = useContext(MyContext);
  const [groupName, setGroupName] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7777/api/getusers')
      .then(response => {
        setAllUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleMemberSelect = (userId) => {
    setSelectedMembers(prevState =>
      prevState.includes(userId) ? prevState.filter(id => id !== userId) : [...prevState, userId]
    );
  };
  const handleSubmit = () => {
    const requestData = {
      name: groupName,
      adminId: userdetails.id,
      memberIds: selectedMembers
    };
  
    axios.post('http://localhost:7777/api/groups/create', requestData)
      .then(response => {
        console.log("Group created successfully!", response.data);
        // Handle post group creation logic
      })
      .catch(error => {
        console.error("There was an error creating the group!", error);
        if (error.response) {
          // Request made and server responded
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // Request made but no response
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error message:", error.message);
        }
      });
  };

  return (
    <div>
      <h2>Create Group</h2>
      <div>
        <label>Group Name: </label>
        <input 
          type="text" 
          value={groupName} 
          onChange={(e) => setGroupName(e.target.value)} 
        />
      </div>
      <div>
        <h3>Select Members</h3>
        {allUsers.map(user => (
          <div key={user.id}>
            <input 
              type="checkbox" 
              checked={selectedMembers.includes(user.id)} 
              onChange={() => handleMemberSelect(user.id)} 
            />
            {user.userName}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Create Group</button>
    </div>
  );
};

export default GroupCreationComponent;
