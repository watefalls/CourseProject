import React, { useEffect, useState } from "react";
import SelectField from "../../../common/form/selectField";
import PropTypes from "prop-types";
import API from "../../../../api";
import { validator } from "../../../../utils/validator";
import TextAreaField from "../../../common/form/textAreaField";
const initialState = { userId: "", content: "" };

const AddComment = ({ onSubmit }) => {
  const [data, setData] = useState(initialState);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const arrayOfUsers =
    users &&
    Object.keys(users).map((user) => ({
      label: users[user].name,
      value: users[user]._id
    }));

  const clearForm = () => {
    setData(initialState);
    setErrors({});
  };

  const hadleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберите от чьего имени вы хотите отправить коментарий"
      }
    },
    content: {
      isRequired: { message: "Сообщение не может быть пустым" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectField
        label="Выберите имя"
        onChange={hadleChange}
        options={arrayOfUsers}
        name="userId"
        value={data.userId}
        error={errors.userId}
        defaultOption="Выберите пользователя"
      />
      <TextAreaField
        className="form-control"
        value={data.content}
        onChange={hadleChange}
        name="content"
        label="Cообщение"
        error={errors.content}
      />
      <div className=" mt-3 d-flex justify-content-end">
        <button className="btn btn-primary">Опубликовать</button>
      </div>
    </form>
  );
};

AddComment.propTypes = {
  onSubmit: PropTypes.func
};
export default AddComment;
