import CollapsibleCard from './CollapsibleCard';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import { useState, useEffect } from 'react';
import { set } from 'lodash';
import EditPanel from './EditPanel';
import { findIndexById } from '../utils/helper';

function LanguagesForm({ addedLanguages, path, handleChange, index }) {

  const [editMode, setEditMode] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(index)

  useEffect(() => {
    if (!editMode) {
      setCurrentIndex(index);
    }
  }, [editMode, index]);

  const [currentLanguages, setCurrentLanguages] = useState({
    id: crypto.randomUUID(),
    language: '',
    level: '',
  })

  // if passed item is object replace entire obj with new values otherwise edit specific field
  const handleChangeCurrentLanguage = (item, value) => {
    if (typeof item === 'object' && item) {
      setCurrentLanguages(item)
    } else {
      setCurrentLanguages((prev) => {
      const copy = {...prev};
      set(copy, item, value)
      console.log(copy)
      return copy;
    })      
    }
  }

  const handleAddLanguage = (index, id) => {
    handleChange(`languages[${index}]`, currentLanguages)
    const newId = crypto.randomUUID();
    setCurrentLanguages({
      id: id ?? newId,
      language: '',
      level: '',
    })
  }

  const toggleEditMode = (id) => {
    if (!editMode) {
      setEditMode(true)
      const editIndex = findIndexById(addedLanguages, id)
      handleChangeCurrentLanguage(addedLanguages[editIndex])
      toggleEditPanel()
      setCurrentIndex(editIndex)
    } else {
      setEditMode(false)
      setCurrentIndex(index)
    }
  }

  // edit panel logic to edit/delete added languages
  const [editPanelStatus, setEditPanelStatus] = useState(false);

  const toggleEditPanel = () => {
    console.log(addedLanguages.length)
    setEditPanelStatus(editPanelStatus ? false : true)
  }

  const handleDelete = (id) => {
    const deleteIndex = findIndexById(addedLanguages, id)
    console.log(deleteIndex)
    handleChange(`${path}[${deleteIndex}]`, undefined)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddLanguage(currentIndex)
    if (editMode) {
      toggleEditMode()
    }
  }

  return (
    <>
      <CollapsibleCard header={"Languages"}>
      <form onSubmit={handleSubmit}>
        <FormInput
          fieldName="language"
          label="Language"
          handleChange={handleChangeCurrentLanguage}
          path={path}
          index={currentIndex}
          type="text"
          value={currentLanguages.language}
          placeholder="English"
        />
        <FormInput
          fieldName="level"
          label="Level"
          handleChange={handleChangeCurrentLanguage}
          path={path}
          index={currentIndex}
          type="text"
          value={currentLanguages.level}
          placeholder="C2/Native Language"
        />
          <div className="form-controls">
            <button type="button" onClick={toggleEditPanel} disabled={editMode}>View Added</button>
            <button type="submit">{editMode ? "Update" : "Add"}</button>
          </div>
      </form>
      </CollapsibleCard>
      <EditPanel 
        addedData={addedLanguages}
        dataLabel={"languages"}
        toggleDisplay={toggleEditPanel}
        shown={editPanelStatus}
        handleEdit={toggleEditMode}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default LanguagesForm;