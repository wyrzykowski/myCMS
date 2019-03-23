import React, { Component } from "react";
import Joi from "joi-browser";
import Select from "./Select.jsx";
import Input from "./Input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

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
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
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
}

export default Form;
