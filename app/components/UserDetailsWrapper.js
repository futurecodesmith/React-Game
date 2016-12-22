var React = require('react');
var PropTypes = React.PropTypes;

function UserDetailsWrapper(props){
    return (
        <div className="col-sm-6">
        <p className="lead">{props.header}</p>
            {props.children}
        </div>
    )
}

module.exports = UserDetailsWrapper;

// props.children renders UserDetailsWrapper and also its' children; thus UserDetails