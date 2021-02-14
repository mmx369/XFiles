import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

type TProps = {
    toggleDrawer: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("lg")]: {
                display: "none"
            }
        }
    })
);

const AppBarTop: React.FC<TProps> = props => {
    const classes = useStyles();
    const { toggleDrawer } = props;

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    onClick={toggleDrawer}
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <div style={{ flexGrow: 1 }} />
                <IconButton aria-label="github" color="inherit"></IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarTop;
