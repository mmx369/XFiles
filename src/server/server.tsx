import * as express from "express";
import * as compression from "compression";
import { Request, Response } from "express";
import * as chalk from "chalk";
import * as React from "react";
import { Helmet } from "react-helmet";
import * as ReactDOMServer from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import { StaticRouter } from "react-router-dom";
import * as defaultConfig from "../../config/default";
import App from "../components/App";
import { customTheme } from "../theme";
import { renderIndexHtml } from "./renderIndexHtml";
import * as http from "http";

const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "localhost";
const targetDir = defaultConfig.buildConfig.targetDir;

function handleRender(req: Request, res: Response) {
    const sheets = new ServerStyleSheets();
    const context = {};

    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
        sheets.collect(
            <ThemeProvider theme={customTheme}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </ThemeProvider>
        )
    );

    // SEO tags
    const helmet = Helmet.renderStatic();

    // Grab the CSS from the sheets.
    const css = sheets.toString();

    // Send the rendered page back to the client.
    res.send(renderIndexHtml(html, css, helmet));
}

const app = express();
app.use(compression({ filter: shouldCompress }));
const server = http.createServer(app);

function shouldCompress(req: Request, res: Response) {
    if (req.headers["x-no-compression"]) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
}

// Server static assets
app.use(
    express.static(targetDir, {
        etag: true,
        maxAge: 0
    })
);

app.get("*", (req: Request, res: Response) => {
    handleRender(req, res);
});

server.listen(port, () => {
    console.log(
        `Serving at http://${host}:${port} ${chalk.green("✓")}. ${chalk.red("To run in dev mode: npm run dev")}`
    );
});
