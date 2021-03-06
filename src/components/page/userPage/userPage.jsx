import React from "react";
import Loader from "../../ui/loader";
import PropTypes from "prop-types";
import UserCardQualities from "./userCardQualities";
import CardUser from "./cardUser";
import UserCardMeet from "./userCardMeet";
import CommentsList from "./UserComents/commentsList";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ id }) => {
  const user = useSelector(getUserById(id));

  if (user) {
    return (
      <div className="container" key={id}>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <CardUser user={user} />
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
