import CollapasibleCard from "./CollapsibleCard";
import FormInput from "./FormInput";
import { useState, useEffect } from "react";
import FormTextArea from "./FormTextArea";
import '../styles/ExperienceForm.css' 
import EditPanel from "./EditPanel";
import { findIndexById } from "../utils/helper";
import { set } from "lodash";

function ExperienceForm({ addedExperience, handleChange, path }) {

  const index = addedExperience.length;

  const [editMode, setEditMode] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(index)

  useEffect(() => {
    if (!editMode) {
      setCurrentIndex(index);
    }
  }, [editMode, index]);

    // experience information that's currently ediatble by the user. 
  const [experienceId, setExperienceId] = useState(0)


  const [currentExperience, setCurrentExperience] = useState({
    id: 0,
    jobTitle: '',
    employer: '',
    startDate: '',
    endDate: '',
    location: '',
    details: ''
  })

  // if passed item is object replace entire obj with new values otherwise edit specific field
  const handleChangeCurrentExperience = (item, value) => {
    if (typeof item === 'object' && item) {
      setCurrentExperience(item)
    } else {
      setCurrentExperience((prev) => {
      const copy = {...prev};
      set(copy, item, value)
      console.log(copy)
      return copy;
    })      
    }
  }

  const handleAddExperience = (index, id) => {
    handleChange(`experience[${index}]`, currentExperience)
    setExperienceId(prevId => {
      const newId = prevId + 1;
      setCurrentExperience({
      id: id ?? newId,
      jobTitle: '',
      employer: '',
      startDate: '',
      endDate: '',
      location: '',
      details: ''
      })
      return newId;
    })
  }

  const toggleEditMode = (id) => {
    if (!editMode) {
      setEditMode(true)
      const editIndex = findIndexById(addedExperience, id)
      handleChangeCurrentExperience(addedExperience[editIndex])
      toggleEditPanel()
      setCurrentIndex(editIndex)
    } else {
      setEditMode(false)
      setCurrentIndex(index)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExperience(currentIndex)
    setEndDateType('month')
    if (editMode) {
      toggleEditMode()
    }
  }

  // handle toggling end date between a date and "current"
  const [endDateType, setEndDateType] = useState(() => {
    if (currentExperience.endDate === 'Current') {
      return 'text'
    }
    else { return 'month'}
  })

  useEffect(() => {
    setEndDateType(currentExperience.endDate === 'Current' ? 'text' : "month") 
  })

  const [prevEndDate, setPrevEndDate] = useState(currentExperience.endDate)

  const toggleEndDate = (e) => {
    console.log(prevEndDate)
    if (endDateType === 'month') {
      setPrevEndDate(currentExperience.endDate)
      e.target.value = 'Current'
      handleChangeCurrentExperience('endDate', e.target.value)
      setEndDateType('text')
    }
    else {
      setPrevEndDate(currentExperience.endDate)
      e.target.value = prevEndDate;
      handleChangeCurrentExperience('endDate', e.target.value)
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
    handleChange(`${path}[${deleteIndex}]`, undefined)
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
            handleChange={handleChangeCurrentExperience}
            path={path}
            index={currentIndex}
            type="text"
            value={currentExperience.jobTitle}
            placeholder={"Peace Enforcer"}
          />
          <FormInput 
            fieldName="employer"
            label="Employer"
            handleChange={handleChangeCurrentExperience}
            path={path}
            index={currentIndex}
            type="text"
            value={currentExperience.employer}
            placeholder={"Peace Maintainers Inc."}
          />
          <FormInput 
            fieldName="startDate"
            label="Start Date"
            handleChange={handleChangeCurrentExperience}
            path={path}
            index={currentIndex}
            type="month"
            value={currentExperience.startDate}
          />
          <div className="end-date">
            <FormInput
              fieldName="endDate"
              label="End Date"
              handleChange={handleChangeCurrentExperience}
              path={path}
              index={currentIndex}
              type={endDateType}
              value={currentExperience.endDate}
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
            handleChange={handleChangeCurrentExperience}
            path={path}
            index={currentIndex}
            type="text"
            value={currentExperience.location}
            placeholder={"Gotham, United States"}
          />
          <FormTextArea 
            fieldName="details"
            label="Details"
            handleChange={handleChangeCurrentExperience}
            path={path}
            index={currentIndex}
            value={currentExperience.details}
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