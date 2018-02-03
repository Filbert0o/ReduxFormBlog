import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  }
}

class PostsNew extends Component {
  renderField(field) {
    // es6 syntax to replace 'field.meta.touched', 'field.meta.error'
    // with 'touched' and 'error' accordingly
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <field.type
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    const fieldForm = _.map(FIELDS, (value, field) => {
      return(
        <Field
          key={field}
          label={value.label}
          name={field}
          type={value.type}
          component={this.renderField}
        />
      )
    });

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        {fieldForm}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> {title: 'asdf', categories: 'asdf', content: 'asdf'}
  const errors = {};

  // Validate the input from 'values'
  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  // if (!values.title) {
  //   errors.title = "Enter a title";
  // }
  // if (!values.categories) {
  //   errors.categories = "Enter some categories";
  // }
  // if (!values.content) {
  //   errors.content = "Enter some content please";
  // }

  // if errors is empty, the form is fine to submit
  // if errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate, // validate: validate
  form: 'PostsNewForm',
  fields: _.keys(FIELDS)
})(
  connect(null, { createPost })(PostsNew)
);
