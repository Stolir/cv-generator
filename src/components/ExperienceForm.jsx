import CollapasibleCard from "./CollapsibleCard";
import FormInput from "./FormInput";
import { useState } from "react";
import FormTextArea from "./FormTextArea";
import '../styles/ExperienceForm.css' 
import { getPath } from "../utils/helper";
import EditPanel from "./EditPanel";

function ExperienceForm({ userExperience, handleChange, path }) {


  const [index, setIndex] = useState(0);

  const experienceTemplate = {
    id: index + 1,
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    location: '',
    details: ''
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIndex(userExperience.length - 1);
  }

  const [endDateType, setEndDateType] = useState(() => {
    if (userExperience[index].endDate === 'Current') {
      return 'text'
    }
    else { return 'month'}
  })

  const [prevEndDate, setPrevEndDate] = useState(userExperience[index].endDate)

  const toggleEndDate = (e) => {
    console.log(prevEndDate)
    if (endDateType === 'month') {
      setPrevEndDate(userExperience[index].endDate)
      e.target.value = 'Current'
      handleChange(getPath(path, 'endDate', index), e.target.value)
      setEndDateType('text')
    }
    else {
      setPrevEndDate(userExperience[index].endDate)
      e.target.value = prevEndDate;
      handleChange(getPath(path, 'endDate', index), e.target.value)
      setEndDateType('month')
    }
  }

  const handleAdd = (addedData) => {
    const copy = {...addedData}
    handleChange(path, [...userExperience, experienceTemplate])
  }

  return (
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
          value={userExperience[index].jobTitle}
        />
         <FormInput 
          fieldName="company"
          label="Company"
          handleChange={handleChange}
          path={path}
          index={index}
          type="text"
          value={userExperience[index].company}
        />
         <FormInput 
          fieldName="startDate"
          label="Start Date"
          handleChange={handleChange}
          path={path}
          index={index}
          type="month"
          value={userExperience[index].startDate}
        />
         <div className="end-date">
           <FormInput
            fieldName="endDate"
            label="End Date"
            handleChange={handleChange}
            path={path}
            index={index}
            type={endDateType}
            value={userExperience[index].endDate}
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
          value={userExperience[index].location}
        />
         <FormTextArea 
          fieldName="details"
          label="Details"
          handleChange={handleChange}
          path={path}
          index={index}
          value={userExperience[index].details}
        />
        <div className="form-controls">
          <button>View Added</button>
          <button 
          onClick={() => {
            handleAdd(userExperience[index])}
          }
          type="submit"
          >Add</button>
        </div>
      </form>
    </CollapasibleCard>
  )
}

export default ExperienceForm;