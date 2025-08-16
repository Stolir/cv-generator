function SideSection({ heading, children, displayStatus }) {
  return (
    <section className={`side-section ${displayStatus}`}>
      <h1>{heading}</h1>
      <hr />
      <div className="details">
        {children}</div>
    </section>
  )
}

export default SideSection;