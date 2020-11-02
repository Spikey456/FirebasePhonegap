var firebaseConfig = {
    apiKey: "AIzaSyCrtAOZF_LsREEunsraF9jWthN7l1UkBf0",
    authDomain: "maimai-89309.firebaseapp.com",
    databaseURL: "https://maimai-89309.firebaseio.com",
    projectId: "maimai-89309",
    storageBucket: "maimai-89309.appspot.com",
    messagingSenderId: "650135569553",
    appId: "1:650135569553:web:8fe6972f65f21989eaeb30"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var signOutBtn = document.getElementById("signOut");

const auth = firebase.auth();

function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
    promise.catch(e => {alert(e.message); return});
    
    alert("Signed up");
}

function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
    promise.catch(e => {alert(e.message); return});

    alert("Signed in! Welcome "+ email.value+"!");
}

function signOut(){
    auth.signOut();
    alert("Signed out");
}

auth.onAuthStateChanged(function(user){
    var loginContainer = document.getElementById("loginContainer");
    var usercontainer = document.getElementById("userContainer");
    var containerHeader = document.getElementById("containerHeader");
    if(user){
        var email = user.email;
        alert("Active User: "+email)
     
        usercontainer.style.visibility = "visible"
        loginContainer.style.visibility = "hidden"
        containerHeader.innerHTML = "Welcome "+email+"!";
    }else{
        alert("No Active User")
        usercontainer.style.visibility = "hidden"
        loginContainer.style.visibility = "visible"
        containerHeader.innerHTML = "";
    }
})