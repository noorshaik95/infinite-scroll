import React from "react";
import Input from "../components/form/fields/Input";

import { requiredRule } from "./inputValidationRules";


function createFormFieldConfig(label, name, type, defaultValue = "") {
    return {
        renderInput: (handleChange, value, isValid, error, key) => {
            return (
                <Input
                    key={key}
                    name={name}
                    type={type}
                    label={label}
                    isValid={isValid}
                    value={value}
                    handleChange={handleChange}
                    errorMessage={error}
                />
            );
        },
        label,
        value: defaultValue,
        valid: false,
        errorMessage: "",
        touched: false
    };
}

export const loginForm = {
    username: {
        ...createFormFieldConfig("Username", "username", "text"),
        validationRules: [
            requiredRule("username")
        ]
    },
    password: {
        ...createFormFieldConfig("Password", "password", "password"),
        validationRules: [
            requiredRule("password")
        ]
    }
};
