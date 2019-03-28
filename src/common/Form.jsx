import React, { Component } from "react";
import Joi from "joi-browser";
import Select from "./Select.jsx";
import Input from "./Input";
import Textarea from "./Textarea";

class Form extends Component {
  state = {

    data: {},
    errors: {},

  };

  constructor() {
    super();

  }

  getState=()=>{
    return this.state;
  }
  validate = () => {
    //to sprawdza po przycisniecu submit
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message; // to mozna tez map'em zrobic
    return errors;
  };

  validateProperty = ({ name, value }) => {
    // to spawdza na zywo te pola tekstowe
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] }; // dynamiczne przypisze mi potrzebne lemnty z schema
    const { error } = Joi.validate(obj, schema); // chce tu robic abord early dlatego go tu nie pisze
    return error ? error.details[0].message : null;
  };
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }; //kopiuje state'a
    const errorMessage = this.validateProperty(input); //generuje error message przekazuje input'a calego
    if (errorMessage) errors[input.name] = errorMessage;
    //jesli istenieje jakis error to w tablice inputow dodaj tego error messagea
    else delete errors[input.name]; // jesli nie ma zadnegi errora to usun go z tablicy errorow

    // data destructuring bo uzywam tylko jednego
    const data = { ...this.state.data };
    data[input.name] = input.value;
    console.log("input value",input.value)
    this.setState({ data, errors });
  };
//For single file
  onFileButtonChange(e){
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e)=> {
      console.warn("img data", e.target.result);
      this.setState({imageFile:e.target.result});
    }
  }



//For multiple files
 onFilesButtonChange(e){
    var imageFiles =this.state.imageFiles;


    //var newcos = [...this.state.imageFiles,1,2,3];


    //here map and foreach not working!
  for(let i = 0;i<e.target.files.length;i++){
    const file = e.target.files[i];
      var renderImage = new Promise(function(resolve,reject){
        if (file && file.type.match('image.*')) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend =  function(e) {
            console.log("kurwa dodaje")
            imageFiles = [...imageFiles, e.target.result];
            resolve("rendered successfully");
          }
        } else {
        reject("wrong file type!")
        }
      })

renderImage.then(()=>{
  console.log("tu",imageFiles)
  this.setState({imageFiles})

  console.log(this.state.imageFiles)
})


    }





 // files.forEach( file=>{
 //    {

 //    }
 //  })
  }


  renderButton(label) {
    return (
      <button  ref="btn"  disabled={this.validate()} className="btn btn-primary mb-4">
        {label}
      </button>
    );
  }

  renderFileButton(name,label) {
    return (
      <div style={{marginBottom:"3vh"}}>
        <p>{name}</p>
        <div>
          <div className="custom-file">
            <input  onChange={(e)=>this.onFileButtonChange(e)} type="file" className="btn custom-file-input" id="inputGroupFile03"/>
              <label className="custom-file-label" htmlFor="inputGroupFile03">{label}</label>
          </div>
          {this.state.imageFile &&
          <div className="border border-light">

            <img  style={{ width: "50%", margin: "0% 25% 0% 25%" }}
                 src={this.state.imageFile} alt="Red dot"/>
          </div>
          }
        </div>
      </div>
    );
  }


  renderFilesButton(name,label) {
    console.log(this.state.imageFiles)
    return (
      <div style={{marginBottom:"3vh"}}>
        <p>{name}</p>
        <div>
          <div className="custom-file">

            <input  onChange={(e)=>this.onFilesButtonChange(e)} type="file" className="btn custom-file-input" id="inputGroupFile03" multiple/>
            <label className="custom-file-label" htmlFor="inputGroupFile03">{label}</label>
          </div>

          <h2 className={"mt-3"}>Manage gallery:</h2>
          {
            this.state.imageFiles ? this.state.imageFiles.map( image => (

                <div style={{width: "100%"}} className="border border-light">
                  <img style={{height:"15vh", margin: "1% 1% 1% 1%",left:"10px",float:"left" }}
                       src={image} alt="Red dot"/>
                </div>

              )
            ):<p></p>
          }
          <div style={{clear:"both"}}></div>
          <p>Images already published:</p>
          {
            this.state.data.images ? this.state.data.images.map( image => (

                <div style={{height:"15vh",position:"static"}} className="border border-light">
                  <img style={{ margin: "1% 1% 1% 1%",left:"10px",float:"left" }}
                       src={__dirname + image.text} alt="Red dot"/>
                </div>

              )
            ):<p></p>
          }

          <div style={{clear:"both"}}></div>
        </div>
      </div>
    );
  }


  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInput(name, label, type) {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderTextarea(name, label, type) {
    const { data, errors } = this.state;
    return (
      <Textarea
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

}

export default Form;
