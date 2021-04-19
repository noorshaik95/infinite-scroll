import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authContext";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    logout: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    root: {
        marginTop: theme.spacing(8),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function UserList() {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const classes = useStyles();
    const [list, setList] = useState([]);

    const fetchMoreListItems = (page) => {
        if (!authCtx.isLoggedIn) {
            return;
        }
        axios.get(`https://randomuser.me/api/?page=${page}&results=10`).then(res => {
            setList(prevState => { return [...prevState, ...res.data.results] });
        });
        setIsFetching(false);
    }

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    useEffect(() => {
        if (!authCtx.isLoggedIn) {
            history.push('/');
        }
    });

    useEffect(() => {
        setIsFetching(true)
    }, []);

    const content = list.map((contact) => {
        return (
            <>
                <ListItem>
                    <ListItemText primary={`${contact.name.first} ${contact.name.last}`} />
                    <ListItemAvatar>
                        <Avatar src={`${contact.picture.thumbnail}`} />
                    </ListItemAvatar>
                </ListItem>
                <Divider component="li" />
            </>
        );
    });
    return (
        <>
            <Button variant="contained" size="large" color="primary" className={classes.logout} onClick={authCtx.onLogout}>Logout</Button>
            <List className={classes.root}>
                {
                    content
                }
                {isFetching && <CircularProgress style={{ margin: '0 50%' }} />}
            </List>
        </>
    );
}
