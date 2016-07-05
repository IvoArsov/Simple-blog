

class UserController{
    constructor(userView, requester, baseUrl, appKey){
        this._userView = userView;
        this.requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";
    }

    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }

    register(data){
        if(data.username.length < 6){
            showPopup('error', 'The username must minimum 6 symbols length.');
            return;
        }

        if(data.fullname.length < 6){
            showPopup('error', 'The Full name must minimum 6 symbols length.');
            return;
        }

        if(data.password != data.confirmPassword){
            showPopup('error', 'Repeat password!!!');
            return;
        }

        if(data.password.length < 8){
            showPopup('error', 'Too short password');
            return;
        }

        delete data['confirmPassword'];

        this.requester.post(this._baseServiceUrl, data, 
        function successCallback(response) {
            showPopup('success', 'Registration done.');
            redirectUrl('#/login');
        },
        function errorCallback(response){
            showPopup('error', 'Invalid try.');
            return;
        });
    }

    login(data){
        let requestUrl = this._baseServiceUrl + "login";
        this.requester.post(requestUrl, data,
            function successCallback(response) {
                sessionStorage.setItem('username', response.username);
                sessionStorage.setItem('_authToken', response._kmd.authtoken);
                sessionStorage.setItem('fullName', response.fullname);
                showPopup('success', 'You are login.');
                redirectUrl('#/');
            },
            function errorCallback(response){
                showPopup('error', 'Invalid try.');
                return;
            });
    }

    logout(){
        sessionStorage.clear();
    }
}
