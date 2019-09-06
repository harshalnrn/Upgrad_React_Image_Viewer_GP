import React,{Component} from 'react';
import '../login/Login.css';
import './Home.css';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from'@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
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
import Paper from '@material-ui/core/Paper';
import { CardHeader } from '@material-ui/core';








const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },


    card: {
        borderWidth:'0.5px',
        margin: '10px',
        borderStyle:'groove',
        display: 'block',
        minWidth:'590px',
        height:'500px',

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
        isSearched:false,
        onChangeComments:"",
        comments:"",
        menuListFlag:false,
        responseData:[],
        profilePicture:"",
        userName:"",
        tags:"",
        id:"",
        searchedImages:[],
        outsideClick:false,
    
        

    }
}
//---------------------------------------------------------------------------------------------------

componentWillMount(){
let data=null; //request body remains null since its get
let xhr=new XMLHttpRequest();
let xhr1=new XMLHttpRequest();
let that=this;
xhr.addEventListener("readystatechange",function(){

if(this.readyState ===4){
    console.log(JSON.parse(this.responseText)); //convert this string to json object
    that.setState({
        responseData:JSON.parse(this.responseText).data,
       

    })

}

})

xhr1.addEventListener("readystatechange",function(){
    if(this.readyState ===4){
        console.log(JSON.parse(this.responseText)); //convert this string to json object
        that.setState({
           profilePicture:JSON.parse(this.responseText).data.profile_picture,
           userName:JSON.parse(this.responseText).data.username
        })
    
    }
    
    })






xhr.open("GET",this.props.baseUrl+"users/self/media/recent?access_token=18968665551.0214b37.f2788433f83a46cda0dc99d50173a761");
xhr.setRequestHeader("Cache-Control","no-cache");
xhr.send(data);

xhr1.open("GET",this.props.baseUrl+"users/self/?access_token=18968665551.0214b37.f2788433f83a46cda0dc99d50173a761");
xhr1.setRequestHeader("Cache-Control","no-cache");
xhr1.send(data);




}











//event handler functions shall be below

likeIconClickHandler= (id) => {
    //dynamically toggle between classNames, as per condition
   console.log(id); 

 if(!this.state.isEdit){

    this.setState({
        id:id,
isEdit:true, 
likeCount:this.state.likeCount +1 
    })
    
}
    else if(this.state.isEdit){
        this.setState({
            id:id,
            isEdit:false,  
            likeCount:this.state.likeCount  -1   
    })
    

} 
}





searchEventHandler=(e)=>{
console.log('inside search event handler')
this.setState({
    searchedImages:[],
    responseData:this.state.searchedImages
})
this.state.responseData.map(image =>{

    console.log(e.target.value)
if((image.caption.text).includes(e.target.value)){
this.state.searchedImages.push(image);
}
})

if (this.state.searchedImages.length>0) {
console.log('size of array is greater than 0')
this.setState({
    responseData:this.state.searchedImages
})
}




}

onChangeComments=(e)=>{

this.setState({

    onChangeComments:e.target.value   
})
 
}


commentsHandler=(id)=>{

this.setState({
    id:id,
    comments:this.state.onChangeComments
})

}

menuListVisibilityHandler=(e)=>{

    this.setState({
        outsideClick:false,
        menuListFlag:true
    })
}

handleClickAway = (e) => {
    this.setState({
        outsideClick:true
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
                               <TextField  placeholder="Search..." margin="normal" style={{backgroundColor:'#c0c0c0',float:'right',marginRight:'160px',marginTop: '20px', width:'300px',borderRadius:'4px', }}
                                // below needed to add embedded search icon
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <SearchIcon  color="black"/>
                                      </InputAdornment>
                                     )
                                    }}

                                    onChange={this.searchEventHandler}
                                />
                                  
                                 
                            </span>     

                  
<span style={{float:'right',marginRight:'-420px'}}>
<IconButton onClick={this.menuListVisibilityHandler}> 
<img src={this.state.profilePicture}  style={{height:'50px',width:'50px',borderRadius:'25px'}} alt=''/> 

</IconButton>
</span>

                            </div>  

                        </header> 


