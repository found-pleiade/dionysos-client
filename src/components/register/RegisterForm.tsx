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
import Form from "../Form";
import { ArrowRightIcon } from "@heroicons/react/solid";

const RegisterForm = ({ disabled }: { disabled: boolean }) => {
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
    <Form onSubmit={() => mutate()} className="flex flex-col w-full">
      <RowGroup>
        <Input
          id="connect"
          className="rounded-none md:rounded-md md:rounded-r-none bg-light-primary-200"
          placeholder="Username"
          value={name}
          setValue={setName}
          disabled={disabled}
        />

        <Button
          type="submit"
          className="rounded-none md:rounded-md md:rounded-l-none bg-light-primary-200 text-light-accent-400 w-12 pl-2 pr-4"
          loading={isLoading}
          disabled={!isValid(name) || disabled}
        >
          <ArrowRightIcon />
        </Button>
      </RowGroup>

      <ErrorCard
        show={!isValidConditions.lteTwenty(name)}
        className="!rounded-none md:!rounded-b-md text-light-primary-100"
      >
        Maximum length is 20 chars
      </ErrorCard>
    </Form>
  );
};

export default RegisterForm;
