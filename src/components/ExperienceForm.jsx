import CollapasibleCard from "./CollapsibleCard";
import FormInput from "./FormInput";
import { useState, useEffect } from "react";
import FormTextArea from "./FormTextArea";
import '../styles/ExperienceForm.css' 
import EditPanel from "./EditPanel";
import { findIndexById } from "../utils/helper";

function ExperienceForm({ userExperience, handleChange, handleAdd, path, index, addedExperience, handleDeletion }) {

  const [currentIndex, setCurrentIndex] = useState(index)

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!editMode) {
      setCurrentIndex(index);
    }
  }, [editMode, index]);

  const toggleEditMode = (id) => {
    if (!editMode) {
      setEditMode(true)
      const editIndex = findIndexById(addedExperience, id)
      handleChange(addedExperience[editIndex])
      toggleEditPanel()
      setCurrentIndex(editIndex)
    } else {
      setEditMode(false)
      setCurrentIndex(index)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(currentIndex)
    setEndDateType('month')
    if (editMode) {
      toggleEditMode()
    }
  }

  // handle toggling end date between a date and "current"
  const [endDateType, setEndDateType] = useState(() => {
    if (userExperience.endDate === 'Current') {
      return 'text'
    }
    else { return 'month'}
  })

  const [prevEndDate, setPrevEndDate] = useState(userExperience.endDate)

  const toggleEndDate = (e) => {
    console.log(prevEndDate)
    if (endDateType === 'month') {
      setPrevEndDate(userExperience.endDate)
      e.target.value = 'Current'
      handleChange('endDate', e.target.value)
      setEndDateType('text')
    }
    else {
      setPrevEndDate(userExperience.endDate)
      e.target.value = prevEndDate;
      handleChange('endDate', e.target.value)
      setEndDateType('month')
    }
  }
  
  // edit panel logic to edit/delete added experience
  const [editPanelStatus, setEditPanelStatus] = useState(false);

  const toggleEditPanel = () => {
    console.log(addedExperience.length)
    setEditPanelStatus(editPanelStatus ? false : true)
  }

  const handleDelete = (id) => {
    const deleteIndex = findIndexById(addedExperience, id)
    console.log(deleteIndex)
    handleDeletion(`${path}[${deleteIndex}]`, undefined)
  }
  return (
    <>
      <CollapasibleCard header="Experience">
        <form onSubmit={(e) => {
          handleSubmit(e)
        }}>
          <FormInput 
            fieldName="jobTitle"
            label="Job Title"
            handleChange={handleChange}
            path={path}
            index={currentIndex}
            type="text"
            value={userExperience.jobTitle}
            placeholder={"Peace Enforcer"}
          />
          <FormInput 
            fieldName="employer"
            label="Employer"
            handleChange={handleChange}
            path={path}
            index={currentIndex}
            type="text"
            value={userExperience.employer}
            placeholder={"Peace Maintainers Inc."}
          />
          <FormInput 
            fieldName="startDate"
            label="Start Date"
            handleChange={handleChange}
            path={path}
            index={currentIndex}
            type="month"
            value={userExperience.startDate}
          />
          <div className="end-date">
            <FormInput
              fieldName="endDate"
              label="End Date"
              handleChange={handleChange}
              path={path}
              index={currentIndex}
              type={endDateType}
              value={userExperience.endDate}
              readOnly={endDateType === 'month' ? false : true}
            />
            <div 
              className="checkbox-wrapper"
              onClick={(e) => {
                toggleEndDate(e)
              }}
            >
              <label>Current Position</label>
              <input
              type="checkbox"
              checked={endDateType === 'month' ? false : true}
              readOnly
              />
            </div>
          </div>
          <FormInput 
            fieldName="location"
            label="Location"
            handleChange={handleChange}
            path={path}
            index={currentIndex}
            type="text"
            value={userExperience.location}
            placeholder={"Gotham, United States"}
          />
          <FormTextArea 
            fieldName="details"
            label="Details"
            handleChange={handleChange}
            path={path}
            index={currentIndex}
            value={userExperience.details}
            placeholder={"To insert new bullet point type '-' followed by a space, or press enter."}
          />
          <div className="form-controls">
            <button type="button" onClick={toggleEditPanel} disabled={editMode}>View Added</button>
            <button type="submit">{editMode ? "Update" : "Add"}</button>
          </div>
        </form>
      </CollapasibleCard>
      <EditPanel 
        addedExperience={addedExperience} 
        toggleDisplay={toggleEditPanel}
        shown={editPanelStatus}
        handleEdit={toggleEditMode}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default ExperienceForm;