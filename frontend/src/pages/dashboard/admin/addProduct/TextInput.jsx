import React from 'react'

const TextInput = ({Label, name, value , onChange, type="text", placeholder}) => {
  return (
    <div>
        <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{Label}</label>
        <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={onchange}
        className='add-product-InputCSS'/>
    </div>
  )
}

export default TextInput