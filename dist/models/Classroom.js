"use strict";
// src/models/Classroom.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classroom = void 0;
class Classroom {
    constructor(name) {
        this.name = name;
        this.students = new Map();
        this.assignments = new Set();
    }
    addStudent(student) {
        this.students.set(student.id, student);
    }
    removeStudent(studentId) {
        this.students.delete(studentId);
    }
    hasStudent(studentId) {
        return this.students.has(studentId);
    }
    getStudents() {
        return Array.from(this.students.values());
    }
    scheduleAssignment(assignmentDetails) {
        this.assignments.add(assignmentDetails);
    }
    isAssignmentScheduled(assignmentDetails) {
        return this.assignments.has(assignmentDetails);
    }
    getStudent(studentId) {
        return this.students.get(studentId);
    }
}
exports.Classroom = Classroom;
