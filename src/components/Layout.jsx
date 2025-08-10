import { useState } from "react";
import ContactForm from "./ContactForm";
import { set } from "lodash";
import { defaultUserData } from "../data/userInformation";
import ExperienceForm from "./ExperienceForm";
import "../styles/Layout.css"

// const userData = {
//   contact: {
//     // fill out with dummy data for now instead of ''
//     firstName: '',
//     surname: '',
//     phoneNumber: '',
//     email: '',
//     address: {
//       country: '',
//       city: '',
//       postCode: ''
//     }
//   },
//   experience: [
    
//   ],
//   education: [
//     // .. more data
//   ],
//   skills: [
//     // .. more data
//   ], 
//   languages: [
//     {
//       language: "",
//       description: ""
//     }
//   ],
//   summary: "",
// }
function Layout() {
  const [userData, setUserData] = useState(defaultUserData);

  const testData = userData.experience.details

  const handleChange = (fieldPath, value) => {
      console.log("working")
      setUserData((prev) => {
      const copy = {...prev};
      console.log(copy)
      set(copy, fieldPath, value)
      console.log(copy)
      return copy;
    })
  }


  return (
    <div className="grid-container" id="layout">
      <div className="forms-wrapper">
        <ContactForm
          userContact={userData.contact}
          path="contact"
          handleChange={handleChange}
        />
        <ExperienceForm
          userExperience={userData.experience}
          path="experience"
          handleChange={handleChange}
        />
        <div>{userData.contact.address.city}</div>
        <div>{userData.experience[0].details}</div>
      </div>
    </div>
  )
} 

export default Layout;