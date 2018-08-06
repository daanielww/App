import React, {Component} from "react"
import errors from "../store/reducers/errors";

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state= {
            email: "", //these gonna be the default values of the input fields
            username: "",
            password: "",
            profileImageUrl: ""
        };
    }

    handleChange = e=> {
        this.setState({
            [e.target.name]: e.target.value //the name property is what appears in the input field. Gets the name of the field
            //from target.name. The computed property name function makes an object with those key value pair.
            // and then the setState function changes the state tofor that key to the value of whats in the current input field box.
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state).then(() => {
          console.log("LOGGED IN / REGISTERED SUCCESSFULLY")
        }).catch(err => {
            console.log("Login/registration failed")
        })
    }

    render() {
        const {email, username, password, profileImageUrl} = this.state
        const {heading, buttonText, signUp, errors} = this.props;
        return(
            <div>
                <div className= "row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                            <label htmlFor="email">Email:</label>
                            <input 
                                className="form-control"
                                id="email"
                                name="email" //the name property is what appears in the input field
                                onChange={this.handleChange}
                                type="text"
                                value={email}
                            />
                            <label htmlFor="password">Password:</label>
                            <input 
                                className="form-control"
                                id="Password"
                                name="password"
                                onChange={this.handleChange}
                                type="password"
                                value={password}
                            />
                            {signUp && (
                               <div>
                               <label htmlFor="username">Username:</label>
                                <input 
                                    className="form-control"
                                    id="username"
                                    name="username" //the name property is what appears in the input field
                                    onChange={this.handleChange}
                                    type="text"
                                    value={username}
                                />
                                <label htmlFor="image-url">Image Url:</label>
                                <input 
                                    className="form-control"
                                    id="image-url"
                                    name="profileImageUrl"
                                    onChange={this.handleChange}
                                    type="text"
                                    value={profileImageUrl}
                                />
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}