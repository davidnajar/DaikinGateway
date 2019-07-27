import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import ComputerIcon from '@material-ui/icons/Computer';

import { restComponent } from '../components/RestComponent';
import SectionContent from '../components/SectionContent'

import * as Highlight from '../constants/Highlight';
import { AP_STATUS_ENDPOINT } from '../constants/Endpoints';

const styles = theme => ({
  ["apStatus_" + Highlight.SUCCESS]: {
    backgroundColor: theme.palette.highlight_success
  },
  ["apStatus_" + Highlight.IDLE]: {
    backgroundColor: theme.palette.highlight_idle
  },
  fetching: {
    margin: theme.spacing(4),
    textAlign: "center"
  },
  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  }
});

class APStatus extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  apStatusHighlight(data) {
    return data.active ? Highlight.SUCCESS : Highlight.IDLE;
  }

  apStatus(data) {
    return data.active ? "Active" : "Inactive";
  }

  createListItems(data, classes) {
    return (
      <Fragment>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes["apStatus_" + this.apStatusHighlight(data)]}>
              <SettingsInputAntennaIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Status" secondary={this.apStatus(data)} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>IP</Avatar>
          </ListItemAvatar>
          <ListItemText primary="IP Address" secondary={data.ip_address} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DeviceHubIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="MAC Address" secondary={data.mac_address} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ComputerIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="AP Clients" secondary={data.station_num} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </Fragment>
    );
  }

  renderAPStatus(data, classes) {
    return (
      <div>
        <List>
          <Fragment>
            {this.createListItems(data, classes)}
          </Fragment>
        </List>
        <Button variant="contained" color="secondary" className={classes.button} onClick={this.props.loadData}>
          Refresh
        </Button>
      </div>
    );
  }

  render() {
    const { data, fetched, errorMessage, classes } = this.props;

    return (
      <SectionContent title="AP Status">
        {
          !fetched ?
            <div>
              <LinearProgress className={classes.fetching} />
              <Typography variant="h4" className={classes.fetching}>
                Loading...
              </Typography>
            </div>
            :
            data ? this.renderAPStatus(data, classes)
              :
              <div>
                <Typography variant="h4" className={classes.fetching}>
                  {errorMessage}
                </Typography>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.props.loadData}>
                  Refresh
                </Button>
              </div>
        }
      </SectionContent>
    )
  }
}

export default restComponent(AP_STATUS_ENDPOINT, withStyles(styles)(APStatus));
