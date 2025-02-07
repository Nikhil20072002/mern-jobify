import React from 'react'

const FormRowSelect = ({ name, labelText, list, defaultValue = '',onChange }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className='form-label'>{labelText || name}</label>
            <select name={name} id={name} className='form-select' value={onChange ? defaultValue : undefined} defaultValue={!onChange ? defaultValue : undefined} onChange={onChange} required>
                {list.map((jobStatus) => {
                    return <option key={jobStatus} value={jobStatus}>{jobStatus}</option>
                })}
            </select>
        </div>
    )
}

export default FormRowSelect