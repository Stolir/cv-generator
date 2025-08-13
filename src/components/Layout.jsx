import { useState } from "react";
import ContactForm from "./ContactForm";
import { set } from "lodash";
import { defaultUserData } from "../data/userInformation";
import ExperienceForm from "./ExperienceForm";
import "../styles/Layout.css"
import Header from "./Header";

function Layout() {
  const [userData, setUserData] = useState(defaultUserData);

  const handleChange = (fieldPath, value) => {
      setUserData((prev) => {
      const copy = {...prev};
      set(copy, fieldPath, value)
      console.log(copy)
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

  const handleChangeCurrentExperience = (fieldName, value) => {
      setCurrentExperience((prev) => {
      const copy = {...prev};
      set(copy, fieldName, value)
      console.log(copy)
      return copy;
    })
  }

  const handleAddExperience = (index) => {
    handleChange(`experience[${index}]`, currentExperience)
    setExperienceId(prevId => {
      const newId = prevId + 1;
      setCurrentExperience({
      id: newId,
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
        />
        {/* <div>{userData.contact.address.city}</div>
        <div>{userData.experience[0].details}</div> */}
      </div>
    </div>
  )
} 

export default Layout;