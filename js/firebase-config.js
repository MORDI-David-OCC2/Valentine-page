import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWRQcZeNMGcuB2I2eF6yKv3Nfx9_jXduY",
  authDomain: "secret-valentine-d0646.firebaseapp.com",
  databaseURL: "https://secret-valentine-d0646-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "secret-valentine-d0646",
  storageBucket: "secret-valentine-d0646.appspot.com",
  messagingSenderId: "597717292866",
  appId: "1:597717292866:web:b8f905933ea7e973a7dadb",
  measurementId: "G-0G4QJ69NPR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function saveMessage(recipient, email, password, message) {
  set(ref(database, 'messages/' + recipient), {
    email: email,
    password: password,
    message: message
  });
}

export function getMessage(recipient, password, callback) {
  const dbRef = ref(database);
  get(child(dbRef, `messages/${recipient}`)).then((snapshot) => {
    if (snapshot.exists() && snapshot.val().password === password) {
      callback(snapshot.val().message);
    } else {
      callback(null);
    }
  }).catch((error) => {
    console.error(error);
    callback(null);
  });
}
