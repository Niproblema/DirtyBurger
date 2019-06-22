import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInter =  axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.respInter = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.respInter);
        }


        errorAway = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxiliary>
                    <Modal shown={this.state.error != null} modalClose={this.errorAway}>
                        <h1>Something broke :(</h1>
                        <p>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;