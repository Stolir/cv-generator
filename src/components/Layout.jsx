import { useState } from "react";
import ContactForm from "./ContactForm";
import { set, pullAt } from "lodash";
import { defaultUserData } from "../data/userInformation";
import ExperienceForm from "./ExperienceForm";
import "../styles/Layout.css"
import Header from "./Header";

function Layout() {
  const [userData, setUserData] = useState(defaultUserData);

  const handleChange = (fieldPath, value) => {
      setUserData((prev) => {
        let copy = {...prev};
        if (value === undefined) {
          const match = fieldPath.match(/^(\w+)\[(\d+)\]$/);
          if (match) {
          const arrayName = match[1];
          const index = parseInt(match[2], 10);

          if (Array.isArray(copy[arrayName])) {
            const newArray = [...copy[arrayName]];
            pullAt(newArray, index);
            copy[arrayName] = newArray; 
          }
          } else {
          console.warn('Invalid fieldPath for delete:', fieldPath);
          }
        } else {
          set(copy, fieldPath, value)
          console.log(copy)
        }
      return copy;  
    })
  }

  // experience information that's currently ediatble by the user. 
  const [experienceId, setExperienceId] = useState(0)


  const [currentExperience, setCurrentExperience] = useState({
    id: 0,
    jobTitle: '',
    company: '',
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
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      details: ''
      })
      return newId;
    })
  }

  return (
    <div id="layout">
      <Header></Header>
      <div className="forms-wrapper">
        <ContactForm
          userContact={userData.contact}
          path="contact"
          handleChange={handleChange}
        />
        <ExperienceForm
          userExperience={currentExperience}
          path="experience"
          handleChange={handleChangeCurrentExperience}
          handleAdd={handleAddExperience}
          index={userData.experience.length}
          addedExperience={userData.experience}
          handleDeletion={handleChange}
        />
        {/* <div>{userData.contact.address.city}</div>
        <div>{userData.experience[0].details}</div> */}
      </div>
    </div>
  )
} 

export default Layout;