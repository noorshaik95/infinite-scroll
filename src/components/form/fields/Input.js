import React from "react";
import TextField from '@material-ui/core/TextField';

function InputField(props) {
    const {
        label,
        type,
        name,
        handleChange,
        errorMessage,
        isValid,
        value
    } = props;

    return (
        <div>
            <TextField
                error={errorMessage !== '' && !isValid}
                label={label}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                helperText={!isValid && errorMessage} />
        </div>
    );
}

export default React.memo(InputField);
