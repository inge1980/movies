import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    fields: {},
    errors: {}
  };

  // validate all errors, e.g. on submit
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.fields, this.schema, options);
    //console.log("error", error);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  // validate one field
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    //console.log("validateProperty: obj", obj);
    const schema = { [name]: this.schema[name] };
    //console.log("validateProperty: schema", schema);
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const fields = { ...this.state.fields };
    fields[input.name] = input.value;
    this.setState({ fields, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { fields, errors } = this.state;
    //console.log("renderInput", this.state);

    return (
      <Input
        type={type}
        name={name}
        value={fields[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { fields, errors } = this.state;

    return (
      <Select
        name={name}
        value={fields[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
