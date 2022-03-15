
const initialState = {
  students: null,
};

export default function AllStudents(state = initialState, action) {
  switch (action.type) {
    case "GET_STUDENT":
      return {
        ...state,
        students: action.payload,
      };
    case "LOGOUT_USER":
      return {
		  ...state,
		  students: null
	  }

    default:
      return state;
  }
}
