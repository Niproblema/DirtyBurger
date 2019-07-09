import reducer, { initialState } from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store token upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'somethingsomething',
            userId: 'someID'
        })).toEqual(
            {
                error: null,
                loading: false,
                token: 'somethingsomething',
                userId: 'someID'
            }
        );
    });

    it('should restore state upon logout', () => {
        expect(reducer({
            error: null,
            loading: false,
            token: 'somethingsomething',
            userId: 'someID'
        }, { type: actionTypes.AUTH_LOGOUT })).toEqual(initialState);
    });
})