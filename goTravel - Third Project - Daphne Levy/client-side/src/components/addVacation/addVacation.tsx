import React, { Component } from "react";
import "./addVacation.css";
import { Vacation } from "../../models/vacation";
import { User } from "../../models/user";
import { store } from "../../redux/store";
import io from "socket.io-client";
import { ActionType } from "../../redux/actionType";
import { Unsubscribe } from "redux";
import axios from "axios";

let socket: any;

interface AddVacationState {
    vacation: Vacation;
    image: any;
}


export class AddVacation extends Component<any, AddVacationState>{

    public constructor(props: any) {

        super(props)
        this.state = {
            vacation: new Vacation(),
            image: null,

        }
    }

    public componentDidMount(): void {
        socket = io.connect("http://localhost:3002");
    }

    public vacationEmit(): void {
        console.log("emit");
        socket.emit('admin-made-changes');
    }

    public addVacation = (e: any) => {
        const fd = new FormData();
        const addedVacation = this.state.vacation;
        console.log(this.state.vacation)
        fd.append("myImage", this.state.image, this.state.image.name)
        fd.append("addedVacation", JSON.stringify(addedVacation))
        console.log(JSON.stringify(addedVacation) + (" added vacation"));
        axios.post('http://localhost:3001/upload', fd)
        const action = { type: ActionType.AddVacation, payload: addedVacation };
        store.dispatch(action);
        console.log("hi", addedVacation)
        this.vacationEmit();
        alert("This vacation has been successfully added");
        this.props.history.push("/home");
    }

    public componentWillUnmount(): void {
        if (socket) {
            socket.disconnect();
        }

    }

    public setDescription = (e: any): void => {
        const description = e.target.value
        const vacation = { ...this.state.vacation };
        vacation.description = description;
        this.setState({ vacation });
    };

    public setDestination = (e: any): void => {
        const destination = e.target.value
        const vacation = { ...this.state.vacation };
        vacation.destination = destination;
        this.setState({ vacation });
    };

    public setStartDate = (e: any): void => {
        const startDate = e.target.value
        const vacation = { ...this.state.vacation };
        vacation.startDate = startDate;
        this.setState({ vacation });
    };

    public setEndDate = (e: any): void => {
        const endDate = e.target.value
        const vacation = { ...this.state.vacation };
        vacation.endDate = endDate;
        this.setState({ vacation });
    };

    public setImage = (e: any) => {
        console.log("img name: " + e.target.files[0].name);
        this.setState({
            image: e.target.files[0]
        })

    }

    public setPrice = (e: any): void => {
        let price = e.target.value;
        if (isNaN(price)) {
            price = 0
        }
        const vacation = { ...this.state.vacation };
        vacation.price = price;
        this.setState({ vacation });
    };

    private isFormLegal(): boolean {
        return this.state.vacation.description === "" ||
            this.state.vacation.destination === "" ||
            this.state.vacation.startDate === "" ||
            this.state.vacation.endDate === "" ||
            this.state.vacation.price === 0 ||
            this.state.image === null
    }

    public render(): JSX.Element {
        return (
            <div className="addVacation">

                <h2>Add a vacation</h2>
                <label>Destination : </label>
                <input type="text" onChange={this.setDestination} value={this.state.vacation.destination}></input>
                <br></br>

                <label>Description : </label>
                <input type="text" onChange={this.setDescription} value={this.state.vacation.description}></input>
                <br></br>

                <label>Start Date: </label>
                <input type="date" onChange={this.setStartDate} value={this.state.vacation.startDate}></input>
                <br></br>

                <label>End Date : </label>
                <input type="date" onChange={this.setEndDate} value={this.state.vacation.endDate}></input>
                <br></br>

                <label>Image : </label>
                <input type="file" accept="image/*" name="image" onChange={this.setImage}></input>
                <br></br>

                <label>Price ($) : </label>
                <input type="text" onChange={this.setPrice} value={this.state.vacation.price}></input>
                <br></br>

                <button disabled={this.isFormLegal()} onClick={this.addVacation}>Add Vacation</button>

            </div>
        )
    }
}


