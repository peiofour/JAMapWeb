import React from 'react';
import { Form } from 'semantic-ui-react';
import Layout from '../components/Layout';

const LoginPage = () => {

  return (
    <Layout title="Connexion" className="login container">
      <Form>
        <Form.Input label="Nom d'utilisateur" fluid placeholder="User" />
        <Form.Input label="Mot de passe" fluid placeholder="Password" type="password" />
        <Form.Button>Connexion</Form.Button>
      </Form>

      <h4>Pour obtenir un accès, veuillez contacter @SuperBasque sur Telegram</h4>
      <p>Cette application est optimisée pour mobile.</p>
    </Layout>
  );
};

export default LoginPage;
