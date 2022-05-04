import React, { useState, useEffect } from "react";
import Loader from "./loader";
import api from "../api";
import badgesClassName from "../utils/badgeClassName";
import { useParams, useHistory } from "react-router-dom";

const UserInfo = () => {
  const [userPage, setUserPage] = useState();
  const userId = useParams().id;
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then(user => setUserPage(user));
  }, [userId]);

  const handleSave = () => {
    history.replace("/users");
  };

  if (userPage) {
    const {
      _id,
      name,
      profession,
      qualities,
      completedMeetings,
      rate
    } = userPage;

    return (
      <div style={styled.block} key={_id} className="user__info">
        <h1>{name}</h1>
        <span style={styled.font}>{"Профессия: " + profession.name}</span>
        <ul style={{ listStyle: "none" }}>
          {qualities.map(qual => (
            <li key={qual._id}><span className={badgesClassName(qual.color)}>{qual.name}</span></li>
          ))}
        </ul>
        <span style={styled.font && { display: "block" }}>{"Встретился раз: " + completedMeetings}</span>
        <span style={styled.font}>{"Рэйтинг :" + rate}</span>
        <button style={{ marginTop: "20px", display: "block" }} className="btn btn-dark" onClick={handleSave}>Все пользователи</button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

const styled = {
  block: { display: "block", padding: "10px" },
  font: { fontSize: "20px", fontWeight: "bold" }
};

export default UserInfo;
