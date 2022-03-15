import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatas } from "../services/getServices";

export const UserDetails = () => {
  const { id } = useParams();
  const URL_One = `http://localhost:2000/api/student/${id}`;
  const marks_url = `http://localhost:2000/api/mark/all/${id}`;
  const getAllSubjectUrl = "http://localhost:2000/api/subject/all";
  const addNewMarksUrl = "http://localhost:2000/api/mark/new";

  const [user, setUser] = useState([]);
  const [all, setAll] = useState();
  const [marks, setMarks] = useState([]);
  const [allSubject, setAllSubject] = useState();
  const [subject, setSubject] = useState("");
  const [obtain, setObtain] = useState("");

  const getData = async () => {
    const data = await getDatas(URL_One);
    const datata = await data.json();
    console.log(datata);
    setAll(datata);
  };

  console.log("All", all);
  const getAllSubject = async () => {
    if (localStorage.getItem("Token")) {
      let token = localStorage.getItem("Token").replace(/["]+/g, "");
      try {
        // const res = await
        const res = await fetch(getAllSubjectUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            token: `Bearer ${token}`,
          },
        });
        const listItems = await res.json();
        setAllSubject(listItems);
      } catch (error) {
        console.log(error);
      }
    }
  };

  

  const addNewMarks = async (e) => {
    e.preventDefault();
    if (!subject) {
      alert("Please select subject");
      return;
    }
    if (!obtain) {
      alert("Please enter obtained mark");
      return;
    }

    let someSubject = marks.some((item) => item.subject._id === subject);
    if (!someSubject) {
      let token = localStorage.getItem("Token").replace(/["]+/g, "");
      const data = { subject, obtain, user: id };
      let res = await fetch(addNewMarksUrl, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Accept: "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      res = await res.json();
      e.target.reset();
      getData()
    } else {
      alert("This Subject has already mark");
    }
  };

  const deleteMarks = async (id) => {
    let token = localStorage.getItem("Token").replace(/["]+/g, "");
    let res = await fetch(`http://localhost:2000/api/marks/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
        token: `Bearer ${token}`,
      },
    });
    res = await res.json();
    getData()
  };
  useEffect(() => {
    getData();
    getAllSubject();
  }, []);

  return (
    <>
      {all ? (
        <>
          <div className="user-card">
            <h1>Name : {all.oneStudent.username}</h1>
            <h3>Email : {all.oneStudent.email}</h3>
          </div>

          <div className="add-marks">
            <form onSubmit={addNewMarks}>
              <label>
                <select
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                >
                  <option value="" key={"initial_value"}>
                    Select Subject
                  </option>
                  {allSubject &&
                    allSubject.map((s) => {
                      return (
                        <option value={s._id} key={s._id}>
                          {s.name}
                        </option>
                      );
                    })}
                </select>
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Enter Obtain mark"
                  onChange={(e) => setObtain(e.target.value)}
                />
              </label>
              <input type="submit" value="Add Marks" />
            </form>
          </div>

          <table>
            <tr>
              <th>Subjects</th>
              <th>Total Marks</th>
              <th>Obtain Marks</th>
              <th>%</th>
              <th>Delete</th>
            </tr>
            {all.marks.map((mark) => {
              return (
                <tr key={mark._id}>
                  <td>{mark.subject.name}</td>
                  <td>100</td>
                  <td>{mark.obtain}</td>
                  <td>{mark.obtain}%</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteMarks(mark._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </>
      ) : (
        <>
          <h2>Somethings happen wrong..</h2>
        </>
      )}
    </>
  );
};
