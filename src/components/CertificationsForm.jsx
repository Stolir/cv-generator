import CollapasibleCard from "./CollapsibleCard";
import FormTextArea from "./FormTextArea";

function CertificationsForm({ userCertifications, handleChange, path}) {
  return (
    <CollapasibleCard header="Certifications">
      <form>
        <FormTextArea 
          label="Certifications"
          handleChange={handleChange}
          path={path}
          value={userCertifications}
          placeholder={"To insert new bullet point type '-' followed by a space, or press enter."}
        />
      </form>

    </CollapasibleCard>
  )
}

export default CertificationsForm;