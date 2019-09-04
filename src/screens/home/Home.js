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






class Home extends Component {

constructor(){
    //state objects and its members are initialised here
    super();
    this.state={
        isEdit:false,   //for conditional rendering of like icons
        likeCount:0,
        onChangeComments:"",
        comments:"",
        menuListFlag:false,
        responseData:[],
        profilePicture:"",
        

    }
}
//---------------------------------------------------------------------------------------------------

componentWillMount(){
let data=null; //request body remains null since its get
let xhr=new XMLHttpRequest();
let that=this;
xhr.addEventListener("readystatechange",function(){

if(this.readyState ===4){
    console.log(JSON.parse(this.responseText)); //convert this string to json object
    that.setState({
        responseData:JSON.parse(this.responseText).data,
       profilePicture:JSON.parse(this.responseText).data[0].user.profile_picture

    })
}
})
xhr.open("GET",this.props.baseUrl+"users/self/media/recent?access_token=18968665551.0214b37.f2788433f83a46cda0dc99d50173a761");
xhr.setRequestHeader("Cache-Control","no-cache");
xhr.send(data);

}





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
            likeCount:this.state.likeCount -1   
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

            <div>
              
              
              
                       
             <header className="app-header">
                <div>
                            <span className="header-logo">Image Viewer</span>
                           

                            <span className="header-search-box">
                               <TextField  placeholder="Search..." margin="normal" style={{backgroundColor:'#c0c0c0',float:'right',marginRight:'160px',marginBottom:'15px',width:'300px',borderRadius:'4px'}}
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <SearchIcon  color="black"/>
                                      </InputAdornment>
                                     )
                                    }}
                                />
                                  
                                 
                            </span>     

                  
<span style={{float:'right',marginRight:'-420px'}}>
<IconButton onClick={this.menuListVisibilityHandler}> 
<img src={this.state.profilePicture}  style={{height:'50px',width:'50px',borderRadius:'25px'}} alt='profile image not available'/> 

</IconButton>
</span>

                            </div>  

                        </header> 


{(this.state.menuListFlag) ?
<div className='menuList'>
<Paper id="menu-list-grow">
                <ClickAwayListener /* onClickAway={handleClose} */>
                  <MenuList style={{borderRadius:'15px'}}>
                    <MenuItem /* onClick={handleClose} */>Profile</MenuItem>
                    <MenuItem /* onClick={handleClose} */>My account</MenuItem>
                    <MenuItem /* onClick={handleClose} */>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
</div>
:
<span></span>

}





<div className="flex-container">
               
    <GridList cellHeight={750}  className={classes.gridListImages} cols ={3} >
       
{



    
this.state.responseData.map(image =>(

 


    

/* <Grid  value={image} > */    /* why is the unique key not recognizigin each grid uniquely!! */


    /* inner content of each grid/card starts from below     */

    <Card key={this.state.responseData.id}  className= "parentGridContainer">
 
<CardHeader key={this.state.responseData.id} avatar={
  <Avatar alt="Remy Sharp" src={this.state.profilePicture} className={classes.avatar}/> 
}
title={image.user.username}
subheader="03/10/2019 16:08:08"
/>
{/* <Grid container direction="row" alignItems="center">                     {/* remember why key is needed for each element within map */}

<CardContent key={this.state.responseData.id}>






    
<img key={this.state.responseData.id} className="image-poster" src={image.images.standard_resolution.url} alt={image.title}/>

<Divider/>








<Grid  key={this.state.responseData.id} container direction="column" alignItems="left" >

<Grid  item xs ><Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',fontSize:'10px'}}>{image.caption.text}</Typography></Grid>
<Grid  item xs ><Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',color:'blue',fontSize:'10px'}}>#TimePass</Typography></Grid>
<Grid  item xs >
<Grid  container direction="row" alignItems="center" >
<Grid  item>

    {/* eighter implement conditional rendering or control display of elements dynamically */}
{!(this.state.isEdit) ?
<FavoriteBorderIcon  className={this.state.favoriteBorderIconDisplay} style={{marginLeft:'-3px'}}   onClick={this.likeIconClickHandler}/> 
:
<Favorite  className={this.state.favoriteIconDisplay}  style={{marginLeft: '-3px',color:'red'}} onClick={this.likeIconClickHandler}/>
}
</Grid>

<Grid key={this.state.responseData.id} item >
    <Typography   variant="caption" component="caption"  style={{textAlign:'center',align:'center',display:'inline',fontSize:'15px'}}>
    { (this.state.likeCount)>0 ? <span>{this.state.likeCount}</span> :<span></span>  }
    </Typography></Grid>
</Grid>








<Grid key={this.state.responseData.id} container  direction="row" alignItems="center">
    {/* can below 2 items be dynmically added each time on ADD event ? */}
<Grid item  style={{fontWeight:'bold'}}>harshal_nrn: </Grid>
<Grid id={image.id} item> {this.state.comments}     </Grid>
</Grid>

<br/><br/>






    </Grid>

 </Grid>




 <Grid key={this.state.responseData.id} container direction="row" alignItems="left" >
<Input   variant="contained" placeholder="Add a Comment" style={{width:300,fontSize:'13px'}} onChange={this.onChangeComments} ></Input>
<Button  variant="contained" color="primary" size="large" style={{fontSize:'10px'}} onClick={this.commentsHandler} value={image.id}>Add</Button>
</Grid>


</CardContent>

</Card>
)
)

}

    </GridList>
    </div>
   </div>
        )
    }
}

export default withStyles(styles)(Home);





