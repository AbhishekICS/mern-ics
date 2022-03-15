export const getAllStudent = (token) => (dispatch) => {
  fetch("http://localhost:2000/api/student/all", {
    method: "GET",
    headers: {
      Accept: "application/json",
      token: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => dispatch({ type: "GET_STUDENT", payload: result }));
};



export const logoutAction = () => {
  return {
    type: "LOGOUT_USER"
  }
}