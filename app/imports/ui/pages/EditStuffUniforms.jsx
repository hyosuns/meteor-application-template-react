import React from 'react';
import { Grid, Form, Button, Segment, Loader } from 'semantic-ui-react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page, providing default values for form fields. */
  renderPage() {
    return (
      <AutoForm schema={StuffSchema} onSubmit={this.submit} model={this.props.doc} >
        <Grid container>

          <Grid.Row columns={3}>
            <Grid.Column>
              <TextField name='name'/>
            </Grid.Column>
            <Grid.Column>
              <TextField name='quantity'/>
            </Grid.Column>
            <Grid.Column>
              <SelectField name='condition' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
            <SubmitField value='Submit'/>
          </Grid.Row>

          <Grid.Row>
            <ErrorsField/>
            <TextField name='username' type='hidden' label={false} value='fakeuser@foo.com'/>
          </Grid.Row>

        </Grid>
      </AutoForm>
    );
  }
}

/** Require the presence of a Stuff document in the props object. */
EditStuff.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    doc: Stuff.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStuff);
