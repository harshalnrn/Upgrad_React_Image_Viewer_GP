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
import Checkbox  from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';






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
});






class Home extends Component {

constructor(){
    //state objects and its members are initialised here
    super();
    this.state={
        isEdit:false,   //for conditional rendering of like icons
        likeCount:0,
        comments:""
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




commentsHandler=(e)=>{
    console.log(e.target.value)
this.setState({
    comments:e.target.value
})


}








    render(){
        const {
            classes
        }
        =this.props;


        return(

            <div>
            <header className="app-header">
                            <span className="header-logo">Image Viewer</span>
                        </header> 
                        

<div className="flex-container">
               
    <GridList cellHeight={750}  className={classes.gridListImages} cols ={3} >
       
{
    
imageData.map(image =>(

    <GridListTile className= "parentGridContainer" key={image.id}>

<Grid key={image.id} >   


    {/* inner content of each grid/card starts from below     */}


<Grid container direction="row" alignItems="center">                     {/* remember why key is needed for each element within map */}

<Grid item><Avatar alt="Remy Sharp" src={profilePic} className={classes.avatar}></Avatar></Grid>


 <Grid item xs={2} sm container> 
<Grid container direction="column">

<Grid item xs>
<Typography variant="caption" component="caption"  style={{padding:0,textAlign:'left',fontWeight:'bold'}}>harshal_nrn</Typography>
</Grid>
<Grid item xs>
<Typography variant="caption" component="caption"   style={{padding:0,textAlign:'left',display:'inline'}}>03/10/2019 16:08:08</Typography>
</Grid>


</Grid>
</Grid>
</Grid>






    
<img className="image-poster" src={image.image_url} alt={image.title}/>
<Divider/>








<Grid container direction="column" alignItems="left" >

<Grid item xs ><Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',paddingLeft:'18px',fontSize:'10px'}}>My Profile Pic</Typography></Grid>
<Grid item xs ><Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',paddingLeft:'18px',color:'blue',fontSize:'10px'}}>#TimePass</Typography></Grid>
<Grid item xs >
<Grid container direction="row" alignItems="center" >
<Grid item>

    {/* eighter implement conditional rendering or control display of elements dynamically */}
{!(this.state.isEdit) ?
<FavoriteBorderIcon className={this.state.favoriteBorderIconDisplay}  style={{padding:13}}  onClick={this.likeIconClickHandler}/> 
:
<Favorite className={this.state.favoriteIconDisplay}  style={{padding:13,color:'red'}} onClick={this.likeIconClickHandler}/>
}
</Grid>

<Grid item>
    <Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',fontSize:'15px'}}>
    { (this.state.likeCount)>0 ? <span>{this.state.likeCount}</span> :<span></span>  }
    </Typography></Grid>
</Grid>








<Grid container direction="row" alignItems="center">
<Grid item style={{paddingLeft:'16px',fontWeight:'bold'}}>harshal_nrn: </Grid>

<Grid item>&ensp;{this.state.comments}</Grid>
</Grid>
<br/><br/>






    </Grid>

 </Grid>




 <Grid container direction="row" alignItems="left" >
<Input  variant="contained" placeholder="Add a Comment" style={{marginLeft:'15px',marginRight:'10px',width:300,marginLeft:'10px',fontSize:'13px'}} onClick={this.commentsHandler}></Input>
<Button variant="contained" color="primary" size="large" style={{fontSize:'10px'}} >Add</Button>
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





