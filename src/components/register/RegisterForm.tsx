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

const RegisterForm = ({
  disabled,
  loading,
  error,
}: {
  disabled: boolean;
  loading: boolean;
  error: boolean;
}) => {
  const [name, setName] = useState("");
  const createUser = useCreateUser(name);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (createUser.data) {
      const { uri, password } = createUser.data;

      user.dispatch({
        type: UserActionTypes.SET_URI_AND_ID,
        payload: { uri },
      });

      auth.setPassword(password);

      navigate("/home");
    }
  }, [createUser.data]);

  return (
    <Form onSubmit={() => createUser.mutate()} className="flex flex-col w-full">
      <RowGroup>
        <Input
          id="connect"
          className="!rounded-none sm:!rounded-md w-full"
          placeholder={loading ? "Connecting…" : "Username"}
          value={name}
          setValue={setName}
          disabled={disabled}
        />

        <Button
          type="submit"
          className="text-light-accent-400 w-12 pl-2 pr-4 -ml-12 z-10"
          loading={loading || createUser.isLoading}
          disabled={!isValid(name) || disabled}
        >
          <ArrowRightIcon />
        </Button>
      </RowGroup>

      <ErrorCard
        show={!isValidConditions.lteTwenty(name)}
        className="!rounded-none sm:!rounded-md sm:mt-4"
      >
        The maximum length is 20 chars.
      </ErrorCard>

      <ErrorCard
        show={createUser.error ? true : false}
        className="!rounded-none sm:!rounded-md sm:mt-4"
      >
        An error occured creating your username.
      </ErrorCard>

      <ErrorCard
        show={error ? true : false}
        className="!rounded-none sm:!rounded-md sm:mt-4"
      >
        An error occured, check your connection or try later.
        <br />
        <p className="italic opacity-90">Details in the server settings</p>
      </ErrorCard>
    </Form>
  );
};

export default RegisterForm;
