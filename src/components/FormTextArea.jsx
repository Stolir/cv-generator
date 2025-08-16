import '../styles/FormTextArea.css'
import { useRef, useState, useEffect } from 'react'
import { getPath } from '../utils/helper'


function FormTextArea({ children, fieldName, label, handleChange, path, value, placeholder, index = null }) {

  const [text, setText] = useState(value)

  useEffect(() => {
    setText(value ? value : '')
  }, [value])

  const textareaRef = useRef(null);

  const handleText = (e) => {
    let newValue = e.target.value;

    // Detect "- " and replace with "• "
    if (newValue.endsWith('- ')) {
      newValue = newValue.slice(0, -2) + '• ';
    }

    if (path === "experience" || path === "education") {
      handleChange(fieldName, newValue)
    }
    else {
      handleChange(getPath(path, fieldName, index), newValue)
    }
    setText(newValue)
  }

  const handleNewLine = (e) => {
      if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const { selectionStart, selectionEnd } = textarea;

      // Insert new bullet at cursor position
      const before = text.slice(0, selectionStart);
      const after = text.slice(selectionEnd);

      const newText = before + '\n• ' + after;
      setText(newText);

      // Delay required because setState is async
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 3; // length of '\n• '
      }, 0);
    }
  } 

  return (
    <div className={`textarea-wrapper ${fieldName}`}>
      <label>{label}</label>
      <textarea
      ref={textareaRef}
        {...(index !== null && {index})}
        path={path}
        value={text}
        placeholder={placeholder}
        onKeyDown={handleNewLine}
        onChange={(e) => {
          handleText(e)
        }}
        // textarea specific
        rows={10}
        cols={40}
      >
      {children}
      </textarea>
    </div>
  )
}

export default FormTextArea