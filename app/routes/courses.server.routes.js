const courses = require("../../app/controllers/courses.server.controller");
const students = require("../../app/controllers/students.server.controller");

module.exports = function (app) {
    app.post('/course', students.requiresLogin, courses.create);
    app.get('/courses', students.requiresLogin, courses.list);
    // app.get('/course', students.requiresLogin, courses.create);
//   app
//     .route("/api/articles")
//     .get(articles.list)
//     .post(users.requiresLogin, articles.create);
//   //
//   app
//     .route("/api/articles/:articleId")
//     .get(articles.read)
//     .put(users.requiresLogin, articles.hasAuthorization, articles.update)
//     .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
//   //
//   app.param("articleId", articles.articleByID);
};
