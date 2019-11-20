import React, { Component } from "react";
import "./layout.css";
import { User } from "../../models/user";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../login/login";
import { Signup } from "../signup/signup";
import { Menu } from "../menu/menu";
import { Home } from "../home/home";
import { Header } from "../header/header";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
import { Unsubscribe } from "redux";
import { UpdateVacation } from "../updateVacation/updateVacation";
import { AddVacation } from "../addVacation/addVacation";
import { UserFollows } from "../userfollows/user-follows";


interface LayoutState {
    logged: User | undefined;

}
export class Layout extends Component<any, LayoutState>{
    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props)
        this.state = {
            logged: store.getState().loggedUser,

        }

        this.unsubscribeStore = store.subscribe(() =>
            this.setState({ logged: store.getState().loggedUser })
        );

    }
    public componentWillMount(): void {
        this.unsubscribeStore();
    }


    public logOut = (): void => {
        const action = { type: ActionType.LoggedOut, payload: undefined };
        store.dispatch(action);
    }

    public render(): JSX.Element {
        return (
            <div className="layout">

                <BrowserRouter>
                    <header><Header /></header>
                    <main>
                        <Switch>

                            <Route path="/login" component={Login} exact />
                            <Route path="/signup" component={Signup} exact />
                            <Route path="/user-follows" component={UserFollows} exact />
                            <Route path="/home" component={Home} exact />
                            <Route path="/updateVacation/:vacID" component={UpdateVacation} exact />
                            <Route path="/addVacation" component={AddVacation} exact />
                            <Redirect from="/" to="/home" exact />

                        </Switch>
                    </main>
                    <aside>
                        <Menu></Menu>

                    </aside>
                </BrowserRouter>

            </div>
        );
    }

}