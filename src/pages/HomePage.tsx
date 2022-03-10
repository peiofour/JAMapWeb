import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../utils/firebase";


const HomePage = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if(loading) return;
    if(!user) return navigate("/login");
  })
  
  return (
    <Layout title="Accueil" className="home container">
      <h1>Bienvenue sur JAMap.</h1>
      <div className="home__images">
        <img src={process.env.PUBLIC_URL + '/images/bucket.png'} alt="bucket" />
        <img src={process.env.PUBLIC_URL + '/images/broom.png'} alt="bucket" />
      </div>
      <p>JAMap est l'application qui centralise l'ensemble des panneaux d'expression libre en France. Elle va te permettre de les trouver plus facilement, d'avoir les itinéraires directement sur Waze ou Google Maps, d'avoir leur dernière date de collage, de signaler quand tu viens de coller des affiches dessus.</p>
      <h3>À vos seaux et pinceaux, on a une campagne à gagner !</h3>
      <div>
        <Button color="brown" onClick={()=>{navigate("/boards")}}>
          Accéder à la carte
        </Button>
      </div>
      <div style={{marginTop:"10px"}}>
        <Button color="green" onClick={()=>{navigate("/addboard")}}>
          Ajouter un panneau
        </Button>
      </div>
      <p>Le site est optimisé pour une utilisation sur smartphone.</p>
      <p>Développé par <a href="http://pierrefournier.dev" target="_blank" rel="noreferrer">Pierre Fournier</a> (<a href="https://t.me/superbasque" target="_blank" rel="noreferrer">Telegram</a>).<br/>Logo par Océane Larousse</p>
    
      <Button color="grey" onClick={logout}>
        Se déconnecter
      </Button>
    </Layout>
  )
}

export default HomePage;
