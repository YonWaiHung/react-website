
function ProfilePicture() {
  
  const imageUrl = './src/assets/ash-baby.jpg';

  // Disappearing image
  const handleClick = (e) => e.target.style.display = "none";

  return(<img className="profile-image" onClick= {(e) => handleClick(e)} src={imageUrl} alt="Image of a baby ashing away"></img>);

}

export default ProfilePicture