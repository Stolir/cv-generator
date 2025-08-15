function SideSection({ heading, children }) {
  return (
    <section className="side-section">
      <h1>{heading}</h1>
      <hr />
      <div className="details">
        {children}</div>
    </section>
  )
}

export default SideSection;