import React,{Component} from 'react';
import '../login/Login.css';
import './Home.css';
import profilePic from '../../../src/photo.jpg';
import {withStyles} from '@material-ui/core/styles';
import imageData from '../../common/imageData.js';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from'@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from'@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Checkbox  from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { CardHeader } from '@material-ui/core';
import Moment from 'react-moment';








const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
   
    gridListImages: {
      display:'flex',
        flexWrap: 'wrap',
        transform: 'translateZ(0)',
        width: '200%',
        overflow:'hidden',  
        paddingLeft:'10%',
         
    },
 
     title: {
        color: theme.palette.primary.light,
     },
     avatar: {
        margin: 0,      
      },  
      profileIconButton: {
        margin:theme.spacing(1),
          float:'right',
         
         
      }
});






class SearchedImage extends Component {



    static defaultProps = {
        image: {}
     }


constructor(){
    //state objects and its members are initialised here
    super();
    this.state={
        isEdit:false,   //for conditional rendering of like icons
        likeCount:0,
        isSearched:false,
        onChangeComments:"",
        comments:"",
        menuListFlag:false,
        responseData:[],
        profilePicture:"",
        userName:"",
        tags:"",
        

    }
}
//---------------------------------------------------------------------------------------------------



//event handler functions shall be below

 likeIconClickHandler=(e)=>{
    //dynamically toggle between classNames, as per condition
 if(!this.state.isEdit){
    this.setState({
isEdit:true, 
likeCount:this.state.likeCount +1 
    })
}
    else{
        this.setState({
            isEdit:false,  
            likeCount:this.state.likeCount  -1   
    })

} 

}


onChangeComments=(e)=>{

this.setState({
    onChangeComments:e.target.value   
})
 
}


commentsHandler=(e)=>{
console.log(e.target.value);
this.setState({
    comments:this.state.onChangeComments
})

}

menuListVisibilityHandler=(e)=>{

    this.setState({
        menuListFlag:true
    })
} 



//----------------------------------------------------------------------------------------


    render(){
        const {
            classes
        }
        =this.props;


        return(

<div className="flex-container">
                  
{/* inner content of each grid/card starts from below */}


    <Card key={this.props.image.id} className="parentGridContainer">
 
<CardHeader key={this.props.image.id} avatar={
  <Avatar alt="Remy Sharp" src={this.props.image.user.profile_picture} className={classes.avatar}/> 
}

title={this.props.image.user.username}

subheader={this.props.image.created_time}
/>

{/* <Grid container direction="row" alignItems="center">                     {/* remember why key is needed for each element within map */}

<CardContent key={this.props.image.id}>






    
<img  className="image-poster" src={this.props.image.images.standard_resolution.url} alt={image.title}/>
<br/>
<Divider/>








<Grid  key={this.props.image.id} container direction="column" alignItems="left" >

<Grid  item xs key={this.props.image.id}><Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',fontSize:'10px'}}>{image.caption.text}</Typography></Grid>
<Grid  item xs key={this.props.image.id} >
{

   /*  confusion on what comes within {}, and what not */
image.tags.map(tag =>(

        <Typography key={this.props.image.id} variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',color:'blue',fontSize:'10px'}}> #{tag}</Typography>
 ))}
        </Grid>

   
    
<Grid key={this.props.image.id} item xs >

<Grid key={this.props.image.id} container direction="row" alignItems="center" >
<Grid key={this.props.image.id} item>

    {/* eighter implement conditional rendering or control display of elements dynamically */}
{
   
    
    !(this.state.isEdit) ?
    
<FavoriteBorderIcon   key={this.props.image.id} className={this.state.favoriteBorderIconDisplay} style={{marginLeft:'-3px'}}   onClick={this.likeIconClickHandler}/> 
:
<Favorite  key={this.props.image.id} className={this.state.favoriteIconDisplay}  style={{marginLeft: '-3px',color:'red'}}  onClick={this.likeIconClickHandler}/>
}
&nbsp;
</Grid>

<Grid key={this.props.image.id} item > 


    <Typography  key={this.props.image.id}  variant="caption" component="caption"  style={{textAlign:'center',align:'center',display:'inline',fontSize:'15px'}}>
    { (this.props.image.likes.count)>0 ? <span> {this.props.image.likes.count} likes</span> :<span></span>  }
    </Typography>

</Grid>
</Grid>








<Grid key={this.props.image.id} container  direction="row" alignItems="center">
    {/* can below 2 items be dynmically added each time on ADD event ? */}
<Grid key={this.props.image.id} item  style={{fontWeight:'bold'}}>harshal_nrn: </Grid>
<Grid key={this.props.image.id} item> {this.state.comments}     </Grid>
</Grid>

<br/><br/>






    </Grid>

 </Grid>




 <Grid key={this.props.image.id} container direction="row" alignItems="left" >
<Input   key={this.props.image.id} variant="contained" placeholder="Add a Comment" style={{width:300,fontSize:'13px'}} onChange={this.onChangeComments} ></Input>
<Button  key={this.props.image.id} variant="contained" color="primary" size="large" style={{fontSize:'10px'}} onClick={this.commentsHandler}>Add</Button>
</Grid>


</CardContent>

</Card>
   </div>
        )
    }
}

export default withStyles(styles)(SearchedImage);





