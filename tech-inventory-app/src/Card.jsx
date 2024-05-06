import foodiePic from './assets/mouthful-foodie.jpg'

function Card() {

  return(
    <div className="card">
      <img className="card-image" src={foodiePic} alt="Image of the average foodie"/>
      <h2 className="card-title">Pro Foodie</h2>
      <p className="card-text">Eating is gud.</p>
    </div>
  );

}

export default Card