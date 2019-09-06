import React,{Component} from 'react';
import './Login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 330,
        maxWidth: 330
    },
    title: {
        marginTop: '10px',
        fontSize: '1.7rem'
    },

    loginBtn: {
        marginLeft: '8px'  
    }

})

class Login extends Component{

    constructor() {
        super();
        this.state={
            username: "",
            loginPassword: "",
            usernameRequired: "dispNone",
            loginPasswordRequired: "dispNone",
            failedLogIn: "false" 
        }
    }

    
    loginClickHandler= () => {
        let username = "validuser";
        let password = "12345";
        let token =  "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";


        this.state.username === "" ? this.setState({usernameRequired: 'dispBlock'}) 
        : this.setState({usernameRequired: 'dispNone'})

        this.state.loginPassword === "" ? this.setState({loginPasswordRequired: 'dispBlock'}) 
        : this.setState({loginPasswordRequired: 'dispNone'})

       if (this.state.username !== "" && this.state.loginPassword !== ""){
           if (this.state.username === username && this.state.loginPassword === password) {
        this.setState({failedLogIn: false})
        sessionStorage.setItem('access-token', token);
        this.props.history.push('/home/'+token); 
       }
       else {
        this.setState({failedLogIn: true})
       }
    }
}

    inputUserNameChangeHandler =(e) => {
        this.setState({username: e.target.value})
    }

    inputLoginPasswordChangeHandler =(e) => {
        this.setState({loginPassword: e.target.value})
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
            <header className="app-header">
                <span className="header-logo">Image Viewer</span>
            </header>

            <div className="card-container">
                <Card className="login-card">
                    <CardContent>
                        <FormControl className={classes.formControl}>
                        <Typography className={classes.title} color="textPrimary">
                            LOGIN
                        </Typography>
                        </FormControl> <br />
                        <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor='username'>UserName</InputLabel>
                        <Input id='username' type='text' username = {this.state.username} 
                        onChange={this.inputUserNameChangeHandler} /> 
                        <FormHelperText className={this.state.usernameRequired}> <span className='red'>
                            required </span>
                        </FormHelperText>        
                    </FormControl> <br /> <br />

                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor='loginPassword'>Password</InputLabel>
                        <Input id='loginPassword' type='password' loginPassword={this.state.loginPassword}
                         onChange={this.inputLoginPasswordChangeHandler} /> 
                         <FormHelperText className={this.state.loginPasswordRequired}> <span className='red'>
                            required </span>
                        </FormHelperText>              
                    </FormControl><br /> <br />
                    <Button className={classes.loginBtn} variant='contained' color='primary' onClick={this.loginClickHandler}>LOGIN</Button>
                    </CardContent>
                </Card>
            </div>

            </div>
        )
    }
}

export default withStyles(styles) (Login);