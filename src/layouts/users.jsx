import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/userListPage/usersListPage";
import EditUser from "../components/page/editUser";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/hoc/usersLoader";

const Users = () => {
  const params = useParams();
  const currentId = useSelector(getCurrentUserId());
  const { id, edit } = params;

  return (
    <>
      <UsersLoader>
        {id ? (
          edit ? (
            id === currentId ? (
              <EditUser />
            ) : (
              <Redirect to={`/users/${currentId}/edit`} />
            )
          ) : (
            <UserPage id={id} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  );
};

export default Users;
