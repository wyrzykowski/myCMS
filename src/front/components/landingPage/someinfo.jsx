import React, {Component} from 'react';
import { Link } from "react-router-dom";

const Someinfo=( props )=> {

   // Data destructuring
        var {content} = props;
        if(content.block){
            const [Offer,Services] = content.block[1].content; //destructoring array of content
             var {h1: OfferH1,text: OfferText,link:OfferLink} = Offer;
             var {h1: ServicesH1,text: ServicesText,link:ServicesLink} = Services;
        }




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
                paddingTop:'5%',
              textDecoration:"none",
              color: 'black'
            },
            eachColumnImageStyle: {
                maxHeight: '100%',
                maxWidth: '100%',
                position: 'absolute',
                top: '25%'
            },
        };

        return (
            <div style={style.containerStyle} className="container-fluid"  >
              <hr/>
                <div className="row" >

                <div className="col-xl-1 col-sm-12 " style={style.eachColumnStyle}>   <img src={image[0].img}style={style.eachColumnImageStyle}/></div>
                    <Link to={`${OfferLink}`} className="col-xl-5 col-sm-12 " style={style.eachColumnStyle}>
                        <h1>{content? OfferH1: ''}</h1>
                        <p>{content? OfferText: ''}</p>
                    </Link>

                    <div className="col-xl-1  col-sm-12"> <img src={image[1].img} style={style.eachColumnImageStyle}/></div>
                    <Link to={`${ServicesLink}`} className="col-xl-5 col-sm-12 " style={style.eachColumnStyle}>
                        <h1>{content? ServicesH1: ''}</h1>
                        <p>{content? ServicesText: ''}</p>
                    </Link>
                </div>
              <hr/>
            </div>

        );
    }

export default Someinfo;