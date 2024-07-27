"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomController = void 0;
const Classroom_1 = require("../models/Classroom");
const Student_1 = require("../models/Student");
const Logger_1 = require("../utils/Logger");
const Errors_1 = require("../utils/Errors");
class ClassroomController {
    constructor() {
        this.classrooms = new Map();
    }
    addClassroom(name) {
        if (this.classrooms.has(name)) {
            const message = `Classroom ${name} already exists.`;
            Logger_1.logger.error(message);
            throw new Error(message);
        }
        this.classrooms.set(name, new Classroom_1.Classroom(name));
        Logger_1.logger.info(`Classroom ${name} has been created.`);
    }
    addStudent(studentId, studentName, classroomName) {
        const classroom = this.classrooms.get(classroomName);
        if (!classroom) {
            throw new Errors_1.ClassroomNotFoundError(classroomName);
        }
        if (classroom.hasStudent(studentId)) {
            throw new Errors_1.StudentAlreadyExistsError(studentId, classroomName);
        }
        classroom.addStudent(new Student_1.Student(studentId, studentName));
        Logger_1.logger.info(`Student ${studentName} (${studentId}) has been enrolled in ${classroomName}.`);
    }
    scheduleAssignment(classroomName, assignmentDetails) {
        const classroom = this.classrooms.get(classroomName);
        if (!classroom) {
            throw new Errors_1.ClassroomNotFoundError(classroomName);
        }
        classroom.scheduleAssignment(assignmentDetails);
        Logger_1.logger.info(`Assignment for ${classroomName} has been scheduled.`);
    }
    listClassrooms() {
        return Array.from(this.classrooms.keys());
    }
    listStudents(classroomName) {
        const classroom = this.classrooms.get(classroomName);
        if (!classroom) {
            throw new Errors_1.ClassroomNotFoundError(classroomName);
        }
        return classroom.getStudents();
    }
    deleteClassroom(name) {
        if (!this.classrooms.has(name)) {
            throw new Errors_1.ClassroomNotFoundError(name);
        }
        this.classrooms.delete(name);
        Logger_1.logger.info(`Classroom ${name} has been deleted.`);
    }
    removeStudent(studentId, classroomName) {
        const classroom = this.classrooms.get(classroomName);
        if (!classroom) {
            throw new Errors_1.ClassroomNotFoundError(classroomName);
        }
        if (!classroom.hasStudent(studentId)) {
            Logger_1.logger.warn(`Student ${studentId} was not found in ${classroomName}.`);
            return false;
        }
        classroom.removeStudent(studentId);
        Logger_1.logger.info(`Student ${studentId} has been removed from ${classroomName}.`);
        return true;
    }
    submitAssignment(studentId, classroomName, assignmentDetails) {
        const classroom = this.classrooms.get(classroomName);
        if (!classroom) {
            throw new Errors_1.ClassroomNotFoundError(classroomName);
        }
        const student = classroom.getStudent(studentId);
        if (!student) {
            throw new Errors_1.StudentNotFoundError(studentId, classroomName);
        }
        if (!classroom.isAssignmentScheduled(assignmentDetails)) {
            throw new Errors_1.AssignmentNotFoundError(assignmentDetails, classroomName);
        }
        student.submitAssignment(assignmentDetails);
        Logger_1.logger.info(`Assignment ${assignmentDetails} submitted by Student ${studentId} in ${classroomName}.`);
    }
}
exports.ClassroomController = ClassroomController;
