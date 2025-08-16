  export function getPath(path, fieldName, index) {
    if (index !== null) {
      return `${path}[${index}].${fieldName}`
    }
    else {
      return `${path}.${fieldName}`
    }
  }

  // expects date in YYYY-MM format and returns YYYY/MM 
  export function formatDate(date) {
    return date.replaceAll("-", "/")
  }

  export function findIndexById(array, id) {
    return array.findIndex((item) => item.id === id)
  }

  export function stripQuotes(str) {
  if (
    (str.startsWith('"') && str.endsWith('"')) ||
    (str.startsWith("'") && str.endsWith("'"))
  ) {
    return str.slice(1, -1);
  }
  return str;
}

export function formatDetails(data) {
  // each item starts at a new line
  const items = data.details.split("\n");
  return (
    <>
      {items.map((item, index) => (
        <p key={`${data.id}-details-${index}`}>{item}</p>
      ))}
    </>
  )
}