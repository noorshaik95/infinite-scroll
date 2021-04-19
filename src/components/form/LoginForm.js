import React, { useContext, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { loginForm } from "../../utils/formConfig";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import AuthContext from "../../store/authContext";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginForm() {
    const { renderFormInputs, isFormValid } = useForm(loginForm);
    const classes = useStyles();
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            history.push('/welcome');
        }
    });

    return (
        <div className={classes.paper}>
            <form>
                <h1>Login</h1>
                {renderFormInputs()}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={authCtx.onLogin}
                    disabled={!isFormValid()}
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
