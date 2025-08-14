import CollapasibleCard from "./CollapsibleCard";
import FormInput from "./FormInput";

function ContactForm({ userContact, handleChange, path}) {
  return (
    <CollapasibleCard header="Contact Information">
      <form>
        <FormInput 
          fieldName={"firstName"}
          label={"First Name"}
          path={path}
          type="text"
          value={userContact.firstName}
          placeholder="Bruce"
          handleChange={handleChange}
        />
        <FormInput 
          fieldName={"lastName"}
          label={"Last Name"}
          path={path}
          type="text"
          value={userContact.lastName}
          placeholder="Wayne"
          handleChange={handleChange}
        />
          <FormInput 
          fieldName={"phoneNumber"}
          label={"Phone Number"}
          path={path}
          type="tel"
          value={userContact.phoneNumber}
          placeholder="+1 234 567 890"
          handleChange={handleChange}
        />
          <FormInput 
          fieldName={"email"}
          label={"Email Address"}
          path={path}
          type="email"
          value={userContact.phoneNumber}
          placeholder="brucewayne@peacemaintainers.co"
          handleChange={handleChange}
        />
          <FormInput 
          fieldName={"address.city"}
          label={"City"}
          path={path}
          type="text"
          value={userContact.address.city}
          placeholder="Gotham"
          handleChange={handleChange}
        />
          <FormInput 
          fieldName={"address.postCode"}
          label={"Postal Code"}
          path={path}
          type="text"
          value={userContact.address.postCode}
          placeholder="12345"
          handleChange={handleChange}
        />
         <FormInput 
          fieldName={"address.country"}
          label={"Country"}
          path={path}
          type="text"
          value={userContact.address.country}
          placeholder="United States"
          handleChange={handleChange}
        />
      </form>

    </CollapasibleCard>
  )
}

export default ContactForm;