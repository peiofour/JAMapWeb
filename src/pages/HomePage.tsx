import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, logout, firestoreDb } from "../utils/firebase";


const HomePage = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [role, setRole] = useState("");
  const [name, setName] = useState("")

  const fetchUserRole = async () => {
    try {
      const q = query(collection(firestoreDb, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setRole(data.role)
      setName(data.email)
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if(loading) return;
    if(!user) return navigate("/login");
    fetchUserRole()
  })
  
  return (
    <Layout title="Accueil" className="home container">
      <h1>Bienvenue sur JAMap.</h1>
      <div className="home__images">
        <img src={process.env.PUBLIC_URL + '/images/bucket.png'} alt="bucket" />
        <img src={process.env.PUBLIC_URL + '/images/broom.png'} alt="bucket" />
      </div>
      <p>JAMap est l'application qui centralise l'ensemble des panneaux d'expression libre en France. Elle va te permettre de les trouver plus facilement, d'avoir les itinéraires directement sur Waze ou Google Maps, d'avoir leur dernière date de collage, de signaler quand tu viens de coller des affiches dessus.</p>
      <p>Suivre le <a href="http://t.me/jamapapp" target="_blank" rel="noreferrer">canal Telegram</a>.<br/> Développé par <a href="http://pierrefournier.dev" target="_blank" rel="noreferrer">Pierre Fournier</a> (<a href="https://t.me/superbasque" target="_blank" rel="noreferrer">Telegram</a>).<br/>Logo par Océane Larousse</p>
      <h4>Bonjour {name}, vous êtes {role}.</h4>
{/*       <h3>À vos seaux et pinceaux, on a une campagne à gagner !</h3>
 */}      
      {/* <h3 style={{color:'red'}}>RAPPEL : à partir de vendredi 23h59 jusqu'à dimanche 20h, il est interdit de coller les panneaux d'expression libre.<br/> Vous pouvez toujours coller les panneaux officiels.</h3>
      <h4>Pour ce vendredi soir, les points seront verts pour les panneaux collés dans les dernières 12h.</h4> */}
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
      {
        (role !== "member" && role !== "")  &&
        <div style={{marginTop:"10px"}}>
          <Button color="red" onClick={()=>{navigate("/addmember")}}>
            [Admin] Ajouter un membre
          </Button>
        </div>
      }
      <p>Le site est optimisé pour une utilisation sur smartphone.</p>
      <Button color="grey" onClick={logout} style={{marginBottom: "20px"}}>
        Se déconnecter
      </Button>
    </Layout>
  )
}

export default HomePage;
