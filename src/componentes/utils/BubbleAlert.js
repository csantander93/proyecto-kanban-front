import { Component } from "react";

const styles = {
    bubbleAlert: {
        backgroundColor: "#E9725A",
        borderRadius: "20px",
        color: "#fff",
        padding: "5px 8px",
        fontSize: "0.5rem",
        width: "20px",
        
    }
}

class BubbleAlert extends Component {
    getNumber(n){
        if(!n) { return ""}
        return n > 9 ? "9+" : n
    }
    render() {
        const { value } = this.props
        return (
            <span style={styles.bubbleAlert}>
                {this.getNumber(value)}
            </span>
        )
    }
}

export default BubbleAlert