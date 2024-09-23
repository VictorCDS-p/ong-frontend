import React from 'react';
import './style.css';

export default function SelectDropdown({ label, name, value, options, onChange, placeholder, id }) {
    return (
        <div className="selectContainer">
            <label htmlFor={id}>{label}</label> 
            <select id={id} name={name} value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name || option.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
