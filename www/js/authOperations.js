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
var userID;
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
        console.log("USER ID: "+user.uid)
        userID = user.uid
        var largeImage = document.getElementById('largeImage');
        var storageRef = firebase.storage().ref("images/"+userID+".jpg");
        storageRef.getDownloadURL().then(function(url) {
            largeImage.style.display = 'block';
            largeImage.src = url
        });
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



var pictureSource; // picture source
var destinationType; // sets the format of returned value
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    //startWatch();
}

function startWatch() {

    // Update acceleration every 3 seconds
    var options = { frequency: 3000 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

function onSuccess(acceleration) {
    /*alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');*/
    document.getElementById('largeImage').style.top = (acceleration.x+acceleration.x)*5 +"px";
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
        // Uncomment to view the base64-encoded image data
        // console.log(imageData);
        var data = imageData;
        // Get image handle
        //
        var smallImage = document.getElementById('largeImage');
        //alert(data)
        // Unhide image elements
        //
        smallImage.src = "data:image/jpeg;base64," + data;
        smallImage.style.display = 'block';
        var storageRef = firebase.storage().ref('images/'+userID+".jpg");
        // Show the captured photo
        // The in-line CSS rules are used to resize the image
        storageRef.putString(imageData, 'base64').then(function(snapshot) {
            alert('Uploaded a base64 string!');
          }).catch(function(error){
              alert(error);
          });
        // Show the captured photo
        // The in-line CSS rules are used to resize the image
        //
        
    }

    // Called when a photo is successfully retrieved
    //
function onPhotoURISuccess(imageURI) {
        // Uncomment to view the image file URI
        // console.log(imageURI);

        // Get image handle
        //
        console.log(imageURI);
        var largeImage = document.getElementById('largeImage');

        // Unhide image elements
        //
        largeImage.style.display = 'block';
        var storageRef = firebase.storage().ref('images/'+userID+".jpg");
        // Show the captured photo
        // The in-line CSS rules are used to resize the image
        storageRef.putString(imageURI, 'base64').then(function(snapshot) {
            alert('Uploaded a base64 string!');
          });
        //
        largeImage.src = "data:image/png;base64,"+imageURI;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,  
         });
}

// A button will call this function
//
function capturePhotoEdit() {
// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20,
    allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
// Retrieve image file location from specified source
    var options ={ quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: source }
    navigator.camera.getPicture(onPhotoURISuccess, onFail, options);
}

// Called if something bad happens.

//
function onFail(message) {
    alert('Failed because: ' + message);
}