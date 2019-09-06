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

    openEditModalHandler = () => {
        this.setState({modalIsOpen: true});
        this.setState({editnameRequired: 'dispNone'});
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen: false});
        this.setState({postmodalIsOpen: false});
        this.setState({url: ""});
        this.setState({profile_picture: ""});
        this.setState({caption: ""});
        this.setState({tags: []});
        this.setState({likecount: 0});
        this.setState({iconChange: false});
        this.setState({comments: ""});
        this.setState({addclick: false});
        
    }

    
    editFullNameChangeHandler = event => {
        this.setState({editname: event.target.value})
    }

    updateClickHandler = (updatedname) => {
        if (this.state.editname === "" ) {
         this.setState({editnameRequired: 'dispBlock'});
    }
    else {
         this.setState({editnameRequired: 'dispNone'})

         this.setState({fullname: updatedname});
         this.setState({modalIsOpen: false});
    }

    postModalOpenHandler = (postId) => {
        console.log(postId);
        this.setState({postmodalIsOpen: true});

        let currentPost = this.state;
        currentPost.post = this.state.posts.filter((pos) => {
             return pos.id === postId                      
        })[0];
        
        this.setState({currentPost});
        console.log(this.state.post.images.standard_resolution.url);  
        console.log(this.state.post.tags)
        this.setState({likecount: this.state.post.likes.count})
    }

    iconClickHandler = (e) => {
        console.log(this.state.likecount)
        if (this.state.iconChange === false)
        {
            this.setState({iconChange: true});
            this.setState({
                likecount: this.state.likecount+1
            });
            console.log(this.state.likecount);
        }
        else{
            this.setState({iconChange: false});
            this.setState({
                likecount: this.state.likecount-1
            });
            console.log(this.state.likecount);
        }
    }

    onChangeCommentHandler = (e) => {
        this.setState({flexiblecomment: e.target.value})
    }

    commentClickHandler = () =>{
        this.setState({addclick: true});
        this.setState({finalcomment: this.state.flexiblecomment})
        this.setState({
            comments: this.state.finalcomment
        });
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

        <Modal isOpen={this.state.modalIsOpen} contentLabel='Edit Modal' ariaHideApp={false}
                onRequestClose={this.closeModalHandler}
                style={customStyles}>

                    <FormControl className={classes.formControl}>
                        <Typography className={classes.title} color="textPrimary">
                            EDIT
                        </Typography>
                        </FormControl> <br />
                        <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor='editname'>Full Name</InputLabel>
                        <Input id='editname' type='text' editname = {this.state.editname} 
                        onChange={this.editFullNameChangeHandler} /> 
                        <FormHelperText className={this.state.editnameRequired}> <span className='red'>
                            required </span>
                        </FormHelperText>        
                    </FormControl> <br /> <br />
                    <Button className={classes.editBtn} variant='contained' color='primary' 
                    onClick={this.updateClickHandler.bind(this, this.state.editname)}>UPDATE</Button>
                </Modal>
                
                <div className="posts-flex-container">
                    
                    <GridList cellHeight={250} cols={3} className={classes.gridList}>
                        {this.state.posts.map(post => (
                            <GridListTile onClick= {() => this.postModalOpenHandler(post.id)} className="released-movie-grid-item" key={"grid" + post.id}>
                                <img src={post.images.standard_resolution.url} className="movie-poster" alt={post.images} />
                            </GridListTile>
                        ))}
                    </GridList>

                    <Modal isOpen={this.state.postmodalIsOpen} contentLabel='Post Modal' ariaHideApp={false}
                onRequestClose={this.closeModalHandler}
                style={newStyles}>

                   
                        <div className = "post-modal-flex-container">
                        <div className = "left-container-modal">
                              <img src ={this.state.post.images.standard_resolution.url} className="post-style" />
                        </div>

                        <div className= "right-container-modal">
                            <div className="right-container-intro">                
                        <Avatar alt={this.state.post.user.username} src={this.state.post.user.profile_picture} className={classes.postavatar} />
                        <Typography className = {classes.modalUsername}>
                        {this.state.post.user.username}
                        </Typography>
                        </div>
                        <hr />
                        <Typography className={classes.captionName}>
                            {this.state.post.caption.text.substr(0, this.state.post.caption.text.indexOf('\n'))}
                        </Typography>
                        <Typography className = {classes.arrayTags}>
                         {this.state.post.tags.map((tag,key) =>
                         <span key={tag + "grid"}>#{tag}&nbsp;</span>
                            )}
                        </Typography>
                        <div className="user-comments">
                            {this.state.addclick === true &&
                        <Typography>
                        <span className="user-comment-span">{this.state.post.user.username}:</span> &nbsp; {this.state.finalcomment}
                            </Typography> }
                        </div>
                        <div className= "like-container-modal">
                        { this.state.iconChange === false
                        ? <FavoriteBorderIcon className = {classes.favBorderIcon} onClick= {this.iconClickHandler} />                      
                        : <FavoriteIcon className={classes.favIcon} onClick= {this.iconClickHandler} />
                        }
                        <Typography className = {classes.likeText}>
                        <span className="likes-count">{this.state.likecount}&nbsp;likes</span>
                        </Typography>
                        </div>
                        <div className = "comment-container-modal">
                        <FormControl>
                        <InputLabel htmlFor="comment">Add a Comment</InputLabel>
                        <Input id ="comment" variant="contained" type= "text" className="comment-modal" onChange={this.onChangeCommentHandler}></Input>
                        </FormControl>
                        <Typography>
                        <Button  variant="contained" color="primary" className={classes.addBtn} onClick={this.commentClickHandler}>ADD</Button>
                        </Typography>
                        </div>
                        </div>
                        </div>
                    
                    </Modal>
                
            </div> 
        </div>

        )
    }
}

export default withStyles(styles) (Profile);