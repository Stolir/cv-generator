import "../styles/FormInput.css"

function FormInput({fieldName, label, handleChange, path, type, value, placeholder }) {
  return (
    <div className={`input-wrapper ${fieldName}`}>
      <label>{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        onChange={(e) => {
          handleChange(`${path}.${fieldName}`, e.target.value)
        }}
        />
    </div>
  )
}

export default FormInput;