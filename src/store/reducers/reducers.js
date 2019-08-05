const initialState= {
    fullName: ''
}

const reducer = (state=initialState, { type, payload }) => {
    switch (type) {
        case 'setFullName':
            return {
                ...state
                ,fullName: payload.fullName
            };
            default:
            return state;
    }
}
export default reducer;