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

      auth.setPassword(password);

      navigate("/home");
    }
  }, [data]);

  return (
    <form
      className="flex flex-col w-full gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <RowGroup>
        <Input
          id="connect"
          className="rounded-r-none bg-light-primary-100 focus:bg-light-primary-100"
          placeholder="Username"
          value={name}
          setValue={setName}
        />

        <Button
          type="submit"
          className="rounded-l-none"
          loading={isLoading}
          disabled={!isValid(name)}
        >
          {error ? "Try again" : "Next"}
        </Button>
      </RowGroup>

      <ErrorCard show={!isValidConditions.lteTwenty(name)}>
        Maximum length is 20 chars
      </ErrorCard>
    </form>
  );
};

export default RegisterForm;
