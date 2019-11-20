import React, { Component } from "react";
import "./updateVacation.css";
import { store } from "../../redux/store";
import { User } from "../../models/user";
import { Vacation } from "../../models/vacation";
import { ActionType } from "../../redux/actionType";
import io from "socket.io-client";
import { Follow } from "../../models/follow";

let socket: any;

interface updateVacationState {

    vacation: Vacation;
    logged: User | undefined;
    admin: User | undefined;
    vacations: Vacation[];
    image: any;
   
}

export class UpdateVacation extends Component<any, updateVacationState>{

    public constructor(props: any) {
        super(props)
        this.state = {

            vacation: new Vacation,
            logged: store.getState().loggedUser,
            admin: store.getState().loggedAdmin,
            vacations: store.getState().vacations,
            image: null,
        }
    }



    public componentDidMount(): void {
        socket = io.connect("http://localhost:3002");
        let id = +this.props.match.params.vacID
        fetch("http://localhost:3001/api/vacations/" + id)
            .then(response => response.json())
            .then(vacation => {
                console.log(vacation);
                this.setState({ vacation })
            })
    }

    public componentWillUnmount(): void {
        if (socket) {
            socket.disconnect();
        }
    }

    public vacationsEmit(): void {
        socket.emit('admin-made-changes');
    }

    public updateVacation = (): void => {

        let id = this.state.vacation.vacationID;
        let description = this.state.vacation.description;
        let destination = this.state.vacation.destination;
        let startDate = this.state.vacation.startDate;
        let endDate = this.state.vacation.endDate;
        let image = this.state.vacation.image;
        let price = this.state.vacation.price;

        alert("The vacation id" + " " + id + " has been successfully updated");
        fetch(`http://localhost:3001/api/vacations/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                vacationID: id,
                description: description,
                destination: destination,
                startDate: startDate,
                endDate: endDate,
                image: image,
                price: price

            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(vacation => {
                const action = { type: ActionType.UpdateVacation, payload: vacation };
                store.dispatch(action);
                this.vacationsEmit();
                this.props.history.push("/home");
            })
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

    public setImage = (e: any): void => {

        console.log("img name: " + e.target.files[0].name);
        this.setState({ vacation: { ...this.state.vacation, image: e.target.files[0].name } })
        this.setState({
            image: e.target.files[0]
        })
    };
    public setPrice = (e: any): void => {

        let price = +e.target.value
        if (isNaN(price)) {
            price = 0
        }
        const vacation = { ...this.state.vacation };
        vacation.price = price;
        this.setState({ vacation });
    };

    public updateImage = (e: any): void => {
        this.setState({ vacation: { ...this.state.vacation, image: e.target.value } })
    };

    private isFormLegal(): boolean {
        return this.state.vacation.description === "" ||
            this.state.vacation.destination === "" ||
            this.state.vacation.startDate === "" ||
            this.state.vacation.endDate === "" ||
            this.state.vacation.price === 0
    }

    public render(): JSX.Element {
        return (
            <div className="updateVacation">

                <h2>Update this vacation</h2>

                <label>Destination : </label>
                <input type="text" onChange={this.setDestination} value={this.state.vacation.destination}></input>
                <br></br>

                <label>Description : </label>
                <input type="text" onChange={this.setDescription} value={this.state.vacation.description}></input>
                <br></br>

                <label>Start Date : </label>
                <input type="date" onChange={this.setStartDate} value={this.state.vacation.startDate}></input>
                <br></br>

                <label>End Date : </label>

                <input type="date" onChange={this.setEndDate} value={this.state.vacation.endDate}></input>
                <br></br>

                <label>Image : </label>
                <input type="text" value={this.state.vacation.image} onChange={this.updateImage}></input>
                <br></br>

                <input type="file" accept="image/*" name="image" onChange={this.setImage}></input>
                <br></br>

                <label>Price ($) : </label>
                <input type="text" onChange={this.setPrice} value={this.state.vacation.price}></input>
                <br></br>

                <button disabled={this.isFormLegal()} onClick={this.updateVacation}>Update Vacation</button>
            </div>
        );
    }
}