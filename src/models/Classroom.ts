// src/models/Classroom.ts

import { Student } from './Student';

export class Classroom {
  private students: Map<string, Student>;
  private assignments: Set<string>;

  constructor(public name: string) {
    this.students = new Map<string, Student>();
    this.assignments = new Set<string>();
  }

  addStudent(student: Student): void {
    this.students.set(student.id, student);
  }

  removeStudent(studentId: string): void {
    this.students.delete(studentId);
  }

  hasStudent(studentId: string): boolean {
    return this.students.has(studentId);
  }

  getStudents(): Student[] {
    return Array.from(this.students.values());
  }

  scheduleAssignment(assignmentDetails: string): void {
    this.assignments.add(assignmentDetails);
  }

  isAssignmentScheduled(assignmentDetails: string): boolean {
    return this.assignments.has(assignmentDetails);
  }

  getStudent(studentId: string): Student | undefined {
    return this.students.get(studentId);
  }
}
