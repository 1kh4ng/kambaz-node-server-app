import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const resolveUserId = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return null;
      }
      userId = currentUser._id;
    }
    return userId;
  };

  const findEnrollmentsForUser = async (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const enrollUserInCourse = async (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    const { courseId } = req.params;
    const enrollment = await dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = async (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    const { courseId } = req.params;
    const status = await dao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}
