import React, { useState, useEffect } from 'react';
import NewEmployeeForm from './views/EmployeeForm/NewEmployeeForm';
import ListEmployeeDetails from './views/ListEmployees/ListEmployeeDetails';

function App() {
  const [employees, setEmployees] = useState([]);

  // Load employees from localStorage
  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(savedEmployees);
  }, []);

  // To add/update employee details
  const saveEmployee = (userData) => {
    const updatedEmployees = [...employees, userData];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div className='container'>
      <div>
        <NewEmployeeForm saveEmployee={saveEmployee} />
      </div>
      <div>
        <ListEmployeeDetails employees={employees} />
      </div>
    </div>
  );
}

export default App;