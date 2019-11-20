import React, { Component } from "react";
import "./signup.css";
import { User } from "../../models/user";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";


interface SignupState {

    users: User[];
    user: User;
    usernameError: string;
    firstNameError: string;
    lastNameError: string;
    passwordError: string;
}
export class Signup extends Component<any, SignupState>{

    public constructor() {
        super(undefined)
        this.state = {
            users: [],
            user: new User(),
            usernameError: "",
            firstNameError: "",
            lastNameError: "",
            passwordError: "",
        }
    }

    public componentDidMount(): void {
        fetch("http://localhost:3001/api/users")
            .then(response => response.json())
            .then(users => {
                console.log(users);
                this.setState({ users })
            })
    }

    public setFirstName = (e: any): void => {
        const firstName = e.target.value;
        if (firstName.length > 0) {
            this.setState({ firstNameError: "" })
        }
        else {
            this.setState({ firstNameError: "compulsory" })
        }
        const user = { ...this.state.user };
        user.firstName = firstName;
        this.setState({ user });
    };

    public setPassword = (e: any): void => {
        const password = e.target.value;
        if (password.length < 4) {
            this.setState({ passwordError: "it needs minimum 4 letters" })
        }
        else {
            this.setState({ passwordError: "" });

        }
        const user = { ...this.state.user };
        user.password = password;
        this.setState({ user });
    };

    public setLastName = (e: any): void => {
        const lastName = e.target.value;

        if (lastName.length > 0) {
            this.setState({ lastNameError: "" })
        }
        else {
            this.setState({ lastNameError: "compulsory" })
        }
        const user = { ...this.state.user };
        user.lastName = lastName;
        this.setState({ user });
    };

    private isFormLegal(): boolean {
        return this.state.usernameError === "username already exists" ||
            this.state.usernameError === "it needs minimum 4 letters" ||
            this.state.passwordError === "it needs minimum 4 letters" ||
            this.state.user.firstName === "" ||
            this.state.user.lastName === "" ||
            this.state.user.username === "" ||
            this.state.user.password === "";
    }

    public setUsername = (e: any): void => {
        const username = e.target.value;
        if (username.length < 4) {
            this.setState({ usernameError: "it needs minimum 4 letters" })
        }
        else {
            this.setState({ usernameError: "" });

        }
        this.state.users.map(users => {
            if (users.username === username) {
                this.setState({ usernameError: "username already exists" });
            }
        })
        const user = { ...this.state.user };
        user.username = username;
        this.setState({ user });
    };


    public addUser = (): void => {

        fetch(("http://localhost:3001/api/users"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => response.json())
            .then(user => {
                alert("Your account has been successfully created.");
                const action = { type: ActionType.AddUser, payload: user };
                store.dispatch(action);

                this.props.history.push("/login");

            })
            .catch(err => alert(err));
    };

    public render(): JSX.Element {
        return (
            <div className="signUp">

                <form>
                    <h2>Sign Up</h2>
                    <hr></hr>
                    <input type="text" onChange={this.setFirstName} value={this.state.user.firstName} placeholder="Your first name"></input>
                    <br></br><span>{this.state.firstNameError}</span>
                    <br></br>

                    <input type="text" onChange={this.setLastName} value={this.state.user.lastName} placeholder="Your last name"></input>
                    <br></br><span>{this.state.lastNameError}</span>
                    <br></br>

                    <input type="text" onChange={this.setUsername} value={this.state.user.username} placeholder="Your username"></input>
                    <br></br><span>{this.state.usernameError}</span>
                    <br></br>

                    <input type="password" onChange={this.setPassword} value={this.state.user.password} placeholder="Your password"></input>
                    <br></br><span>{this.state.passwordError}</span>
                    <br></br>
                    <button disabled={this.isFormLegal()} type="button" onClick={this.addUser}>Sign Up</button>
                </form>

            </div>
        )
    }

}

