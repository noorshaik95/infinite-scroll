function createValidationRule(ruleName, errorMessage, validateFunc) {
    return {
        name: ruleName,
        message: errorMessage,
        validate: validateFunc
    };
}

export function requiredRule(inputName) {
    return createValidationRule(
        "required",
        `${inputName} is required`,
        (inputValue, _) => inputValue.length !== 0
    );
}

