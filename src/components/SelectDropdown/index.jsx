import React from 'react';
import './style.css';

export default function SelectDropdown({ label, name, value, options, onChange, placeholder }) {
    return (
        <div className="selectContainer">
            <label htmlFor={name}>{label}</label>
            <select name={name} value={value} onChange={(e) => onChange(e.target.value)}>
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
