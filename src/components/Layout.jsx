import { useState } from "react";
import ContactForm from "./ContactForm";
import { set, pullAt } from "lodash";
import { defaultUserData } from "../data/userInformation";
import ExperienceForm from "./ExperienceForm";
import "../styles/Layout.css"
import Header from "./Header";
import Resume from "./Resume";
import Footer from "./Footer";
import EducationForm from "./EducationForm";
import LanguagesForm from "./LanguagesForm";

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
          addedExperience={userData.experience}
          path="experience"
          handleChange={handleChange}
          index={userData.experience.length}
        />
        <EducationForm 
          addedEducation={userData.education}
          path="education"
          handleChange={handleChange}
          index={userData.education.length}
        />
        <LanguagesForm
          addedLanguages={userData.languages}
          path="languages"
          handleChange={handleChange}
          index={userData.languages.length}
        />
      </div>
      <Resume data={userData} />
      <Footer />
    </div>
  )
} 

export default Layout;