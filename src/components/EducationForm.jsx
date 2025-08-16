import '../styles/EducationForm.css'
import CollapasibleCard from './CollapsibleCard';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import { useState, useEffect } from 'react';
import { set } from 'lodash';
import EditPanel from './EditPanel';
import { findIndexById } from '../utils/helper';

function EducationForm({ addedEducation, path, handleChange, index }) {

  const [editMode, setEditMode] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(index)

  useEffect(() => {
    if (!editMode) {
      setCurrentIndex(index);
    }
  }, [editMode, index]);

  // education information that's currently ediatble by the user. 
  const [educationId, setEducationId] = useState(0)


  const [currentEducation, setCurrentEducation] = useState({
    id: 0,
    institution: '',
    location: '',
    qualification: '',
    graduationDate: '',
    details: '',
  })

  // if passed item is object replace entire obj with new values otherwise edit specific field
  const handleChangeCurrentEducation = (item, value) => {
    if (typeof item === 'object' && item) {
      setCurrentEducation(item)
    } else {
      setCurrentEducation((prev) => {
      const copy = {...prev};
      set(copy, item, value)
      console.log(copy)
      return copy;
    })      
    }
  }

  const handleAddEducation = (index, id) => {
    handleChange(`education[${index}]`, currentEducation)
    setEducationId(prevId => {
      const newId = prevId + 1;
      setCurrentEducation({
        id: id ?? newId,
        institution: '',
        location: '',
        qualification: '',
        graduationDate: '',
        details: '',
      })
      return newId;
    })
  }

  const toggleEditMode = (id) => {
    if (!editMode) {
      setEditMode(true)
      const editIndex = findIndexById(addedEducation, id)
      handleChangeCurrentEducation(addedEducation[editIndex])
      toggleEditPanel()
      setCurrentIndex(editIndex)
    } else {
      setEditMode(false)
      setCurrentIndex(index)
    }
  }

  // edit panel logic to edit/delete added education
  const [editPanelStatus, setEditPanelStatus] = useState(false);

  const toggleEditPanel = () => {
    console.log(addedEducation.length)
    setEditPanelStatus(editPanelStatus ? false : true)
  }

  const handleDelete = (id) => {
    const deleteIndex = findIndexById(addedEducation, id)
    console.log(deleteIndex)
    handleChange(`${path}[${deleteIndex}]`, undefined)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddEducation(currentIndex)
    if (editMode) {
      toggleEditMode()
    }
  }

  return (
    <>
      <CollapasibleCard header={"Education"}>
      <form onSubmit={handleSubmit}>
        <FormInput
          fieldName="institution"
          label="Institution"
          handleChange={handleChangeCurrentEducation}
          path={path}
          index={currentIndex}
          type="text"
          value={currentEducation.institution}
          placeholder="Hogwarts"
        />
        <FormInput
          fieldName="qualification"
          label="Qualification"
          handleChange={handleChangeCurrentEducation}
          path={path}
          index={currentIndex}
          type="text"
          value={currentEducation.qualification}
          placeholder="Bachelor of Witchcarft and Wizardry"
        />
        <FormInput
          fieldName="location"
          label="Location"
          handleChange={handleChangeCurrentEducation}
          path={path}
          index={currentIndex}
          type="text"
          value={currentEducation.location}
          placeholder="Scotland"
        />
        <FormInput
          fieldName="graduationDate"
          label="Graduation Date"
          handleChange={handleChangeCurrentEducation}
          path={path}
          index={currentIndex}
          type="month"
          value={currentEducation.graduationDate}
        />
        <FormTextArea 
            fieldName="details"
            label="Details"
            handleChange={handleChangeCurrentEducation}
            path={path}
            index={currentIndex}
            value={currentEducation.details}
            placeholder={"To insert new bullet point type '-' followed by a space, or press enter."}
          />
          <div className="form-controls">
            <button type="button" onClick={toggleEditPanel} disabled={editMode}>View Added</button>
            <button type="submit">{editMode ? "Update" : "Add"}</button>
          </div>
      </form>
      </CollapasibleCard>
      <EditPanel 
        addedData={addedEducation}
        dataLabel={"education"}
        toggleDisplay={toggleEditPanel}
        shown={editPanelStatus}
        handleEdit={toggleEditMode}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default EducationForm;