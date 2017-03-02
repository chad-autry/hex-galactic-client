import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';

// Render editor
module.exports = React.createClass({
    getInitialState: function() {
        //Get initial style from jwt or local storage
        return {code: "", menuCollapded: true, editorStyle:"github"};
    },
    codeChanged: function(value) {
       this.setState({code:value}); 
    },
    menuClicked: function() {
        this.setState({
            menuCollapsed: !this.state.menuCollapsed
        });
    },
    editorStyleChanged: function(event) {
        this.setState({
            editorStyle: event.target.value, 
            menuCollapsed: true
        });
    },
    render: function () {
        return (
            /* jshin ignore:start */
            <div style={{width: '100%',position: 'fixed',left:0,right:0,top: this.props.navbarHeight+'px',bottom: 0}}>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="button-group">
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle" onClick={this.menuClicked} role="button" aria-haspopup="true" aria-expanded="true">Menu</a>
                                    <ul className="dropdown-menu" style={{display:this.state.menuCollapsed ? 'block' : 'none'}}>
                                        <li><a href="#">Show Script List</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li>
                                            <select className="form-control"
                                             value={this.state.editorStyle}
                                             onChange={this.editorStyleChanged}>
                                                <option>monokai</option>
                                                <option>github</option>
                                                <option>tomorrow</option>
                                                <option>kuroir</option>
                                                <option>twilight</option>
                                                <option>xcode</option>
                                                <option>textmate</option>
                                                <option>solarized dark</option>
                                                <option>solarized light</option>
                                                <option>terminal</option>
                                            </select>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <table className="table" style={{height:'100%'}}>
                            <tbody style={{height:'100%'}}>
                                <tr style={{height:'100%'}}>
                                    <td>
                                        <AceEditor
                                            mode="javascript"
                                            value={this.state.code}
                                            height="100%"
                                            width="100%"
                                            theme={this.state.editorStyle}
                                            onChange={this.codeChanged}
                                            name="code-editor"
                                            editorProps={{$blockScrolling: true}}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            /* jshint ignore:end */
        );
    }
});
