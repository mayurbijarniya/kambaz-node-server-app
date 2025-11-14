import model from "./model.js";

export default function EnrollmentsDao(db) {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }

  function enrollUserInCourse(user, course) {
    const newEnrollment = { user, course, _id: `${user}-${course}` };
    return model.create(newEnrollment);
  }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findUsersForCourse,
    findCoursesForUser,
  };
}


