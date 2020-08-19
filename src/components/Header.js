import React from "react";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            hours: null,
            mintues: null,
            seconds: null,
            timeOfDay: null,
            period: null
        }
    }

    componentDidMount() {
        this.updateTime();
        // Set updateTime to run every second in the background
        this.timerID = setInterval(this.updateTime,1000);
    }
    
    componentWillUnmount() {
        // Stop updateTime from running once we are done
        clearInterval(this.timerID);
    }

    updateTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let mintues = date.getMinutes();
        let seconds = date.getSeconds();
        let timeOfDay;
        let period = "pm";
    
        if (hours < 12) {
            timeOfDay = "morning"
            period = "am"
        } else if (hours >= 12 && hours < 17) {
            hours -= 12;
            timeOfDay = "afternoon"
        } else {
            hours -= 12;
            timeOfDay = "night"
        }

        mintues = this.formatNumbers(mintues);
        seconds = this.formatNumbers(seconds);

        this.setState(state => {
            return ({
                hours: hours,
                mintues: mintues,
                seconds: seconds,
                timeOfDay: timeOfDay,
                period: period
            });
        })
    }

    formatNumbers = (num) => {
        let result = num.toString();
        if(num < 10) {
            result = "0" + result;
        }
        return result;
    }

    render() {

        const styles = {
            fontSize: "30px"
        }
                
        if (this.state.timeOfDay === "morning") {
            styles.color = "#04756F"
        } else if (this.state.timeOfDay === "afternoon") {
            styles.color = "#8914A3"
        } else {
            styles.color = "#D90000"
        }

        return (
            <div className="clock">
                <h2 style={styles}>Good {this.state.timeOfDay}!</h2>
                <h2>Time Now: {this.state.hours}:{this.state.mintues}:{this.state.seconds} {this.state.period}</h2>
            </div>
        );
    }
}

export default Header;