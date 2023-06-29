const BOOKMARK_ACTIONS = {
    GET_BOOKMARKS: 'get-bookmarks',
    ADD_BOOKMARK: 'add-bookmark'
}
const initialState = {
    bookmarks: null
}
function bookmarkReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case BOOKMARK_ACTIONS.GET_BOOKMARKS: {
            return { ...state, bookmarks: payload.bookmarks }
        }
        case BOOKMARK_ACTIONS.ADD_BOOKMARK: {
            return { ...state, bookmarks: payload.bookmarks }
        }
        default: {
            return state
        }
    }
}

export { BOOKMARK_ACTIONS, initialState, bookmarkReducer }