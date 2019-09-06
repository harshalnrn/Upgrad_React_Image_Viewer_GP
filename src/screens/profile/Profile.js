import React,{Component} from 'react';

class Profile extends Component {


    componentWillMount() {
        let data = null;
        let xhr  = new XMLHttpRequest();
        let xhr1  = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function(){
            if (this.readyState === 4)
            {
                console.log(JSON.parse(this.responseText));
                that.setState({profilepicture: JSON.parse(this.responseText).data.profile_picture});
                that.setState({username: JSON.parse(this.responseText).data.username});
                that.setState({media: JSON.parse(this.responseText).data.counts.media});
                that.setState({follows: JSON.parse(this.responseText).data.counts.follows});
                that.setState({followedby: JSON.parse(this.responseText).data.counts.followed_by});
                that.setState({fullname: JSON.parse(this.responseText).data.full_name});
            }
        })

        xhr1.addEventListener("readystatechange", function(){
            if (this.readyState === 4)
            {
                that.setState({posts: JSON.parse(this.responseText).data});
                console.log(that.state.posts);
            }
        })

        xhr.open("GET","https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhr1.open("GET","https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhr.setRequestHeader("Cache-Control","no-cache");
        xhr1.setRequestHeader("Cache-Control","no-cache");
        xhr1.send(data);
        xhr.send(data);
    }
    
    render() {
        return (
            <div>
            <header className="app-header">
                <span className="header-logo" onClick={this.headerlogoClickHandler}>Image Viewer </span>

                </header>
                </div>
        )
    }
}

export default Profile;