import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react';

import Layout from '../components/Layout';
import { auth, registerWithEmailAndPassword, firestoreDb } from '../utils/firebase';
import { query, collection, getDocs, where } from "firebase/firestore";

const RefOptions = [
  { key: 'member', text: 'Simple Adhérant', value: 'member' },
]

const RespoOptions = [
  { key: 'member', text: 'Simple Adhérant', value: 'member' },
  { key: 'referent', text: 'Référent', value: 'referent' },
]

const AdminOptions = [
  { key: 'member', text: 'Simple Adhérant', value: 'member' },
  { key: 'referent', text: 'Référent', value: 'referent' },
  { key: 'responsable', text: 'Responsable Régional/National', value: 'responsable' },
]

const AddMemberPage = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [errPassword, setErrPassword] = useState<boolean|string>(false);
  const [err, setErr] = useState(false);
  const [load, setLoad] = useState(false)


  const [role, setRole] = useState("");
  const [userRole, setUserRole] = useState<string|undefined>("member");

  const fetchUserRole = async () => {
    try {
      const q = query(collection(firestoreDb, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setRole(data.role)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(loading) return;
    if(!user) return navigate("/login");
    fetchUserRole()
    if(role === "") return;
    if(role === "member") return navigate("/")
  })

  const createAccount = () => {
    setErrPassword(false)
    setErr(false);
    if(email.length < 4 || password.length < 6){
      setErr(true);
      return
    }
    if(password !== confirmPassword){
      setErrPassword("Pas le même mot de passe")
      return
    }
    setLoad(true);
    registerWithEmailAndPassword(email, password, userRole).then(()=>{
      setLoad(false)
    })
  }

  const options = () => {
    switch(role){
      case "referent":
        return RefOptions;
      case "responsable":
        return RespoOptions;
      case "admin":
        return AdminOptions;
      default:
        return RespoOptions;
    }
  }
  
  return (
    <Layout title="Ajouter un member" className="add-member-page container">
      <Form loading={load} error={err} onSubmit={createAccount}>
        <Form.Input
          label="Nom d'utilisateur"
          fluid
          placeholder="User"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Form.Input
          error={errPassword}
          label="Mot de passe"
          fluid
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Form.Input
          error={errPassword}
          label="Confirmez le mot de passe"
          fluid
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <Message
          error
          header='Erreur'
          content="Nom d'utlisateur : 4 caractères minimum. Mot de passe : 6 caractères minimum."
        />
        <Form.Select
          options={options()}
          defaultValue='member'
          // @ts-ignore: Unreachable code error
          onChange={(e, data)=>setUserRole(data.value)}
        />
        <Form.Button type="submit">Ajouter</Form.Button>
      </Form>
    </Layout>
  )
}

export default AddMemberPage;