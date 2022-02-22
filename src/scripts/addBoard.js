#!/usr/bin/node

import {database as db} from '../utils/firebase';
import {ref, onValue, set, child, get} from "firebase/database";

let dataTest;

onValue(ref(db, 'boards'), (snapshot) => {
  dataTest = snapshot.val();
})

console.log(dataTest);