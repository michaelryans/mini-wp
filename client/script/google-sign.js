function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    axios
        .post(serverUrl + '/users/google-login', {token:id_token})
        .then(({data})=> {
            console.log(data) // token
            console.log('masuk then di function google sign in - script')
            localStorage.token = data.token
            app.panel.onLogin = false
            console.log('successfully added google token to localStorage')
            app.getAllArticle()
            app.getAllUserImages()
            
            if(localStorage.token) {
                app.isLogin = true
                app.getAllUserArticle()
            }
            Swal.fire(
                'Google login success!',
                'Welcome to mini-WP',
                'success'
              )
        })
        .catch(err => {
            console.log(err)
            console.log('error di google login - client')
        })
}

function signOut() { //google
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
    app.logout()
}

