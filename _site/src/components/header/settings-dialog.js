import React from 'react'

import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import Checkbox from 'material-ui/lib/checkbox'

class SettingsDialog extends React.Component {
    render() {
        let actions = [
            <RaisedButton label="Done" onTouchTap={this.props.close}/>,
        ];

        let buttonStyles = {display: 'inline', float: 'left', width: 'auto', marginRight: '25px'};

        return (
            <Dialog title="Settings" actions={actions} modal={true} open={this.props.open}>
                <p><strong>Mode</strong></p>
                <RadioButtonGroup name="mode" defaultSelected="yaml" style={{height: '25px'}}>
                    <RadioButton value="yaml" label="YAML" style={buttonStyles}/>
                    <RadioButton value="json" label="JSON" style={buttonStyles}/>
                </RadioButtonGroup>
                <p><strong>Update Settings</strong></p>
                <Checkbox name="versions" value="enforce_versions" label="Enforce versions"/>
                <Checkbox name="merge" value="enforce_merge" label="Merge documents"/>
            </Dialog>
        );
    }
}

export default SettingsDialog;

