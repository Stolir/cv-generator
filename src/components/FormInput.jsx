import "../styles/FormInput.css"
import { getPath } from "../utils/helper";

function FormInput({fieldName, label, handleChange, path, type, value, placeholder, index = null, readOnly = false }) {

  return (
    <div className={`input-wrapper ${fieldName}`}>
      <label>{label}</label>
      <input 
        {...(index && {index})}
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(e) => {
          if (path === "experience") {
            handleChange(fieldName, e.target.value)
          }
          else {
            handleChange(getPath(path, fieldName, index), e.target.value)
          }
          
        }}
        />
    </div>
  )
}

export default FormInput;