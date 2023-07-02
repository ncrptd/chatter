import { useContext, useReducer } from "react";
import { createContext } from "react";
import { bookmarkReducer, initialState, BOOKMARK_ACTIONS } from "../reducer/bookmarkReducer";
import { addBookmarkService, getAllBookmarkService, removeBookMarkService } from "../services/bookmarkServices";
import { useEffect } from "react";
import { toastError } from "../alerts/alerts";

const BookmarkContext = createContext();
const BookmarkDispatchContext = createContext();

export default function BookmarkProvider({ children }) {
    const [state, dispatch] = useReducer(bookmarkReducer, initialState);

    const getAllBookmark = async () => {
        try {
            const res = await getAllBookmarkService();
            if (res.status === 200) {
                let data = await res.json();
                dispatch({ type: BOOKMARK_ACTIONS.GET_BOOKMARKS, payload: { bookmarks: data.bookmarks } })
            }
        } catch (error) {
            console.log('all bookmark api failed with error', error)
        }
    }

    const addBookmarkHandler = async (postId) => {
        try {
            const res = await addBookmarkService(postId);
            if (res.status === 200) {
                const data = await res.data;
                dispatch({ type: BOOKMARK_ACTIONS.ADD_BOOKMARK, payload: { bookmarks: data.bookmarks } })
            }
        } catch (error) {
            console.log('add bookmark api failed with error', error)

        }
    }

    const removeBookmarkHandler = async (postId) => {
        try {
            const res = await removeBookMarkService(postId);
            if (res.status === 200) {
                const data = await res.data;
                dispatch({ type: BOOKMARK_ACTIONS.ADD_BOOKMARK, payload: { bookmarks: data.bookmarks } })
            }
        } catch (error) {
            toastError('Bookmark error')
            console.log('add bookmark api failed with error', error)

        }
    }
    useEffect(() => {
        getAllBookmark()
    }, [])

    return (
        <BookmarkContext.Provider value={{ state, addBookmarkHandler, removeBookmarkHandler }}>
            <BookmarkDispatchContext.Provider value={dispatch}>
                {children}
            </BookmarkDispatchContext.Provider>
        </BookmarkContext.Provider>
    )
}


const useBookmark = () => useContext(BookmarkContext)
const useBookmarkDispatch = () => useContext(BookmarkDispatchContext)

export { useBookmark, useBookmarkDispatch }