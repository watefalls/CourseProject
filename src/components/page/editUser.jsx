import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../ui/loader";
import MultiSelectField from "../common/form/miltiSelectField";
import RadioField from "../common/form/radioField";
import SelectField from "../common/form/selectField";
import { useProfession } from "../../hooks/useProfession";
import { useQuality } from "../../hooks/useQuality";
import { useUsers } from "../../hooks/useUsers";
import httpService from "../../services/http.service";

const EditUser = () => {
  const params = useParams();
  const history = useHistory();
  const { id } = params;
  const { usersGetById } = useUsers();
  const { professions, isLoading: loadProf, getProfession } = useProfession();
  const { qualities, isLoading: loadQual } = useQuality();
  const user = usersGetById(id);
  const initialState = user || {};
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(initialState);
  const profList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }));

  const qualList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }));

  const validatorConfig = {
    name: {
      isRequired: { message: "Поле обязательно для заполнения" }
    },
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен не коректно" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать минимум одну заглавную букву"
      },
      isContentsDigit: {
        message: "Пароль должен содержать минимум одну цифру"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      },
      profession: {
        isRequired: { message: "Поле обязательно для заполнения" }
      }
    }
  };

  const handleBackHistory = () => {
    history.goBack();
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  if (!loadProf && !loadQual) {
    const getProfessionById = (id) => {
      for (const prof of professions) {
        if (prof.value === id) {
          return { _id: prof.value, name: prof.label };
        }
      }
    };

    const getQualities = (elements) => {
      const qualitiesArray = [];
      for (const elem of elements) {
        for (const quality in qualities) {
          if (elem.value === qualities[quality].value) {
            qualitiesArray.push({
              _id: qualities[quality].value,
              name: qualities[quality].label,
              color: qualities[quality].color
            });
          }
        }
      }
      return qualitiesArray;
    };

    const handleUpdate = (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;

      // data.profession = getProfessionById(data.profession);
      // data.qualities = getQualities(data.qualities);
      history.push(`/users/${id}`);
      // eslint-disable-next-line no-unused-vars
      const { profession, qualities } = data;
      httpService.put(`user/${id}`, {
        ...data,
        profession: getProfessionById(data.profession),
        qualities: getQualities(data.qualities)
      });
    };

    return (
      <>
        <div className="btnback position-absolute">
          <button
            className="btn btn-primary"
            style={{ width: "100px", marginTop: "50px", marginLeft: "50px" }}
            onClick={handleBackHistory}
          >
            Назад
          </button>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className=".col-md-6 .offset-md-3 shadow p-4">
              <form onSubmit={handleUpdate}>
                <TextField
                  label="Имя"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Электронная почта"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Выберите вашу профессию"
                  onChange={handleChange}
                  options={profList}
                  name="profession"
                  defaultOption={getProfession(data.profession).name}
                  error={errors.profession}
                  value={data.profession}
                />
                <RadioField
                  onChange={handleChange}
                  options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                  ]}
                  value={data.sex}
                  name="sex"
                  label="Выберите ваш пол"
                />
                <MultiSelectField
                  options={qualList}
                  onChange={handleChange}
                  name="qualities"
                  label="Выберите ваши качества"
                  defaultValue={data.qualities}
                  error={errors.qualities}
                />

                <button disabled={!isValid} className="btn btn-primary">
                  Обновить
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else return <Loader />;
};

export default EditUser;
