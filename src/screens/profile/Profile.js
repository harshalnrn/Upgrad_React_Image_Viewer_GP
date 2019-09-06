import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import './Profile.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


const styles = theme => ({
    avatar: {
      margin: 10,
      backgroundColor: 'black'
    },
    postavatar: {
        marginTop: 10,
        float: 'right'
      },
    bigAvatar: {
        margin: 10,
        width: 120,
        height: 120,
        backgroundColor: 'black',
      },

    menuControl: {
        marginTop: 5,
    },

    infouserName: {
        fontStyle: 'bold',
        fontSize: '25px',
        marginLeft: 54,
        marginTop: 16,
        height: 70
    },
    fab: {
        margin: theme.spacing(2),
      },

      formControl: {
        margin: theme.spacing.unit,
      },

      title: {
        marginTop: '10px',
        fontSize: '1.7rem'
    },
    editBtn: {
        marginLeft: '7px'
    },
    addBtn: {
        fontSize: 17,
        width: 80,
        cursor: 'pointer',
        marginLeft: 15,
        marginTop: 7
    },
    gridList: {
        width: 1200,
        height: 380,
        cusrsor: 'pointer',
      },
      modalUsername : {
        marginTop: 15,
        marginLeft: 13,
        fontSize: '1rem',
        fontWeight: 500,
      },
      captionName: {
          marginLeft: 20,
          fontSize: '0.9rem',
          fontWeight: 400
      },
      arrayTags: {
        marginLeft: 20,
        fontSize: '0.9rem',
        fontStyle: 'italic',
        fontWeight: 300,
        color: '#add8e6',
        opacity: 2.0,
      },
      favBorderIcon : {
        marginLeft: 15,
        fontSize: 40,
        marginTop: 10
    },
      favIcon : {
          marginTop: 10,
          marginLeft: 15,
          fontSize: 40,
          color: 'red'
      },
      likeText: {
          marginTop: 15
      }

  });

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            profilepicture: "",
            username: "",
            media: "",
            follows: "",
            followed_by: "",
            fullname: "",
            open: false,
            anchorE1: null,
            modalIsOpen: false,
            editname: "",
            editnameRequired: "",
            posts: [],
            postModalOpenHandler: false,
            iconChange: false,
            likecount: 0,
            post: {
                id: "",
                images:{
                    standard_resolution: {
                        url: ""
                    }
                },
                user:{
                    profile_picture: "",
                    username:""
                },
                caption:{
                    text:""
                },
                tags:[],
                likes:{
                    count: 0
                },
                comments:""
            },
            flexiblecomment: "",
            finalcomment: "",
            addclick: false,
        }
    }

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

    headerlogoClickHandler = () => {
        // Go to the Home page
    }

    profileiconClickHandler = event => {
        this.setState({open: true})
        this.setState({anchorE1: event.currentTarget})
    }

    closeMenuHandler = () => {
        this.setState({open: false})
        // clear session storage and redirect to Login Page
    }


    render() {
        return (
            <div>
            <header className="app-header">

                <span className="header-logo" onClick={this.headerlogoClickHandler}>Image Viewer </span>
            <Avatar alt={this.state.username} src={this.state.profilepicture} className="avatar-logo" 
                onClick = {this.profileiconClickHandler}/>
            <Menu className = {classes.menuControl}
                id="simple-menu"
                open={this.state.open}
                anchorEl={this.state.anchorE1}
                onClose = {this.closeMenuHandler}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center", marginBottom: '5px' }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}             
            >
                <MenuItem onClick={this.closeMenuHandler}>Logout</MenuItem>
            </Menu>
                </header>

        <div className="information-section-container">
            <Avatar alt={this.state.username} src={this.state.profilepicture} className = {classes.bigAvatar} />
            <Typography className={classes.infouserName}>
            
            <div className= "temp">
            <span className="user-name">{this.state.username}</span> <br />
            <span className="posts-text-information-section">Posts: {this.state.media}</span>
            <span className="follows-text-information-section">Follows: {this.state.follows}</span>
            <span className="followedby-text-information-section">Followed By: {this.state.followedby}</span>
            </div>
            <span className="fullname-text-information-section">{this.state.fullname}</span>
            <Fab color="secondary" aria-label="edit" className={classes.fab} onClick= {this.openEditModalHandler} >
            <EditIcon />
            </Fab>
            </Typography>        
        </div>

        )
    }
}

export default withStyles(styles) (Profile);