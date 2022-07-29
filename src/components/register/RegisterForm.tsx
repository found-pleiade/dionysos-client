import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../states/user";
import useCreateUser from "../../states/user/createUser";
import Button from "../Button";
import Input from "../Input";
import RowGroup from "../../layouts/RowGroup";
import { isLenZero, isValid } from "../../utils";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const { isLoading, error, data, safeMutate } = useCreateUser(name);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      user.dispatch({
        type: "SET_URI_AND_ID",
        payload: {
          uri: data.uri,
        },
      });

      user.dispatch({
        type: "SET_NAME",
        payload: {
          name,
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
        disabled={isLenZero(name) || !isValid(name)}
      >
        {buttonText()}
      </Button>
    </RowGroup>
  );
};

export default RegisterForm;
