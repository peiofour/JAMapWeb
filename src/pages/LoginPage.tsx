import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, FormProps } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";

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

      <h4>Pour obtenir un accès, veuillez contacter @SuperBasque sur Telegram</h4>
      <p>Cette application est optimisée pour mobile.</p>
    </Layout>
  );
};

export default LoginPage;
