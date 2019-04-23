import React, {Component} from 'react';
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

    componentDidMount() {
        this.measure()

        fetch(`${window.apiUri}/footer`)
          .then(res => res.json())
          .then(contentArray => {
                const content = contentArray[0].block[0].content;
                this.setState({content})

            }
          ).catch(error => {
            this.setState({ content: false })
        })
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
                            ): <img src={piece.text}/>
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