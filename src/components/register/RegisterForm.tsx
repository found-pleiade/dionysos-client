import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, ActionTypes as UserActionTypes } from "../../states/user";
import useCreateUser from "../../states/user/createUser";
import Button from "../Button";
import Input from "../Input";
import RowGroup from "../../layouts/RowGroup";
import { isValid } from "../../utils";
import {
  SettingsContext,
  ActionTypes as SettingsActionTypes,
} from "../../states/settings";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const { isLoading, error, data, safeMutate } = useCreateUser(name);
  const user = useContext(UserContext);
  const settings = useContext(SettingsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      user.dispatch({
        type: UserActionTypes.SET_URI_AND_ID,
        payload: {
          uri: data.uri,
        },
      });

      user.dispatch({
        type: UserActionTypes.SET_NAME,
        payload: {
          name,
        },
      });

      settings.dispatch({
        type: SettingsActionTypes.SET_PASSWORD,
        payload: {
          password: data.password,
        },
      });

      navigate("/home");
    }
  }, [data]);

  const buttonText = () => {
    if (error) {
      return "Try again";
    }

    return "Next";
  };

  return (
    <RowGroup>
      <Input
        id="connect"
        className="rounded-r-none bg-light-primary-100 focus:bg-light-primary-100"
        placeholder="Username"
        value={name}
        setValue={setName}
      />

      <Button
        className="rounded-l-none w-[12ch] flex items-center justify-center"
        onClick={safeMutate}
        loading={isLoading}
        disabled={!isValid(name)}
      >
        {buttonText()}
      </Button>
    </RowGroup>
  );
};

export default RegisterForm;
