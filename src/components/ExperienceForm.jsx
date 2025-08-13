import CollapasibleCard from "./CollapsibleCard";
import FormInput from "./FormInput";
import { useState } from "react";
import FormTextArea from "./FormTextArea";
import '../styles/ExperienceForm.css' 
import { getPath } from "../utils/helper";
import EditPanel from "./EditPanel";

function ExperienceForm({ userExperience, handleChange, handleAdd, path, index, addedExperience }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(index)
  }

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
            index={index}
            type="text"
            value={userExperience.jobTitle}
            placeholder={"Peace Enforcer"}
          />
          <FormInput 
            fieldName="company"
            label="Company"
            handleChange={handleChange}
            path={path}
            index={index}
            type="text"
            value={userExperience.company}
            placeholder={"Peace Maintainers Inc."}
          />
          <FormInput 
            fieldName="startDate"
            label="Start Date"
            handleChange={handleChange}
            path={path}
            index={index}
            type="month"
            value={userExperience.startDate}
          />
          <div className="end-date">
            <FormInput
              fieldName="endDate"
              label="End Date"
              handleChange={handleChange}
              path={path}
              index={index}
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
            index={index}
            type="text"
            value={userExperience.location}
            placeholder={"Gotham, United States"}
          />
          <FormTextArea 
            fieldName="details"
            label="Details"
            handleChange={handleChange}
            path={path}
            index={index}
            value={userExperience.details}
            placeholder={"To insert new bullet point type '-' followed by a space, or press enter."}
          />
          <div className="form-controls">
            <button>View Added</button>
            <button 
            type="submit"
            >Add</button>
          </div>
        </form>
      </CollapasibleCard>
    </>
  )
}

export default ExperienceForm;