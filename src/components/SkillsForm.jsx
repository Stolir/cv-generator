import CollapasibleCard from "./CollapsibleCard";
import FormTextArea from "./FormTextArea";

function SkillsForm({ userSkills, handleChange, path}) {
  return (
    <CollapasibleCard header="Skills">
      <form>
        <FormTextArea 
          fieldName="skills"
          label="Skills"
          handleChange={handleChange}
          path={path}
          value={userSkills}
          placeholder={"To insert new bullet point type '-' followed by a space, or press enter."}
        />
      </form>

    </CollapasibleCard>
  )
}

export default SkillsForm;