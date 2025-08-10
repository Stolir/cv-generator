import '../styles/FormTextArea.css'
import { useRef, useState } from 'react'
import { getPath } from '../utils/helper'


function FormTextArea({ children, fieldName, label, handleChange, path, type, value, placeholder, index = null }) {

  const [text, setText] = useState(() => {
    if (value) { 
      return value;
    }
    else { return '• '}
  })

  const textareaRef = useRef(null);

  const handleText = (e) => {
    handleChange(getPath(path, fieldName, index), e.target.value)
    setText(e.target.value)
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

      // After updating text, move cursor after inserted bullet
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
        onKeyDown={handleNewLine}
        onChange={handleText}
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