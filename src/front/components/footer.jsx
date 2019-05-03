import React, {Component} from 'react';
import { getSubpage } from "../../services/subpageService";

class Footer extends Component {
    state={
        width: null,
        height: null,

        style:{

        },

            content:false
    }


    saveRef = (ref) => this.containerNode = ref

    measure() {
        const {clientWidth, clientHeight} = this.containerNode

        this.setState({
            width: clientWidth,
            height: clientHeight,
        })
    }

    async componentDidMount() {

       const {data} = await getSubpage('footer')

                const content = data[0].block[0].content;
       if(content){
           this.setState({content})
       }else{
           this.setState({content:false})
       }


    }


    render() {

        const style={
            inHeight: '100px',

            paddingTop:'2%',
        }

        return (
          <div  ref={this.saveRef} className="container-fluid footerColor" style={style}>

            <div className="row">
                {
                    this.state.content ?
                    this.state.content.map(piece=>
                    <div key={Math.random()} className={"col-sm-12 col-md-3 col-xl-4"}>
                        {
                            piece.type === "p" ?
                            piece.text.map(line=>
                                <p key={line}>{line}</p>
                            ): <img src={piece.text} style={{maxWidth:"99vw"}}/>
                        }
                    </div>

                    ): ''

                }
            </div>
          </div>
        );
    }
}

export default Footer;