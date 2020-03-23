import React from "react";
import { withRouter } from "react-router-dom";

const Back = ({ history }) =>
    history.location.pathname.indexOf('Player') !== -1 || history.location.pathname.indexOf('livelist') !== -1 ?
        <div onClick={history.goBack} className="back"><i className="fa fa-angle-left"></i></div>:null;

export default withRouter(Back);
