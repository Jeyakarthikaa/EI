import readline from 'readline';
import { ClassroomController } from '../controllers/ClassroomController';
import { logger } from '../utils/Logger';

export class VirtualClassroomManager {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  private controller = new ClassroomController();

  start() {
    this.showMenu();
  }

  private showMenu() {
    console.log(`
      1. Add Classroom
      2. Add Student
      3. Schedule Assignment
      4. List Classrooms
      5. List Students
      6. Delete Classroom
      7. Remove Student from Classroom
      8. Submit Assignment
      9. Exit
    `);

    this.rl.question('Select an option: ', (option) => {
      switch (option.trim()) {
        case '1':
          this.addClassroom();
          break;
        case '2':
          this.addStudent();
          break;
        case '3':
          this.scheduleAssignment();
          break;
        case '4':
          this.listClassrooms();
          break;
        case '5':
          this.listStudents();
          break;
        case '6':
          this.deleteClassroom();
          break;
        case '7':
          this.removeStudent();
          break;
        case '8':
          this.submitAssignment();
          break;
        case '9':
          this.exit();
          break;
        default:
          console.log('Invalid option. Please try again.');
          this.showMenu();
      }
    });
  }

  private addClassroom() {
    this.rl.question('Enter classroom name: ', (classroomName) => {
      if (!this.isValidClassroomName(classroomName)) {
        console.error('Error: Classroom name must be alphanumeric and cannot contain special characters.');
        return this.showMenu();
      }
      try {
        this.controller.addClassroom(classroomName);
        // Log the action
        logger.info(`Classroom ${classroomName} has been created.`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          logger.error(error.message);
        } else {
          logger.error('An unknown error occurred');
        }
      }
      this.showMenu();
    });
  }

  private addStudent() {
    this.rl.question('Enter student ID: ', (studentId) => {
      if (!this.isValidStudentId(studentId)) {
        console.error('Error: Student ID must be a unique positive integer.');
        return this.showMenu();
      }
      this.rl.question('Enter student name: ', (studentName) => {
        this.rl.question('Enter classroom name: ', (classroomName) => {
          if (studentName.trim() === '' || classroomName.trim() === '') {
            console.error('Error: Enter all fields.');
            return this.showMenu();
          }
          try {
            this.controller.addStudent(studentId, studentName, classroomName);
            // Log the action
            logger.info(`Student ${studentName} (${studentId}) has been enrolled in ${classroomName}.`);
          } catch (error: unknown) {
            if (error instanceof Error) {
              logger.error(error.message);
            } else {
              logger.error('An unknown error occurred');
            }
          }
          this.showMenu();
        });
      });
    });
  }

  private scheduleAssignment() {
    this.rl.question('Enter classroom name: ', (classroomName) => {
      this.rl.question('Enter assignment details: ', (assignmentDetails) => {
        if (classroomName.trim() === '' || assignmentDetails.trim() === '') {
          console.error('Error: Enter all fields.');
          return this.showMenu();
        }
        try {
          this.controller.scheduleAssignment(classroomName, assignmentDetails);
          // Log the action
          logger.info(`Assignment for ${classroomName} has been scheduled.`);
        } catch (error: unknown) {
          if (error instanceof Error) {
            logger.error(error.message);
          } else {
            logger.error('An unknown error occurred');
          }
        }
        this.showMenu();
      });
    });
  }

  private listClassrooms() {
    try {
      const classrooms = this.controller.listClassrooms();
      if (classrooms.length === 0) {
        console.log('No classrooms available.');
      } else {
        console.log('Classrooms:');
        classrooms.forEach((classroom) => console.log(`- ${classroom}`));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(error.message);
      } else {
        logger.error('An unknown error occurred');
      }
    }
    this.showMenu();
  }

  private listStudents() {
    this.rl.question('Enter classroom name: ', (classroomName) => {
      if (classroomName.trim() === '') {
        console.error('Error: Enter all fields.');
        return this.showMenu();
      }
      try {
        const students = this.controller.listStudents(classroomName);
        if (!students || students.length === 0) {
          console.log(`No students enrolled in ${classroomName}.`);
        } else {
          console.log(`Students in ${classroomName}:`);
          students.forEach(({ id, name }) => console.log(`- ${name} (${id})`));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          logger.error(error.message);
        } else {
          logger.error('An unknown error occurred');
        }
      }
      this.showMenu();
    });
  }

  private deleteClassroom() {
    this.rl.question('Enter classroom name to delete: ', (classroomName) => {
      if (!this.isValidClassroomName(classroomName)) {
        console.error('Error: Classroom name must be alphanumeric and cannot contain special characters.');
        return this.showMenu();
      }
      try {
        this.controller.deleteClassroom(classroomName);
        // Log the action
        logger.info(`Classroom ${classroomName} has been deleted.`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          logger.error(error.message);
        } else {
          logger.error('An unknown error occurred');
        }
      }
      this.showMenu();
    });
  }

  private removeStudent() {
    this.rl.question('Enter student ID: ', (studentId) => {
      if (!this.isValidStudentId(studentId)) {
        console.error('Error: Student ID must be a unique positive integer.');
        return this.showMenu();
      }
      this.rl.question('Enter classroom name: ', (classroomName) => {
        if (classroomName.trim() === '') {
          console.error('Error: Enter all fields.');
          return this.showMenu();
        }
        try {
          const studentRemoved = this.controller.removeStudent(studentId, classroomName);
          if (studentRemoved) {
            // Log and display action
            logger.info(`Student ${studentId} has been removed from ${classroomName}.`);
            console.log(`Student ${studentId} has been removed from ${classroomName}.`);
          } else {
            console.log(`No student with ID ${studentId} found in ${classroomName}.`);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            logger.error(error.message);
          } else {
            logger.error('An unknown error occurred');
          }
        }
        this.showMenu();
      });
    });
  }

  private submitAssignment() {
    this.rl.question('Enter student ID: ', (studentId) => {
      if (!this.isValidStudentId(studentId)) {
        console.error('Error: Student ID must be a unique positive integer.');
        return this.showMenu();
      }
      this.rl.question('Enter classroom name: ', (classroomName) => {
        this.rl.question('Enter assignment details: ', (assignmentDetails) => {
          if (classroomName.trim() === '' || assignmentDetails.trim() === '') {
            console.error('Error: Enter all fields.');
            return this.showMenu();
          }
          try {
            this.controller.submitAssignment(studentId, classroomName, assignmentDetails);
            // Log the action
            logger.info(`Assignment submitted by Student ${studentId} in ${classroomName}.`);
          } catch (error: unknown) {
            if (error instanceof Error) {
              logger.error(error.message);
            } else {
              logger.error('An unknown error occurred');
            }
          }
          this.showMenu();
        });
      });
    });
  }

  private exit() {
    console.log('Exiting...');
    console.log('Thank you!!');
    this.rl.close();
  }

  private isValidClassroomName(name: string): boolean {
    // Alphanumeric characters and spaces only
    return /^[a-zA-Z0-9 ]+$/.test(name);
  }

  private isValidStudentId(id: string): boolean {
    // Positive integer only
    const numberId = parseInt(id, 10);
    return Number.isInteger(numberId) && numberId > 0;
  }
}
