import React, { Component } from "react";
import "./user-follows.css";
import { Follow } from "../../models/follow";
import { User } from "../../models/user";
import { store } from "../../redux/store";


interface UserFollowsState {
    follows: Follow[];
    logged: User | undefined;
}

export class UserFollows extends Component<any, UserFollowsState>{
    public constructor(props: any) {
        super(props)
        this.state = {
            follows: [],
            logged: store.getState().loggedUser,
        }
    }

    public componentDidMount(): void {
        if (this.state.logged) {
            fetch("http://localhost:3001/api/follows/" + this.state.logged.userID)
                .then(response => response.json())
                .then(follows => {
                    this.setState({ follows })
                });
        }
    }

    public render(): JSX.Element {
        return (
            <div className="user-follows">
                <h1>Welcome {this.state.logged ? this.state.logged.username : "Guest"}</h1>
                {this.state.follows.map(v =>
                    <div style={{ display: this.state.logged ? "" : "none" }} className="vacation-card" key={v.vacationID}>
                        <br></br>

                        <p>{v.description}</p>
                        <p>{v.destination}</p>
                        <p>{v.startDate}</p>
                        <p>{v.endDate}</p>
                        <p>{v.price} $</p>
                        <img alt={v.destination} src={"http://localhost:3001/assets/images/" + v.image}></img>
                    </div>
                )}
            </div>
        )
    }
}