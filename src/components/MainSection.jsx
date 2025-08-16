function MainSection({ heading, children, displayStatus }) {
  return (
    <section className={`main-section ${displayStatus ?? displayStatus}`}> 
      <h1>{heading}</h1>
      <hr />
      <div className="details">{children}</div>
    </section>
  )
}

export default MainSection;