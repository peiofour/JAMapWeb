import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Accueil" className="home container">
      <h1>Bienvenue sur JAMap.</h1>
      <div className="home__images">
        <img src={process.env.PUBLIC_URL + '/images/bucket.png'} alt="bucket" />
        <img src={process.env.PUBLIC_URL + '/images/broom.png'} alt="bucket" />
      </div>
      <p>JAMap est l'application qui centralise l'ensemble des panneaux d'expression libre en France. Elle va te permettre de les trouver plus facilement, d'avoir les itinéraires directement sur Waze ou Google Maps, d'avoir leur dernière date de collage, de signaler quand tu viens de coller des affiches dessus.</p>
      <h3>À vos seaux et pinceaux, on a une campagne à gagner !</h3>
      <Button color="brown" onClick={()=>{navigate("/boards")}}>
        Accéder à la carte
      </Button>
      <p>Le site est optimisé pour une utilisation sur smartphone.</p>
    </Layout>
  )
}

export default HomePage;
