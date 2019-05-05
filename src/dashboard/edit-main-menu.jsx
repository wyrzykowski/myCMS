import React, { Component } from "react";
import Form from  './../common/Form';
import Joi from "joi-browser";
import { getSubpage, saveSubpage } from "../services/subpageService";
import { toast } from "react-toastify";
import { convertFromRaw, EditorState } from "draft-js";
import { getMenu, saveMenu } from "../services/menuService";
import { getPages } from "../services/pagesService";




class EditMainMenu extends Form {

  state = {
    pageId:false,
    pages:false,
    data: {
      tabs:false,
      navName: false,
    },
    errors: {}
  };
  schema = {
    navName: Joi.any(),
    tabs: Joi.any()
  };
  async componentDidMount(){
    await this.getMainMenu();
    await this.getPages();
    this.setMenuItems();

  }

  setMenuItems(){
    //assign to menu list select from
    console.log("set menu item");
    var state = {...this.state};
    console.log("HERE",this.state.tabs);
    try {
      this.state.data.tabs.map((tab, index) => {

        const pagesElement = this.state.pages.map((page) => {
          return {
            _id: page._id,
            name: page.name
          }
        });
        state.data[`tabName${index}`] = tab.name;
        state[`page${index}`] = pagesElement;


        //set data.pagesValues
        const pagesElementValues = tab.link;
        state.data[`pageValues${index}`] = pagesElementValues;
        this.setState(state);
        this.schema[`pageValues${index}`] = Joi.string().min(1);
        this.schema[`tabName${index}`] = Joi.string().min(1);
        // this.schema[`pageValues${index}`] = Joi.any();
        // this.schema[`tabName${index}`] = Joi.any();

      })
    }catch(e){
      console.log("error");
    }
  }

  async getMainMenu() {
    //Get main menu name
    const { data } = await getMenu('main_nav');

    const pageId = data[0]._id;
    this.setState({
      data: {
        ...this.state.data,
        tabs: data[0].content,
        navName: data[0].navbar_label
      }, pageId
    })}


  async getPages() {

    //Get all pages
    try {
      const { data } = await getPages('all');
      const pages = data;
      const pagesValues = pages.map(page => page.page_link);
      const pagesName = pages.map(page => {
        return {
          _id: page.page_link,
          name: page.page_name
        }
      });

      this.setState({
        pages: pagesName,
        data: {
          ...this.state.data
        }
      });
    }catch(e){
      toast.error("Cannot get Data! please reload page.")
    }
  }


  doSubmit = async () => {

    const content = this.state.pages.map((page,index)=>{
      return {
        name:this.state.data[`tabName${index}`],
        link:this.state.data[`pageValues${index}`]
      }
    });



    const dataToSave = {
      _id: this.state.pageId,
      navbar_label: this.state.data.navName,
      content
    };

    await saveMenu(dataToSave,"main_nav").then( ()=>{
      toast.success("Content Updated!")
    }).catch(e=>{
      console.log("error")
    })
  };



  render() {
    console.log("schema",this.schema);

    return (
      <div>
        <h1>Edit main Menu</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("navName","Menu name:")}
          <p>Menu Items:</p>
          {
            this.state.pages && this.state.data.tabs &&  this.state.data[`pageValues${this.state.data.tabs.length-1}`] && this.state.data[`tabName${this.state.data.tabs.length-1}`] ? this.state.data.tabs.map((tab,index)=>{

              return(
                [
                  <div key={index}>
                    { this.renderInput(`tabName${index}`, "Item name:")}
                    { this.renderSelect(`pageValues${index}`, "Item link:", this.state.pages)}
                  </div>,
                  <hr key={index+"hr"}/>,
                  <br key={index+"br"}/>,
                ])

            }) : ""
          }

          {/*{this.state.data.pagesValues ? this.renderSelect("pagesValues","Choose page",this.state.pages,"homelink3"): ""}*/}
          {this.renderButton("Save")}
        </form>
      </div>


    );
  }
}

export default EditMainMenu;