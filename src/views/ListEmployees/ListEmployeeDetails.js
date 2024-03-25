import React from 'react';
import './ListEmployeeDetails.css';
import { headings } from '../../Constants/ListEmployeeDetailsConstant';


export default function ListEmployeeDetails(employees) {
    return (
        <div className="container border border-dark rounded m-4 p-4">
            <h5 className='text-center mb-4'>Employee Details</h5>
            <table className="table table-responsive table-striped border overflow-auto">
                <thead className="table-dark">
                    <tr>
                        <th className="col-1">#</th>
                        <th className="col-2">{headings.NAME}</th>
                        <th className="col-2">{headings.AGE}</th>
                        <th className="col-2">{headings.DOB}</th>
                        <th className="col-5">{headings.ADDRESS}</th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{employee.name}</td>
                            <td>{employee.age}</td>
                            <td>{employee.dob}</td>
                            <td>{employee.address}, {employee.selectedCountry && employee.selectedCountry.label}, {employee.selectedState && employee.selectedState.label}, {employee.selectedDistrict && employee.selectedDistrict.label} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
