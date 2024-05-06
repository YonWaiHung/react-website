
function Button() {

  // Inline styling good for small projects as bigger ones cause readability issues
  const styles = {
    backgroundColor: "aqua",
    color: "black",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  }

  return(
    <button style={styles}>Click Me</button>
  )

}

export default Button