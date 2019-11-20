import React, { Component } from "react";
import "./menu.css";
import { NavLink } from "react-router-dom";
import { User } from "../../models/user";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";

interface MenuState {
    logged: User | undefined
    admin: User | undefined
}
export class Menu extends Component<any, MenuState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            logged: store.getState().loggedUser,
            admin: store.getState().loggedAdmin
        }
        store.subscribe(() => {
            this.setState({ logged: store.getState().loggedUser })
            this.setState({ admin: store.getState().loggedAdmin })
        }
        );
    }

    public logOut = (): void => {
        const action = { type: ActionType.LoggedOut, payload: undefined };
        store.dispatch(action);
        console.log(this.state.logged)


    }

    public render(): JSX.Element {
        return (
            <div className="menu">
                <nav>
                    <NavLink to="/login" activeClassName="active-link" style={{ display: this.state.logged ? "none" : "" }} >Login</NavLink>
                    <NavLink to="/home" activeClassName="active-link" exact>Home</NavLink>
                    <NavLink to="/signup" activeClassName="active-link" style={{ display: this.state.logged ? "none" : "" }} exact>Sign Up</NavLink>
                    <NavLink to="/login" style={{ display: this.state.logged ? "" : "none" }} onClick={this.logOut} activeClassName="active-link" exact>Log Out</NavLink>
                    <NavLink to="/addVacation" style={{ display: this.state.admin ? "" : "none" }} activeClassName="active-link" exact>Add vacation</NavLink>
                    <NavLink to="/user-follows" style={{ display: this.state.logged && !this.state.admin ? "" : "none" }} activeClassName="active-link" exact>My vacations</NavLink>

                </nav>
            </div>
        );
    }
}