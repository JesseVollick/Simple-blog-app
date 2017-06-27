//this reducer catches the data that the action returned and changes it from an array to an object.
import _ from 'lodash';
//Action that holds the data payload from the ajax request
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';


    export default function (state = {}, action) {
        switch (action.type) {
            case DELETE_POST:
                return _.omit(state, action.payload);
            case FETCH_POST:
                return { ...state, [action.payload.data.id]: action.payload.data};
            case FETCH_POSTS:
                //from array to object
                return _.mapKeys(action.payload.data, 'id');
            default:
                //Returns this slice of state to be handled by the root reducer
                return state

        }

    }
