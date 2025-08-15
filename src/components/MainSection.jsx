function MainSection({ heading, children}) {
  return (
    <section className="main-section"> 
      <h1>{heading}</h1>
      <hr />
      <div className="details">{children}</div>
    </section>
  )
}

export default MainSection;