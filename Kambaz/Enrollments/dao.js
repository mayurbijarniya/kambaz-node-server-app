import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const existing = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existing) {
      return existing;
    }
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments.push(newEnrollment);
    return newEnrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    const initialLength = enrollments.length;
    db.enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return { status: "ok" };
  }

  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
  };
}


