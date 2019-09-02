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
        margin: 25,      
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
<img src={profilePic}  style={{height:'50px',width:'50px',borderRadius:'25px'}} alt='profile image not available'/> 

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
    
imageData.map(image =>(

    


    <GridListTile  key={image.id} value={image}className= "parentGridContainer">

<Grid  value={image} >      {/* why is the unique key not recognizigin each grid uniquely!! */}


    {/* inner content of each grid/card starts from below     */}


<Grid container direction="row" alignItems="center">                     {/* remember why key is needed for each element within map */}

<Grid item><Avatar alt="Remy Sharp" src={profilePic} className={classes.avatar}></Avatar></Grid>


 <Grid  item xs={2} sm container> 
<Grid container direction="column">

<Grid  item xs>
<Typography variant="caption" component="caption"  style={{padding:0,textAlign:'left',fontWeight:'bold'}}>harshal_nrn</Typography>
</Grid>
<Grid  item xs>
<Typography variant="caption" component="caption"   style={{padding:0,textAlign:'left',display:'inline'}}>03/10/2019 16:08:08</Typography>
</Grid>


</Grid>
</Grid>
</Grid>






    
<img className="image-poster" src={image.image_url} alt={image.title}/>
<Divider/>








<Grid  container direction="column" alignItems="left" >

<Grid  item xs ><Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',paddingLeft:'18px',fontSize:'10px'}}>My Profile Pic</Typography></Grid>
<Grid  item xs ><Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',paddingLeft:'18px',color:'blue',fontSize:'10px'}}>#TimePass</Typography></Grid>
<Grid  item xs >
<Grid  container direction="row" alignItems="center" >
<Grid  item>

    {/* eighter implement conditional rendering or control display of elements dynamically */}
{!(this.state.isEdit) ?
<FavoriteBorderIcon  className={this.state.favoriteBorderIconDisplay}  style={{padding:13}}  onClick={this.likeIconClickHandler}/> 
:
<Favorite  className={this.state.favoriteIconDisplay}  style={{padding:13,color:'red'}} onClick={this.likeIconClickHandler}/>
}
</Grid>

<Grid item >
    <Typography   variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',fontSize:'15px'}}>
    { (this.state.likeCount)>0 ? <span>{this.state.likeCount}</span> :<span></span>  }
    </Typography></Grid>
</Grid>








<Grid container  direction="row" alignItems="center">
    {/* can below 2 items be dynmically added each time on ADD event ? */}
<Grid item  style={{paddingLeft:'16px',fontWeight:'bold'}}>harshal_nrn: </Grid>
<Grid id={image.id} item> {this.state.comments}     </Grid>
</Grid>

<br/><br/>






    </Grid>

 </Grid>




 <Grid container direction="row" alignItems="left" >
<Input   variant="contained" placeholder="Add a Comment" style={{marginLeft:'15px',marginRight:'10px',width:300,marginLeft:'10px',fontSize:'13px'}} onChange={this.onChangeComments} ></Input>
<Button  variant="contained" color="primary" size="large" style={{fontSize:'10px'}} onClick={this.commentsHandler} value={image.id}>Add</Button>
</Grid>




</Grid>
</GridListTile>
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





