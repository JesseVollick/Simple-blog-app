import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    //Style here
    renderField(field) {
        const { meta: {touched, error } } = field; //->meta.field
        const className =  `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className= {className} >
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type ='text'
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : '' }
                </div>

            </div>
        );
    }

    onSubmit(values){
        //this === component
        //only navigate after the post has been created

        this.props.createPost(values, () => {
            this.props.history.push('/');
        });

    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <div className="text-xs-left">
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Title for Post"
                        name="title" //what piece of state to be changed
                        component={this.renderField}
                    />
                    <Field
                        label="Categories"
                        name="categories" //what piece of state to be changed
                        component={this.renderField}
                    />
                    <Field
                        label="Post Content"
                        name="content" //what piece of state to be changed
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary">submit</button>
                    <Link className="btn btn-danger" to="/">Cancel</Link>
                </form>
            </div>
        );
    }
}
//three states of a form
    //pristine: no input has touched it and user has not selected
    //touched: focused on the input and focused out
    //invalid: Leaves focused state with invalid info.
//values-convention
function validate(values){
    const errors = {};
    //validate the inputs from 'values'
    if(!values.title || values.title.length < 3) {
        errors.title = 'Enter a title!'
    }
    if(!values.categories) {
        errors.categories = 'Enter Some categories'
    }
    if(!values.content) {
        errors.content = 'enter Some content Please'
    }
    //if errors is empty, the form is fine to submit
    //if errors has *any* properties, Redux form assumes for is invalid
    return errors;
}

//reduxForm is used in the same way as the connect function. below is how to combine them
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);


