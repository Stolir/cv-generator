import { useState } from "react";
import ContactForm from "./ContactForm";
import { set } from "lodash";
import { defaultUserData } from "../data/userInformation";
import ExperienceForm from "./ExperienceForm";
import "../styles/Layout.css"
import Header from "./Header";

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

  const handleChange = (fieldPath, value) => {
      setUserData((prev) => {
      const copy = {...prev};
      set(copy, fieldPath, value)
      console.log(copy)
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
          userExperience={userData.experience}
          path="experience"
          handleChange={handleChange}
        />
        {/* <div>{userData.contact.address.city}</div>
        <div>{userData.experience[0].details}</div> */}
      </div>
    </div>
  )
} 

export default Layout;