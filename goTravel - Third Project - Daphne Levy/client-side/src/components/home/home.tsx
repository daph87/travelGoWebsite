import React, { Component } from "react";
import "./home.css";
import { User } from "../../models/user";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { Vacation } from "../../models/vacation";
import { Follow } from "../../models/follow";
import io from 'socket.io-client';

let socket: any;

interface HomeState {
    logged: User | undefined;
    admin: User | undefined;
    vacations: Vacation[];
    vacation: Vacation | undefined;
    users: User[];
    follows: Follow[];
}


export class Home extends Component<any, HomeState> {

    private unsubscribeStore: Unsubscribe;
    public constructor(props: any) {
        super(props)
        this.state = {
            logged: store.getState().loggedUser,
            admin: store.getState().loggedAdmin,
            vacations: store.getState().vacations,
            vacation: store.getState().vacation,
            users: [],
            follows: store.getState().follows,
        }

        this.unsubscribeStore =
            store.subscribe(() => {
                this.setState({ vacations: store.getState().vacations })
            }
            );
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
        if (socket) {
            socket.disconnect();
        }
    }


    public componentDidMount(): void {
        fetch("http://localhost:3001/api/vacations")
            .then(response => response.json())
            .then(vacations => {
                this.setState({ vacations })
                socket = io.connect("http://localhost:3002");
                socket.on('admin-made-changes', (vacations: Vacation[]): void => {
                    const action = { type: ActionType.GetAllVacations, payload: vacations };
                    store.dispatch(action);
                })
            })
        if (this.state.logged) {
            fetch("http://localhost:3001/api/follows/" + this.state.logged.userID)
                .then(response => response.json())
                .then(follows => {
                    this.setState({ follows });
                    console.log(follows)
                });
        }
    }


    public vacationsEmit(): void {
        socket.emit('admin-made-changes');
    }


    public logOut = (): void => {
        const action = { type: ActionType.LoggedOut, payload: undefined };
        store.dispatch(action);
    }

    public deleteVacation = (e: any): void => {
        if (window.confirm("Are you sure that you want to delete this vacation?") === true) {
            let id = +e.target.value;
            alert("vacation will be deleted " + id);
            fetch(`http://localhost:3001/api/vacations/${id}`, { method: "DELETE" })

                .then(vacation => {
                    console.log("delete", vacation);
                    const action = { type: ActionType.DeleteVacation, payload: id };
                    store.dispatch(action);
                    this.vacationsEmit();
                })
        }
    }

    public editButton = (e: any): void => {
        const id = +e.target.value;
        fetch("http://localhost:3001/api/vacations/" + id)
            .then(response => response.json())
            .then(vacation => {
                console.log(vacation);
                this.setState({ vacation });

                const action = { type: ActionType.UpdateVacation, payload: vacation };
                store.dispatch(action);

                this.props.history.push("/updateVacation/" + id);
            })
            .catch(err => alert(err));

    }

    public unFollowedButton = (e: any): void => {

        if (this.state.logged) {
            let uID = this.state.logged.userID;
            const vacID = +e.target.value;
            alert("This vacation has been successfully unfollowed");
            fetch(`http://localhost:3001/api/follows/usersfollows/${uID}/${vacID}`, { method: "DELETE" })
            const action = { type: ActionType.DeleteFollows, payload: vacID };
            store.dispatch(action);
            this.props.history.push("/user-follows");
        }
    }

    public followedButton = (e: any): any => {

        const vacationID = +e.target.value;
        if (this.state.logged) {
            const userID = this.state.logged.userID;
            fetch(("http://localhost:3001/api/follows"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    userID: userID,
                    vacationID: vacationID,
                }
                )
            })
                .then(response => response.json())
                .then(follow => {
                    alert("This vacation has been successfully followed.");
                    console.log(this.state.vacation);
                    const action = { type: ActionType.AddFollow, payload: follow };
                    store.dispatch(action);
                    this.props.history.push("/user-follows");
                })
                .catch(err => alert(err));
        }
    };


    public render(): JSX.Element {
        return (
            <div className="home">

                <h1>Welcome {this.state.logged ? this.state.logged.username : "Guest"}</h1>
                <br></br>

                {this.state.follows.map(v =>
                    <div style={{ display: this.state.logged ? "" : "none" }} className="vacation-card" key={v.description}>
                        <button value={v.vacationID} style={{
                            display: this.state.admin ? "" : "none"
                        }}
                            title="delete" className="delete-button" onClick={this.deleteVacation}>x</button>
                        <br></br>
                        <button value={v.vacationID} style={{ display: this.state.admin ? "" : "none" }} title="edit" className="editButton"
                            onClick={this.editButton}>Edit</button>

                        <button style={{
                            display: !this.state.admin ? this.state.logged ?
                                (this.state.follows.find(f => f.vacationID === v.vacationID ? true : false) ? "none" : "") : "none" : "none"
                        }}
                            value={v.vacationID} onClick={this.followedButton} >Follow</button>

                        <button data-key={v.description} style={{ display: this.state.follows.find(f => f.vacationID === v.vacationID) ? "" : "none" }}
                            value={v.vacationID} onClick={this.unFollowedButton} >Unfollow</button>
                        <h2>{v.destination}</h2>
                        <p>{v.description}</p>
                        <p>Start Date: {v.startDate}</p>
                        <p>End Date: {v.endDate}</p>
                        <p>{v.price} $</p>
                        <img alt={v.destination} src={'http://localhost:3001/assets/images/' + v.image}></img>
                    </div>
                )}

                {this.state.vacations.map(v =>
                    <div style={{
                        display: this.state.logged
                            ? (this.state.follows.find(f => f.vacationID === v.vacationID ? true : false)) ? "none" : "" : "none"
                    }}
                        className="vacation-card" key={v.description}>
                        <button value={v.vacationID} style={{ display: this.state.admin ? "" : "none" }}
                            title="delete" className="delete-button" onClick={this.deleteVacation}>&times;</button>

                        <button className="editButton" value={v.vacationID} style={{ display: this.state.admin ? "" : "none" }} title="edit"
                            onClick={this.editButton}>	&#9998;</button>
                        <button id="follow" style={{
                            display: !this.state.admin ? this.state.logged ?
                                (this.state.follows.find(f => f.vacationID === v.vacationID ? true : false) ? "none" : "") : "none" : "none"
                        }}
                            value={v.vacationID} onClick={this.followedButton} >Follow</button>
                        <button data-key={v.description} style={{ display: this.state.follows.find(f => f.vacationID === v.vacationID) ? "" : "none" }}
                            value={v.vacationID} onClick={this.unFollowedButton} >Unfollow</button>
                        <h2>{v.destination}</h2>
                        <p>{v.description}</p>
                        <p>Start Date: {v.startDate}</p>
                        <p>End Date: {v.endDate}</p>
                        <p>{v.price} $</p>
                        <img alt={v.destination} src={"http://localhost:3001/assets/images/" + v.image}></img>
                    </div>
                )}

            </div>



        );
    }
}

