import React from 'react';
import { Form } from 'semantic-ui-react';

const Login = () => {

  return (
    <div className="login container">
      <Form>
        <Form.Input label="Nom d'utilisateur" fluid placeholder="User" />
        <Form.Input label="Mot de passe" fluid placeholder="Password" type="password" />
        <Form.Button>Connexion</Form.Button>
      </Form>

      <h4>Pour obtenir un accès, veuillez contacter @SuperBasque sur Telegram</h4>
      <p>Cette application est optimisée pour mobile.</p>
    </div>
  );
};

export default Login;
