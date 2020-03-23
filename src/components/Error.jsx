import React, { Component } from 'react';
import loading from './icons/load.svg';
import error from './icons/error.svg';

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data.status !== state.data.status) {
            return {
                data: props.data
            }
        }
        return null;
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                {data.status === 1 ?
                    <div>
                      <div><img src={error} style={{marginTop: '50%',width:'28%'}} alt="loading" /></div>
                      <div>
                        {data.message}
                      </div>
                    </div>
                    :
                    <img src={loading} style={{marginTop: '50%',width:'28%'}} alt="loading" />
                }
            </div>
        )
    }
}

export default Error;
