import React, { Component } from "react";
import "./login.css";
import { User } from "../../models/user";
import { NavLink } from "react-router-dom";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
import { Unsubscribe } from "redux";



interface LoginState {

    users: User[];
    username: string;
    password: string;
    error: string;
    logged: User | undefined;
    admin: User | undefined;
}
export class Login extends Component<any, LoginState>{
    private unsubscribeStore: Unsubscribe;
    public constructor() {
        super(undefined)
        this.state = {
            users: [],
            username: "",
            password: "",
            error: "",
            logged: store.getState().loggedUser,
            admin: store.getState().loggedAdmin
        }
        this.unsubscribeStore = store.subscribe(() => {
            this.setState({ logged: store.getState().loggedUser });
            this.setState({ admin: store.getState().loggedAdmin });
        }
        );
    }

    public componentDidMount(): void {
        fetch("http://localhost:3001/api/users")
            .then(response => response.json())
            .then(users => {
                this.setState({ users })
            })
    }


    public setUsername = (e: any): void => {
        const username = e.target.value;
        this.setState({ username });
    };

    public setPassword = (e: any): void => {
        const password = e.target.value;
        this.setState({ password });
    };

    public validate = (): void => {
        const username = this.state.username;
        const password = this.state.password;

        this.state.users.map(u => {
            if (u.username !== username || u.password !== password) {

                this.setState({ error: " Invalid username or password" });
            }
            else {
                if (username === "admin") {
                    const action = { type: ActionType.LoggedAdmin, payload: u };
                    store.dispatch(action);
                }
                const action = { type: ActionType.LoggedIn, payload: u };
                store.dispatch(action);
                this.props.history.push('/home');
            }
        })
    }
    public componentWillMount(): void {

        this.unsubscribeStore();
    }


    public render(): JSX.Element {
        return (
            <div className="login">

                <form>
                    <h2>Log In</h2>
                    <hr></hr>
                    <input type="text" placeholder="Your username" value={this.state.username} onChange={this.setUsername}></input>
                    <br></br>

                    <input type="password" placeholder="Your password" value={this.state.password} onChange={this.setPassword}></input>
                    <br></br>

                    <span>{this.state.error}</span>
                    <br></br>

                    <button type="button" onClick={this.validate}>Login</button>
                    <br></br>

                    <NavLink to="/signup" exact activeClassName="active-link">Don't have an account? Sign Up</NavLink>
                    <br></br>
                    <br></br>

                </form>

            </div>
        )
    }
}
