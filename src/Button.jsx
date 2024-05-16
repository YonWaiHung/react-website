
function Button() {

  // Inline styling good for small projects as bigger ones cause readability issues
  // const styles = {
  //   backgroundColor: "aqua",
  //   color: "black",
  //   padding: "10px 20px",
  //   borderRadius: "5px",
  //   border: "none",
  //   cursor: "pointer",
  // };
  // let count = 0;

  // const handleClick = (name) => {
  //   if (count < 3) {
  //     count++;
  //     console.log(name, 'you clicked me ', count, 'time/s');
  //   }
  //   else {
  //     console.log(name, 'stop clicking me');
  //   }

  // }

  // Event handler
  const handleClick = (e) => e.target.textContent = "OUCH!";

  return(
    // <button style={styles} onClick={() => handleClick2("Bro")}>Click Me</button>
    // <button onClick={(e) => handleClick(e)}>Click Me</button>
    <button onDoubleClick={(e) => handleClick(e)}>Click Me</button>
  )

}

export default Button