"use strict";
// src/models/Student.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.assignments = new Set();
    }
    submitAssignment(assignmentDetails) {
        this.assignments.add(assignmentDetails);
    }
}
exports.Student = Student;
