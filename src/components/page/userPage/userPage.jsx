import React, { useState, useEffect } from "react";
import Loader from "../../ui/loader";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCardQualities from "./userCardQualities";
import CardUser from "./cardUser";
import UserCardMeet from "./userCardMeet";
import CommentsList from "./UserComents/commentsList";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(id).then((user) => setUser(user));
  }, []);

  if (user) {
    const { _id } = user;

    return (
      <div className="container" key={_id}>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <CardUser {...user} />
            <UserCardQualities {...user} />
            <UserCardMeet {...user} />
          </div>
          <div className="col-md-8">
            <CommentsList />
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;
