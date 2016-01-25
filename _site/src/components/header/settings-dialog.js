import React from 'react'

import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import Toggle from 'material-ui/lib/toggle'

class SettingsDialog extends React.Component {
    updateMode(e, val) {
        this.props.handleSettingsChange({mode: val});
    }

    render() {
        let actions = [
            <RaisedButton label="Done" onTouchTap={this.props.close}/>,
        ];

        let buttonStyles = {display: 'inline', float: 'left', width: 'auto', marginRight: '25px'};
        let disabledFlag = this.props.changed_doc ? true : false;
        let warning = this.props.changed_doc ? '(unavailable with pending changes)' : '';

        return (
            <Dialog title="Settings" actions={actions} modal={true} open={this.props.open}>
                <p>
                    <strong>Mode</strong>
                    <span style={{color: 'red', marginLeft: '10px'}}>{warning}</span>
                </p>
                <RadioButtonGroup name="mode" defaultSelected={this.props.mode} style={{height: '25px'}} onChange={this.updateMode.bind(this)}>
                    <RadioButton value="yaml" label="YAML" style={buttonStyles} disabled={disabledFlag}/>
                    <RadioButton value="json" label="JSON" style={buttonStyles} disabled={disabledFlag}/>
                </RadioButtonGroup>
                <div style={{width: '50%'}}>
                    <p><strong>Update Settings</strong></p>
                    <Toggle labelPosition="right" name="versions" value="enforce_versions" label="Enforce versions"/>
                    <Toggle labelPosition="right" name="merge" value="enforce_merge" label="Merge documents"/>
                </div>
            </Dialog>
        );
    }
}

export default SettingsDialog;

