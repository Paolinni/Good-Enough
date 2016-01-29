import React, { Component, PropTypes } from 'react';
const { Link } = require('react-router');

class NewPasswordForm extends Component {
  handleKeyUpNewPassword(input) {
    console.log('input YO: ', this.refs[input].value)
    this.props.actions.saveNewPasswordInput(input, this.refs[input].value)
  }

  handleKeyUpConfirmNewPassword(input) {
    console.log('input YO: ', this.refs[input].value)
    this.props.actions.saveConfirmNewPasswordInput(input, this.refs[input].value)
  }

  handleKeyPress(e) {
    if (e.which === 13) {
      this.props.actions.submitNewPassword()
    }
  }

  render() {
    var loginErr;
    var emailAlert;

    if (this.props.state.usernamePasswordReset.userData.foundEmail) {
      loginErr = <span className="loginError"></span>;
    } else {
      loginErr = <span className="recover-password-email-error">No account with that email exists</span>
    }

    if (this.props.state.usernamePasswordReset.userData.emailReceived) {
      emailAlert = <span className="recover-password-email-success">An email has been sent to {this.props.state.usernamePasswordReset.userData.email} with instructions to reset password</span>
    }

    var formButton = <button onClick={this.props.actions.recoverPassword} className="question-form-button">Submit</button>
    return (
      <div className="login-box">
        <h1 className="login-logo password-reset">Reset your password</h1>
        <div className="login-form">
        {emailAlert}
        {loginErr}
        <div>
          <input className="recover-password-email" placeholder="Enter new password" ref="newPassword" onKeyUp={() => this.handleKeyUpNewPassword('newPassword')} onKeyPress={(event) => this.handleKeyPress(event)} />
          <input className="recover-password-email" placeholder="Confirm new password" ref="confirmNewPassword" onKeyUp={() => this.handleKeyUpConfirmNewPassword('confirmNewPassword')} onKeyPress={(event) => this.handleKeyPress(event)} />
          </div>
        </div>
        <div className="question-form-submit-button-login">
          {formButton}
        </div>
      </div>
    )
  }
}

NewPasswordForm.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default NewPasswordForm;
