import React from "react";
import { withRouter } from "react-router-dom";

const Back = ({ history }) =>
    <div onClick={history.goBack} className="header-item"><i className="icon icon-back"></i></div>

export default withRouter(Back);
