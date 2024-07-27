import { Classroom } from '../models/Classroom';
import { Student } from '../models/Student';
import { logger } from '../utils/Logger';
import {
  ClassroomNotFoundError,
  StudentAlreadyExistsError,
  StudentNotFoundError,
  AssignmentNotFoundError
} from '../utils/Errors';

export class ClassroomController {
  private classrooms: Map<string, Classroom>;

  constructor() {
    this.classrooms = new Map<string, Classroom>();
  }

  addClassroom(name: string): void {
    if (this.classrooms.has(name)) {
      const message = `Classroom ${name} already exists.`;
      logger.error(message);
      throw new Error(message);
    }
    this.classrooms.set(name, new Classroom(name));
    logger.info(`Classroom ${name} has been created.`);
  }

  addStudent(studentId: string, studentName: string, classroomName: string): void {
    const classroom = this.classrooms.get(classroomName);
    if (!classroom) {
      throw new ClassroomNotFoundError(classroomName);
    }
    if (classroom.hasStudent(studentId)) {
      throw new StudentAlreadyExistsError(studentId, classroomName);
    }
    classroom.addStudent(new Student(studentId, studentName));
    logger.info(`Student ${studentName} (${studentId}) has been enrolled in ${classroomName}.`);
  }

  scheduleAssignment(classroomName: string, assignmentDetails: string): void {
    const classroom = this.classrooms.get(classroomName);
    if (!classroom) {
      throw new ClassroomNotFoundError(classroomName);
    }
    classroom.scheduleAssignment(assignmentDetails);
    logger.info(`Assignment for ${classroomName} has been scheduled.`);
  }

  listClassrooms(): string[] {
    return Array.from(this.classrooms.keys());
  }

  listStudents(classroomName: string): Student[] {
    const classroom = this.classrooms.get(classroomName);
    if (!classroom) {
      throw new ClassroomNotFoundError(classroomName);
    }
    return classroom.getStudents();
  }

  deleteClassroom(name: string): void {
    if (!this.classrooms.has(name)) {
      throw new ClassroomNotFoundError(name);
    }
    this.classrooms.delete(name);
    logger.info(`Classroom ${name} has been deleted.`);
  }

  removeStudent(studentId: string, classroomName: string): boolean {
    const classroom = this.classrooms.get(classroomName);
    if (!classroom) {
      throw new ClassroomNotFoundError(classroomName);
    }
    if (!classroom.hasStudent(studentId)) {
      logger.warn(`Student ${studentId} was not found in ${classroomName}.`);
      return false;
    }
    classroom.removeStudent(studentId);
    logger.info(`Student ${studentId} has been removed from ${classroomName}.`);
    return true;
  }

  submitAssignment(studentId: string, classroomName: string, assignmentDetails: string): void {
    const classroom = this.classrooms.get(classroomName);
    if (!classroom) {
      throw new ClassroomNotFoundError(classroomName);
    }
    const student = classroom.getStudent(studentId);
    if (!student) {
      throw new StudentNotFoundError(studentId, classroomName);
    }
    if (!classroom.isAssignmentScheduled(assignmentDetails)) {
      throw new AssignmentNotFoundError(assignmentDetails, classroomName);
    }
    student.submitAssignment(assignmentDetails);
    logger.info(`Assignment ${assignmentDetails} submitted by Student ${studentId} in ${classroomName}.`);
  }
}
