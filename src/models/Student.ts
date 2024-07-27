// src/models/Student.ts

export class Student {
    private assignments: Set<string>;
  
    constructor(public id: string, public name: string) {
      this.assignments = new Set<string>();
    }
  
    submitAssignment(assignmentDetails: string): void {
      this.assignments.add(assignmentDetails);
    }
  }
  