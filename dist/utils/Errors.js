"use strict";
// src/utils/Errors.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentNotFoundError = exports.StudentNotFoundError = exports.StudentAlreadyExistsError = exports.ClassroomNotFoundError = void 0;
class ClassroomNotFoundError extends Error {
    constructor(classroomName) {
        super(`Classroom ${classroomName} does not exist.`);
    }
}
exports.ClassroomNotFoundError = ClassroomNotFoundError;
class StudentAlreadyExistsError extends Error {
    constructor(studentId, classroomName) {
        super(`Student ID ${studentId} already exists in ${classroomName}.`);
    }
}
exports.StudentAlreadyExistsError = StudentAlreadyExistsError;
class StudentNotFoundError extends Error {
    constructor(studentId, classroomName) {
        super(`Student ${studentId} is not enrolled in ${classroomName}.`);
    }
}
exports.StudentNotFoundError = StudentNotFoundError;
class AssignmentNotFoundError extends Error {
    constructor(assignmentDetails, classroomName) {
        super(`Assignment ${assignmentDetails} is not scheduled for ${classroomName}.`);
    }
}
exports.AssignmentNotFoundError = AssignmentNotFoundError;
