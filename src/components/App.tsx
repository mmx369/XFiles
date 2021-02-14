import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBarTop from "./AppTopBar/AppBarTop";

const drawerWidth = 240;

const useStyles = makeStyles(
    theme => ({
        root: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                display: "block"
            }
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        main: {
            flexGrow: 1,
            padding: 0
        }
    }),
    { index: 1 }
);

export default function App() {
    const classes = useStyles();
    const isLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
    const [isDrawerOpened, setIsDrawerOpened] = React.useState(false);
    const drawerVariant = isLarge ? "permanent" : "temporary";
    const toggleDrawer = () => setIsDrawerOpened(!isDrawerOpened);

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant={drawerVariant}
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
                open={isLarge ? true : isDrawerOpened}
                onClose={toggleDrawer}
            ></Drawer>
            <div className={classes.main}>
                <AppBarTop toggleDrawer={toggleDrawer} />
            </div>
            <h1>Test22222</h1>

            <div></div>
        </div>
    );
}
