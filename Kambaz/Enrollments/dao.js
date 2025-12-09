import model from "./model.js";

export default function EnrollmentsDao(db) {
  function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
  }

  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }

  async function enrollUserInCourse(userId, courseId) {
    const _id = `${userId}-${courseId}`;
    try {
      return await model.create({ _id, user: userId, course: courseId });
    } catch (e) {
      if (e && e.code === 11000) {
        return model.findById(_id);
      }
      throw e;
    }
  }

  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ _id: `${userId}-${courseId}` });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findEnrollmentsForUser,
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
