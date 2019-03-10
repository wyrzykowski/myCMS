import React, {Component} from 'react';

class Footer extends Component {
    state={

        style:{

        },

            footerContent:[],
    }


    componentDidMount() {
        const style={
            backgroundColor: '#222',
                minHeight: '100px',
            color:'white',
            paddingTop:'2%',
        }

        const footerContent=[
            {
            textLine:["TEL: 692 622 745","E-MAIL: fakfajzer@gmail.com","Dystrybutor: 504 165 188"],
            type:'text'
        },
            {
                textLine:[""],
                type:'text'

            },
            {
                textLine:["./image.png"],
                type:'image'
            },

        ];


        this.setState({style,footerContent});

    }

    render() {


        return (
          <div className="container-fluid" style={this.state.style}>

            <div className="row">
                {

                    this.state.footerContent.map(piece=>
                    <div key={Math.random()} className={"col-sm-12 col-md-"+12/this.state.footerContent.length}>
                        {
                            piece.type === "text" ?
                            piece.textLine.map(line=>
                                <p key={line}>{line}</p>
                            ): <img src={piece.textLine}/>
                        }
                    </div>

                    )

                }
            </div>
          </div>
        );
    }
}

export default Footer;