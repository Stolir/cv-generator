import CollapasibleCard from "./CollapsibleCard";
import FormInput from "./FormInput";
import { useState } from "react";
import FormTextArea from "./FormTextArea";
import '../styles/ExperienceForm.css' 
import { getPath } from "../utils/helper";

function ExperienceForm({ userExperience, handleChange, path }) {

  const [index, setIndex] = useState(0);

  const handleSubmit = () => {
    setIndex(userExperience.length);
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

  return (
    <CollapasibleCard header="Experience">
      <form onSubmit={handleSubmit}>
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
          fieldName="comapny"
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
      </form>
    </CollapasibleCard>
  )
}

export default ExperienceForm;