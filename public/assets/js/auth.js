import DOMStrings from './helpers/authClasses.js';
import config from './configs/authConfig.js';
import LogEntry from './LogEntry.js';

export function auth() {
    // Initialize Firebase
    firebase.initializeApp(config);

    // Get Elements
    const regEmail = document.querySelector(DOMStrings.regEmail);
    const regPass = document.querySelector(DOMStrings.regPass);
    const btnReg = document.querySelector(DOMStrings.btnReg);
    const signInEmail = document.querySelector(DOMStrings.signInEmail);
    const signInPass = document.querySelector(DOMStrings.signInPass);
    const btnSignIn = document.querySelector(DOMStrings.btnSignIn);
    const currentUser = document.querySelector(DOMStrings.currentUser);
    const btnLogout = document.querySelector(DOMStrings.btnLogout);
    const alertLogin = document.querySelector(DOMStrings.alertLogin);
    const alertReg = document.querySelector(DOMStrings.alertReg);
    const auth = firebase.auth();
    let app;

    // Add login event
    btnSignIn.addEventListener('click', () => {

        // Get Email and Password
        const email = signInEmail.value;
        const pass = signInPass.value;

        // Lоgin in
        auth.signInWithEmailAndPassword(email, pass)
            .then( () => {
                alertLogin.classList.add('d-none');
                $(DOMStrings.loginModal).modal('hide');
            })
            .catch((e) => {
                alertLogin.innerText = e.message;
                alertLogin.classList.remove('d-none');
            });
    });

    // Add registration event
    btnReg.addEventListener('click', () => {
        const email = regEmail.value;
        const pass = regPass.value;

        //Sign in
        auth.createUserWithEmailAndPassword(email, pass)
            .then( () => {
                alertReg.classList.add('d-none');
                $(DOMStrings.regModal).modal('hide');
            })
            .catch((e) => {
                alertReg.innerText = e.message;
                alertReg.classList.remove('d-none');
            });

    });

    // Add signOut event
    btnLogout.addEventListener('click', () => {
        app.remove();
        auth.signOut();
    });

    // Add listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        const userOut = document.querySelector(DOMStrings.userOut);
        const userIn = document.querySelector(DOMStrings.userIn);

        if (firebaseUser) {
            userIn.classList.remove('d-none');
            userOut.classList.add('d-none');
            currentUser.textContent = firebaseUser.email;
            app = new LogEntry;
        } else {
            userIn.classList.add('d-none');
            userOut.classList.remove('d-none');
        }
    });
}
