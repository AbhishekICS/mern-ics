import React, { useState, useEffect } from "react";

export const Subject = () => {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");

  const url = "http://localhost:2000/api/subject/all";
  const newUrl = "http://localhost:2000/api/subject/new";

  const addNewSubject = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("Token").replace(/["]+/g, "");
    let res = await fetch(newUrl, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
        token: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    res = await res.json();
    e.target.reset();
    getData();
  };

  const deleteSubject = async (id) => {
    let token = localStorage.getItem("Token").replace(/["]+/g, "");
    let res = await fetch(`http://localhost:2000/api/subject/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
        token: `Bearer ${token}`,
      },
    });
    res = await res.json();
    getData();
  };

  const getData = async () => {
    if (localStorage.getItem("Token")) {
      let token = localStorage.getItem("Token").replace(/["]+/g, "");
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            token: `Bearer ${token}`,
          },
        });
        const listItems = await res.json();
        setSubject(listItems);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="form-add">
        <form onSubmit={addNewSubject}>
          <h3> New Subject</h3>
		  <div className="form-input">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter New Subject"
          />
          <input type="submit" className="submit" value="Add" />
		  </div>
        </form>
      </div>
      <div className="contain">
        <div>
          {subject &&
            subject.map((subject, index) => {
              return (
                <div className="subject" key={index}>
                  <div className="item">
                    <p>{index}.</p>
                    <h1>{subject.name}</h1>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteSubject(subject._id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
