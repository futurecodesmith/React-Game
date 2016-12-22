var React = require('react'); 
var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); 
require('../main.css');
//can use this syntax b/c we used the css loader in webpack.config

var Main = React.createClass({
    render: function(){
        return (
            <div className='main-container'>
                <ReactCSSTransitionGroup
                transitionName="appear"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                    {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
});

module.exports = Main;