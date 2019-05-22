var express = require("express");
var router = express.Router();
var urlService = require("../services/urlService");
var path = require("path");
var statsService = require("../services/statsService");

// redirect to longURL
router.get("*", function (req, res) {
    var shortUrl = decodeURIComponent(req.originalUrl.slice(1));
    urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.redirect(url.longUrl);
            statsService.logRequest(shortUrl, req);
        } else {
            res.sendFile("404.html", {root: path.join(__dirname, "../public/views/")});
        }
    });
});

module.exports = router;