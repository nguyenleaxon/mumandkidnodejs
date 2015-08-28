module.exports = {
    registerRoutes: function (app) {
        app.get("/", this.login);
    },

    login : function (req, res, next) {
        res.render('login');
    }
}