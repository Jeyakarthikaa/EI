// src/utils/Errors.ts

export class ClassroomNotFoundError extends Error {
    constructor(classroomName: string) {
      super(`Classroom ${classroomName} does not exist.`);
    }
  }
  
  export class StudentAlreadyExistsError extends Error {
    constructor(studentId: string, classroomName: string) {
      super(`Student ID ${studentId} already exists in ${classroomName}.`);
    }
  }
  
  export class StudentNotFoundError extends Error {
    constructor(studentId: string, classroomName: string) {
      super(`Student ${studentId} is not enrolled in ${classroomName}.`);
    }
  }
  
  export class AssignmentNotFoundError extends Error {
    constructor(assignmentDetails: string, classroomName: string) {
      super(`Assignment ${assignmentDetails} is not scheduled for ${classroomName}.`);
    }
  }
  