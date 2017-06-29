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
module.exports = class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {code: "", title: "", menuCollapsed: true, codeListCollapsed: true, editorStyle:"github", edited: false};
        // Bind the methods to the object's this 
        this.codeChanged = this.codeChanged.bind(this);
        this.menuClicked = this.menuClicked.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.codeListClicked = this.codeListClicked.bind(this);
        this.editorStyleChanged = this.editorStyleChanged.bind(this);
        this.saveClicked = this.saveClicked.bind(this);
    }

    codeChanged(value) {
       this.setState({code:value, edited:true}); 
    }

    titleChanged(event) {
       this.setState({title:event.target.value, edited:true});
    }

    menuClicked() {
        this.setState({
            menuCollapsed: !this.state.menuCollapsed
        });
    }

    codeListClicked() {
        this.setState({codeListCollapsed: !this.state.codeListCollapsed});
    }

    editorStyleChanged(event) {
        this.setState({
            editorStyle: event.target.value, 
            menuCollapsed: true
        });
    }

    saveClicked(event) {
        //TODO reload the list of scripts once a save finishes
        //TODO Notify if there was an error saving a script
        this.props.route.fetchService.postWithAuth('./backend/code/save', 'application/json', JSON.stringify({"title":this.state.title, "code":this.state.code}), () => {}, () => {}); this.setState({edited:false});
    }

    render() {
        let codeList = null;
        if (!this.state.codeListCollapsed) {
            //TODO split into components
            codeList = [];
            codeList.push(<td> <table className="table table-stripped table-bordered table-hover">
            <thead><tr><th>Title</th><th>Hash</th></tr></thead>
            </table></td>);
        }
        return (
            /* jshint ignore:start */
            <div style={{width: '100%',position: 'fixed',left:0,right:0,top: this.props.navbarHeight+'px',bottom: 0}}>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="input-group">
                                <span className="input-group-btn">
                                    <button className="btn btn-default" onClick={this.codeListClicked}>
                                        &#8203;<i className={this.state.codeListCollapsed ? 'fa fa-chevron-left':'fa fa-chevron-right'}></i>
                                    </button>
                                </span>
                              {/*   <span className="input-group-btn">
                                    <button className="btn btn-default dropdown-toggle" onClick={this.menuClicked} aria-haspopup="true" aria-expanded="true">Menu</button>
                                    <ul className="dropdown-menu" style={{display:!this.state.menuCollapsed ? 'block' : 'none'}}>
                                        <li><a href="#">Show Script List</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li style={{marginLeft:'5px',marginRight:'5px'}}>
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
                                                <option value="solarized_dark">solarized dark</option>
                                                <option value="solarized_light">solarized light</option>
                                                <option>terminal</option>
                                            </select>
                                        </li>
                                    </ul>
                                </span> */}
                                <input type="text" className="form-control" value={this.state.title} onChange={this.titleChanged} placeholder="Script Title" aria-describedby="title" />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" onClick={this.saveClicked} disabled={!this.state.edited}>Save</button>
                                </span>
                            </div> 
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-6 no-padding" style={{display:!this.state.codeListCollapsed ? 'block' : 'none'}}>
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr><td>Test</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={this.state.codeListCollapsed ? "col-xs-12 no-padding" : "col-xs-6 no-padding"}>
                                        <AceEditor
                                            mode="javascript"
                                            value={this.state.code}
                                            height="100%"
                                            width="100%"
                                            theme={this.state.editorStyle}
                                            onChange={this.codeChanged}
                                            name="code-editor"
                                            editorProps={{$blockScrolling: true}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            /* jshint ignore:end */
        );
    }
};
