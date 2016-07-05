

class PostController{
    constructor(postView, requester, baseUrl, appKey){
        this._postView = postView;
        this.requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
    }

    showCreatePostPage(fullName, isLoggedIn){
        this._postView.showCreatePostPage(fullName, isLoggedIn);
    }
    
    createNewPost(data){
        if(data.content == ""){
            showPopup('error', "You haven't content!");
            return;
        }
        if(data.title == ""){
            showPopup('error', "You haven't title!");
            return;
        }
        this.requester.post(this._baseServiceUrl,data, function(responseData) {
            showPopup('success', 'Post are done.');
            redirectUrl('#/');
        }, function (responseData) {
            showPopup('error', 'Invalid Post.');
            
        });
    }
}