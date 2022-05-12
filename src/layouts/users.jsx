import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersList from "../components/page/userListPage/usersListPage";

const Users = () => {
  const params = useParams();
  const { id } = params;

  return <>{id ? <UserPage id={id} /> : <UsersList />}</>;
};

export default Users;
