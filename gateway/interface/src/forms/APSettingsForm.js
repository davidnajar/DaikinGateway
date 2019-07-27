import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';

import {isAPEnabled} from '../constants/WiFiAPModes';
import PasswordValidator from '../components/PasswordValidator';

const styles = theme => ({
  loadingSettings: {
    margin: theme.spacing(0.5),
  },
  loadingSettingsDetails: {
    margin: theme.spacing(4),
    textAlign: "center"
  },
  textField: {
    width: "100%"
  },
  selectField:{
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  },
  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  }
});

class APSettingsForm extends React.Component {

  render() {
    const { classes, apSettingsFetched, apSettings, errorMessage, handleValueChange, onSubmit, onReset } = this.props;
    return (
      <div>
        {
         !apSettingsFetched ?

         <div className={classes.loadingSettings}>
           <LinearProgress className={classes.loadingSettingsDetails}/>
           <Typography variant="h4" className={classes.loadingSettingsDetails}>
             Loading...
           </Typography>
         </div>

         : apSettings ?

        <ValidatorForm onSubmit={onSubmit} ref="APSettingsForm">

          <SelectValidator name="provision_mode" label="Provide Access Point..." value={apSettings.provision_mode}  className={classes.selectField}
           onChange={handleValueChange('provision_mode')}>
            <MenuItem value={0}>Always</MenuItem>
            <MenuItem value={1}>When WiFi Disconnected</MenuItem>
            <MenuItem value={2}>Never</MenuItem>
          </SelectValidator>

          {
            isAPEnabled(apSettings.provision_mode) &&
            <Fragment>
              <TextValidator
                validators={['required', 'matchRegexp:^.{1,32}$']}
                errorMessages={['Access Point SSID is required', 'Access Point SSID must be 32 characters or less']}
                name="ssid"
                label="Access Point SSID"
                className={classes.textField}
                value={apSettings.ssid}
                onChange={handleValueChange('ssid')}
                margin="normal"
              />
              <PasswordValidator
                    validators={['required', 'matchRegexp:^.{1,64}$']}
                    errorMessages={['Access Point Password is required', 'Access Point Password must be 64 characters or less']}
                    name="password"
                    label="Access Point Password"
                    className={classes.textField}
                    value={apSettings.password}
                    onChange={handleValueChange('password')}
                    margin="normal"
              />
            </Fragment>
          }

          <Button variant="contained" color="primary" className={classes.button} type="submit">
            Save
          </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={onReset}>
      		  Reset
      		</Button>

        </ValidatorForm>

        :

        <div className={classes.loadingSettings}>
          <Typography variant="h4" className={classes.loadingSettingsDetails}>
            {errorMessage}
          </Typography>
          <Button variant="contained" color="secondary" className={classes.button} onClick={onReset}>
      		  Reset
      		</Button>
        </div>
      }
      </div>
    );
  }
}

APSettingsForm.propTypes = {
  classes: PropTypes.object.isRequired,
  apSettingsFetched: PropTypes.bool.isRequired,
  apSettings: PropTypes.object,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired
};

export default withStyles(styles)(APSettingsForm);
