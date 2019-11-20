import React, { Component } from "react";
import "./header.css";

export class Header extends Component {
    public render(): JSX.Element {
        return (
            <div className="header">
                <h1>Go<span>Travel</span> &#9992; &#9992; &#9992;</h1>
            </div>
        );
    }
}