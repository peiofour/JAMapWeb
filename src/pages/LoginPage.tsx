import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Form } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

import { auth, logInWithEmailAndPassword } from '../utils/firebase';
import Layout from '../components/Layout';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth)
  
  useEffect(() => {
    if(loading) return;
    if(user) navigate("/")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])


  return (
    <Layout title="Connexion" className="login container">
      <Form loading={loading} onSubmit={() => logInWithEmailAndPassword(email, password)}>
        <Form.Input
          label="Nom d'utilisateur"
          fluid
          placeholder="User"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Input
          label="Mot de passe"
          fluid
          placeholder="Password"
          type="password"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Button type="submit">Connexion</Form.Button>
      </Form>

      <p>Le site est optimisé pour une utilisation sur smartphone.</p>
      <p>Suivre le <a href="http://t.me/jamapapp" target="_blank" rel="noreferrer">canal Telegram</a></p>
      <p>Développé par <a href="http://pierrefournier.dev" target="_blank" rel="noreferrer">Pierre Fournier</a> (DM par <a href="https://t.me/superbasque" target="_blank" rel="noreferrer">Telegram</a> pour recevoir des identifiants).<br/>Logo par Océane Larousse</p>
    </Layout>
  );
};

export default LoginPage;
