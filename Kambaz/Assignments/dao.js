import { v4 as uuidv4 } from "uuid";
import assignmentModel from "./model.js";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return assignmentModel.find({ course: courseId });
  }

  function createAssignment(courseId, assignment) {
    const { _id, course, ...rest } = assignment;
    const newAssignment = {
      ...rest,
      _id: uuidv4(),
      course: courseId,
    };
    return assignmentModel.create(newAssignment);
  }

  function deleteAssignment(assignmentId) {
    return assignmentModel.deleteOne({ _id: assignmentId });
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    return assignmentModel.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
