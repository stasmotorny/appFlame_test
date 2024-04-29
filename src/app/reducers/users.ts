import {ActionType, createReducer} from 'typesafe-actions';
import {likeUser, removeUser} from '../actions/users';
import {TUser} from '../API';
import {fetchUsersAsync} from '../asyncActions/users';

type TUsersState = {
    items: TUser[];
    itemsLength: number;
    status: string;
};

const initialState: TUsersState = {
    items: [],
    itemsLength: 0,
    status: 'loading',
};

export type TUsersActions = ActionType<
    typeof removeUser | typeof fetchUsersAsync.request | typeof fetchUsersAsync.success | typeof likeUser
>;

export const usersReducer = createReducer<TUsersState, TUsersActions>(initialState)
    .handleAction(removeUser, (state, action) => {
        const newItems = state.items.filter(item => item.id !== action.payload);
        return {...state, items: newItems, itemsLength: newItems.length};
    })
    .handleAction(fetchUsersAsync.request, state => ({...state, status: 'loading'}))
    .handleAction(fetchUsersAsync.success, (state, action) => ({
        ...state,
        status: 'idle',
        items: action.payload.users,
        itemsLength: action.payload.length,
    }))
    .handleAction(likeUser, (state, action) => {
        let usersCopy = [...state.items];
        const chosenUserIndex = usersCopy.findIndex(user => user.id === action.payload);
        if (usersCopy[chosenUserIndex].isLiked) {
            usersCopy[chosenUserIndex].isLiked = !usersCopy[chosenUserIndex].isLiked;
        } else {
            usersCopy[chosenUserIndex].isLiked = true;
        }
        return {...state, items: usersCopy};
    });
