import CollapasibleCard from "./CollapsibleCard";
import FormTextArea from "./FormTextArea";

function SummaryForm({ userSummary, handleChange, path}) {
  return (
    <CollapasibleCard header="Summary">
      <form>
        <FormTextArea 
          fieldName="summary"
          label="Summary"
          handleChange={handleChange}
          path={path}
          value={userSummary}
          placeholder={"To insert new bullet point type '-' followed by a space, or press enter."}
        />
      </form>

    </CollapasibleCard>
  )
}

export default SummaryForm;