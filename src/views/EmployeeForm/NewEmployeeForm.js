import React, { useState } from 'react';
import Select from 'react-select'; // For dynamic select fields
import Countries from '../../Constants/country.json';
import Cities from '../../Constants/city.json';
import States from '../../Constants/state.json';

export default function NewEmployeeForm({ saveEmployee }) {

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dob: '',
        address: '',
        selectedCountry: null,
        selectedState: null,
        selectedDistrict: null,
    });
    const todaysDate = new Date().toISOString().split('T')[0];
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target || event;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === 'dob') {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            setFormData({ ...formData, age: age, dob: value });
        }
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData({
            ...formData,
            [name]: selectedOption,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateFormData();
        if (Object.keys(validationErrors).length === 0) {

            saveEmployee(formData);
            // Clear form data after successful submission
            setFormData({
                name: '',
                dob: '',
                age: '',
                address: '',
                selectedCountry: null,
                selectedState: null,
                selectedDistrict: null,
            });
            // Clear errors after successful submission
            setErrors({});
        } else {
            // Update errors state with validation errors
            setErrors(validationErrors);
        }
    };

    const validateFormData = () => {
        var errors = {};
        if (parseInt(formData.age) < 18) {
            errors.age = 'Age should be greater than 18';
        }
        return errors;
    };

    return (
        <form onSubmit={handleSubmit} className='container border border-dark rounded m-4 p-4'>
            <div className="border rounded p-3">
                <h5 className='text-center mb-1'>Employee Form</h5>
                <div className="form-group row">

                    <div className="col p-1 m-3">
                        <input
                            className='form-control'
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="col p-1 m-3">
                        <input className="form-control" placeholder='Age' type="number" name="age" value={formData.age} onChange={handleChange} disabled />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>
                    <div className="col p-1 m-3">
                        <input className="form-control" type="date" name="dob" value={formData.dob} onChange={handleChange} required max={todaysDate} // Restrict date to current date
                        />
                        {errors.dob && <span className="error-message">Date of birth is required</span>}
                    </div>
                </div>


                <div className="form-group row">
                    <div className="col p-1 m-3">
                        <input className="form-control" placeholder='Address' type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="col p-1 m-3">
                        <Select
                            name="selectedCountry"
                            options={Countries}
                            value={formData.selectedCountry}
                            onChange={(selectedOption) => handleSelectChange('selectedCountry', selectedOption)}
                            placeholder="Select Country"
                            required
                        />
                    </div>
                    <div className="col p-1 m-3">
                        <Select
                            name="selectedState"
                            options={States.filter(state => state.country_id === formData.selectedCountry?.value)}
                            value={formData.selectedState}
                            onChange={(selectedOption) => handleSelectChange('selectedState', selectedOption)}
                            placeholder="Select State"
                            required
                        />
                    </div>
                    <div className="col p-1 m-3">
                        <Select
                            name="selectedDistrict"
                            options={Cities.filter(district => district.state_id === formData.selectedState?.value)}
                            value={formData.selectedDistrict}
                            onChange={(selectedOption) => handleSelectChange('selectedDistrict', selectedOption)}
                            placeholder="Select District"
                            required
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </div>
        </form>

    );
}
