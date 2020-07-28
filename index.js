#!/usr/bin/env node

const fs = require('fs');
const http = require('http');

const options = ['/filter_menu', '/drag_drop'];

const server = (req, res) => {
    if (req.url == "/"){
        let content = options.map(e => `<a href="${e}">${e}</a><br>`).join("\n");
        let index =fs.readFileSync("index.html", "UTF-8").replace("{{content}}", content);; 
        res.write(index);
    } else if (options.indexOf(req.url) !== -1) {
        let content = fs.readFileSync(`${req.url.slice(1)}.html`, "UTF-8");
        let index = fs.readFileSync("index.html", "utf-8").replace("{{content}}", content);
        res.write(index);
    } else if (fs.existsSync(req.url.slice(1)) && fs.lstatSync(req.url.slice(1)).isFile()) {
        let mode = ["js", "css", "html", "txt"].indexOf(req.url.split(".").slice(-1)[0]) == -1 ? null : "UTF-8";
        res.write(fs.readFileSync(req.url.slice(1), mode));
    }
    res.end();

};

http.createServer(server).listen(8000);
