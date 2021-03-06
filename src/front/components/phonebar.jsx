import React, {Component} from 'react';
import { getSubpage } from "../../services/subpageService";

class Phonebar extends Component {
    state={
        phoneBar: ''
    };

    async componentDidMount() {
        try {
            const { data } = await getSubpage('phone_bar');
            this.setState({ phoneBar: data[0].block[0].content });
        }catch(e){
            console.log("error reading phone bar")
        }
    }
    render() {


        return (
            <div className={"topBeamColor"}>
                <h3 style={{paddingBottom:"1px", margin:"0"}}>{this.state.phoneBar ? this.state.phoneBar : ""}</h3>
            </div>
        );
    }
}
export default Phonebar;