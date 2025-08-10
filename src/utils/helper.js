  export function getPath(path, fieldName, index) {
    if (index !== null) {
      return `${path}[${index}].${fieldName}`
    }
    else {
      return `${path}.${fieldName}`
    }
  }