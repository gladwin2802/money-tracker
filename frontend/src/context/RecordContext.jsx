import { createContext, useReducer } from "react";

export const RecordContext = createContext()

export const recordsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RECORDS':
            return {
                records: action.payload
            }
        case 'CREATE_RECORD':
            const newRecord = action.payload;
            const sortedRecords = [...state.records, newRecord].sort((a, b) => new Date(b.date) - new Date(a.date));
            return {
                records: sortedRecords
            }
        case 'DELETE_RECORD':
            return {
                records: state.records.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const RecordContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recordsReducer, {
        records: null
    })

    return (
        <RecordContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecordContext.Provider>
    )
}