import { useState, useCallback } from "react";

function useForm(formObject) {
    const [form, setForm] = useState(formObject);

    function renderFormInputs() {
        return Object.values(form).map((inputObject) => {
            const { value, label, errorMessage, valid, renderInput } = inputObject;
            return renderInput(onInputChange, value, valid, errorMessage, label);
        });
    }

    const isInputFieldValid = useCallback(
        (inputField) => {
            for (const rule of inputField.validationRules) {
                if (!rule.validate(inputField.value, form)) {
                    inputField.errorMessage = rule.message;
                    return false;
                }
            }
            return true;
        },
        [form]
    );

    const onInputChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            const inputObj = { ...form[name] };
            inputObj.value = value;

            const isValidInput = isInputFieldValid(inputObj);
            if (isValidInput && !inputObj.valid) {
                inputObj.valid = true;
            } else if (!isValidInput && inputObj.valid) {
                inputObj.valid = false;
            }
            inputObj.touched = true;
            setForm({ ...form, [name]: inputObj });
        },
        [form, isInputFieldValid]
    );

    const isFormValid = useCallback(() => {
        let isValid = true;
        const fields = Object.values(form);

        for (let field of fields) {
            if (!field.valid) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }, [form]);

    return { renderFormInputs, isFormValid };
}

export default useForm;
