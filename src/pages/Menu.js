import React, { useState, useLayoutEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {
    Button,
    Grid,
    Paper,
    MenuItem,
}
    from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'
import Registro from './screen/Registro'
import Lista from './screen/Lista'

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
  }));


export default function Menu() {
    let history = useHistory();

    const classes = useStyles();

    const [screen, setScreen] = useState(0)

    const logoff = () => {
        sessionStorage.removeItem("uuid")
        Firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/");
            }).catch(() => {
                history.push("/");
            })
    }

    return (
        <div>
          <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                  SMILE SYSTEM
                </Typography>
                <nav>
                  <MenuItem onClick={() => setScreen(2)}>Cadastro</MenuItem>
                  <MenuItem onClick={() => setScreen(1)}>Agendamentos</MenuItem>
                </nav>
                <Button
                        onClick={logoff}
                        variant="contained"
                        color="primary"
                        startIcon={<ExitToAppIcon />}>
                        Logoff
                    </Button>
              </Toolbar>
            </AppBar>
            </React.Fragment>
            <Grid container spacing={1}>
                <Grid item sm={10} xs={12}>
                    <Paper>
                        {screen == 0 &&
                            <>
                                WELCOME TO SMILE SYSTEM
                            </>
                        }
                        {screen == 1 &&
                            <Lista setScreen={setScreen} />
                        }
                        {screen == 2 &&
                            <Registro setScreen={setScreen} />
                        }

                    </Paper>
                </Grid>
          </Grid>
      </div>
    );
}