{(this.state.menuListFlag && !this.state.outsideClick) ?
<div className='menuList'>
<Paper id="menu-list-grow">
                <ClickAwayListener  onClickAway={this.handleClickAway} >
                  <MenuList style={{borderRadius:'15px'}}>
                    <MenuItem /* onClick={handleClose} */>My account</MenuItem>
                    <Divider/>
                    <MenuItem /* onClick={handleClose} */>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
</div>
:
<span></span>

}



{/* ------------------------------------------------------------------------------------------------------- */}



<div className="flex-container">
               
    <GridList cellHeight={750}  className={classes.gridListImages} cols ={3} >
    

            
       
{ 


this.state.responseData.map(image =>(

    /* inner content of each grid/card starts from below     */
    <Card key={image.id} className={classes.card}>
 
<CardHeader avatar={
  <Avatar alt="Remy Sharp" src={this.state.profilePicture} className={classes.avatar}/> 
}

title={this.state.userName}

subheader={image.created_time}
/>

{/* <Grid container direction="row" alignItems="center">                     {/* remember why key is needed for each element within map */}

<CardContent>






    
<img  className="image-poster" src={image.images.standard_resolution.url} alt={image.title}/>
<br/>
<Divider/>








<Grid   container direction="column" alignItems="left" >

<Grid  item xs ><Typography variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',fontSize:'14px'}}>{image.caption.text}</Typography></Grid>
<Grid  item xs  >
{

   /*  confusion on what comes within {}, and what not */
image.tags.map(tag =>(

        <Typography key = {image.id} variant="caption" component="caption"  style={{padding:0,textAlign:'center',align:'center',display:'inline',color:'blue',fontSize:'13px'}}> #{tag}</Typography>
 ))}
        </Grid>

   
    
<Grid  item xs >

<Grid  container direction="row" alignItems="center" >
<Grid item>

    {/* eighter implement conditional rendering or control display of elements dynamically */}
{
   
    
    (this.state.isEdit && (image.id===this.state.id) ) ?
    <Favorite  key={image.id} className={this.state.favoriteIconDisplay}  style={{marginLeft: '-3px',color:'red'}}  onClick={() => this.likeIconClickHandler(image.id)}/>
    :
<FavoriteBorderIcon   key={image.id} className={this.state.favoriteBorderIconDisplay} style={{marginLeft:'-3px'}}   onClick={() =>this.likeIconClickHandler(image.id)}/> 


}
&nbsp;
</Grid>

<Grid  item > 


    <Typography    variant="caption" component="caption"  style={{textAlign:'center',align:'center',display:'inline',fontSize:'15px'}}>
    {/* below note the separate conditional cases , where one is when retreived, and other on event */}
    { ((image.id===this.state.id))? <span> {image.likes.count + this.state.likeCount } likes</span> :<span/>
    }


    {(image.likes.count>0 && image.id!=this.state.id  ) ?
    <span> {image.likes.count} likes</span> :
    <span/>
    }
    


    </Typography>

</Grid>
</Grid>








<Grid  container  direction="row" alignItems="center">
    {/* can below 2 items be dynmically added each time on ADD event ? */}

<Grid  item  style={{fontWeight:'bold'}}>{
    (this.state.comments!="" && image.id===this.state.id ) ?
    this.state.userName + ':'
    :
    <span/>
    } </Grid>


<Grid  item> 
{
    (this.state.comments!="" &&image.id===this.state.id) ?
    this.state.comments
    :
    <span/>
    }     
</Grid>
</Grid>

<br/><br/>






    </Grid>

 </Grid>



 {
         (this.state.onChangeComments!="") ?
     <InputLabel style={{fontSize: '10px', color:'blue'}}> Add Comment</InputLabel> :
     <span/>
     }
 <Grid  container direction="row" alignItems="left" >
   
     
<Input    variant="contained" placeholder="Add a Comment" style={{width:480,fontSize:'13px'}} onChange={this.onChangeComments} ></Input>
<Button   variant="contained" color="primary" size="large" style={{fontSize:'10px',margin:'2px'}} onClick={() => this.commentsHandler(image.id)}>Add</Button>
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





