import React, {Component} from 'react';
class Someinfo extends Component {

    state={
        style:{

        },
        image:[
            {},
            {}
        ],
        content:[
            {
                h1: '',
                text:''

            },
            {
                h1: '',
                text:''
            }
        ]
    }


    componentDidMount() {
        const image=[{
            alt: 'oferta',
            img:'./oferta.png'},
            {
                alt: 'Nasze usługi',
                img:'./people.png'
            }

        ];
        const style = {
            containerStyle: {
                minHeight: '30px',
                color: 'black'
            },
            eachColumnStyle: {
                paddingBottom: '5%',
                paddingTop:'5%'
            },
            eachColumnImageStyle: {
                maxHeight: '100%',
                maxWidth: '100%',
                position: 'absolute',
                top: '25%'
            },

        }
            const content = [
              {
                    h1: 'Oferta',
                    text:'Firma FakFajzer powstała w 2000 roku. Od samego początku działalności specjalizowaliśmy się w usługach dekarskich i budowie domu od podstaw. Zaufało nam juz wielu inwestorów prywatnych jak...',
                    link:'#'
                },
                {
                    h1: 'Nasze usługi',
                    text:'Oferujemy wysokiej jakości usługi remontowe, dekarskie, docpieleniowe, kominy, podbitki, więźby dachowe, ogrodzenia, elewacje, montaż okien dachowych...',
                    link:'#'
                }
            ]




        this.setState({style,image,content},()=>{
            console.log("huehueh jus")
        });


    }
    render() {
        console.log(this.state.image);
        return (
            <div style={this.state.style.containerStyle} className="container-fluid"  >
                <div className="row" >

                <div className="col-xl-1 col-sm-12 " style={this.state.style.eachColumnStyle}>   <img src={this.state.image[0].img}style={this.state.style.eachColumnImageStyle}/></div>
                    <div className="col-xl-5 col-sm-12 " style={this.state.style.eachColumnStyle}>
                        <h1>{this.state.content[0].h1}</h1>
                        <p>{this.state.content[0].text}</p>
                    </div>

                    <div className="col-xl-1  col-sm-12"> <img src={this.state.image[1].img} style={this.state.style.eachColumnImageStyle}/></div>
                    <div className="col-xl-5 col-sm-12 " style={this.state.style.eachColumnStyle}>
                        <h1>{this.state.content[1].h1}</h1>
                        <p>{this.state.content[1].text}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Someinfo;