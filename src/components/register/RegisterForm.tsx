import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, ActionTypes as UserActionTypes } from "../../states/user";
import useCreateUser from "../../states/user/createUser";
import Button from "../Button";
import Input from "../Input";
import RowGroup from "../../layouts/RowGroup";
import { isValid, isValidConditions } from "../../utils";
import { AuthContext } from "../../features/auth";
import ErrorCard from "../ErrorCard";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const { isLoading, error, data, mutate } = useCreateUser(name);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const { uri, password } = data;

      user.dispatch({
        type: UserActionTypes.SET_URI_AND_ID,
        payload: { uri },
      });

      user.dispatch({
        type: UserActionTypes.SET_NAME,
        payload: { name },
      });

      auth.setPassword(password);

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
    <div className="flex flex-col w-full gap-1">
      <RowGroup>
        <Input
          id="connect"
          className="rounded-r-none bg-light-primary-100 focus:bg-light-primary-100"
          placeholder="Username"
          value={name}
          setValue={setName}
        />

        <Button
          className="rounded-l-none"
          onClick={mutate}
          loading={isLoading}
          disabled={!isValid(name)}
        >
          {buttonText()}
        </Button>
      </RowGroup>

      <ErrorCard show={!isValidConditions.lteTwenty(name)}>
        Maximum length is 20 chars
      </ErrorCard>
    </div>
  );
};

export default RegisterForm;
