module.exports = function(express) {

    var router = express.Router();

    // ログインページ
    router.get("/", function (req, res) {
        console.log("logout precess....");
        delete req.session.user;
        res.render('login',{message:""});
    });

    return router;
}