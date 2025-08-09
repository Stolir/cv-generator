import { useState } from "react";
import ContactForm from "./ContactForm";
import { set } from "lodash";
import { defaultUserData } from "../data/userInformation";

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
    <div className="grid-container">
      <ContactForm 
        userContact={userData.contact}
        path="contact"
        handleChange={handleChange}
      />
      {/* <div>{userData.contact.address.city}</div> */}
    </div>
  )
} 

export default Layout;