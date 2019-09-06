import React,{Component} from 'react';

class Profile extends Component {
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