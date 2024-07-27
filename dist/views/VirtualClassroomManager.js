"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualClassroomManager = void 0;
const readline_1 = __importDefault(require("readline"));
const ClassroomController_1 = require("../controllers/ClassroomController");
const Logger_1 = require("../utils/Logger");
class VirtualClassroomManager {
    constructor() {
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.controller = new ClassroomController_1.ClassroomController();
    }
    start() {
        this.showMenu();
    }
    showMenu() {
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
    addClassroom() {
        this.rl.question('Enter classroom name: ', (classroomName) => {
            if (!this.isValidClassroomName(classroomName)) {
                console.error('Error: Classroom name must be alphanumeric and cannot contain special characters.');
                return this.showMenu();
            }
            try {
                this.controller.addClassroom(classroomName);
                // Log the action
                Logger_1.logger.info(`Classroom ${classroomName} has been created.`);
            }
            catch (error) {
                if (error instanceof Error) {
                    Logger_1.logger.error(error.message);
                }
                else {
                    Logger_1.logger.error('An unknown error occurred');
                }
            }
            this.showMenu();
        });
    }
    addStudent() {
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
                        Logger_1.logger.info(`Student ${studentName} (${studentId}) has been enrolled in ${classroomName}.`);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            Logger_1.logger.error(error.message);
                        }
                        else {
                            Logger_1.logger.error('An unknown error occurred');
                        }
                    }
                    this.showMenu();
                });
            });
        });
    }
    scheduleAssignment() {
        this.rl.question('Enter classroom name: ', (classroomName) => {
            this.rl.question('Enter assignment details: ', (assignmentDetails) => {
                if (classroomName.trim() === '' || assignmentDetails.trim() === '') {
                    console.error('Error: Enter all fields.');
                    return this.showMenu();
                }
                try {
                    this.controller.scheduleAssignment(classroomName, assignmentDetails);
                    // Log the action
                    Logger_1.logger.info(`Assignment for ${classroomName} has been scheduled.`);
                }
                catch (error) {
                    if (error instanceof Error) {
                        Logger_1.logger.error(error.message);
                    }
                    else {
                        Logger_1.logger.error('An unknown error occurred');
                    }
                }
                this.showMenu();
            });
        });
    }
    listClassrooms() {
        try {
            const classrooms = this.controller.listClassrooms();
            if (classrooms.length === 0) {
                console.log('No classrooms available.');
            }
            else {
                console.log('Classrooms:');
                classrooms.forEach((classroom) => console.log(`- ${classroom}`));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                Logger_1.logger.error(error.message);
            }
            else {
                Logger_1.logger.error('An unknown error occurred');
            }
        }
        this.showMenu();
    }
    listStudents() {
        this.rl.question('Enter classroom name: ', (classroomName) => {
            if (classroomName.trim() === '') {
                console.error('Error: Enter all fields.');
                return this.showMenu();
            }
            try {
                const students = this.controller.listStudents(classroomName);
                if (!students || students.length === 0) {
                    console.log(`No students enrolled in ${classroomName}.`);
                }
                else {
                    console.log(`Students in ${classroomName}:`);
                    students.forEach(({ id, name }) => console.log(`- ${name} (${id})`));
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    Logger_1.logger.error(error.message);
                }
                else {
                    Logger_1.logger.error('An unknown error occurred');
                }
            }
            this.showMenu();
        });
    }
    deleteClassroom() {
        this.rl.question('Enter classroom name to delete: ', (classroomName) => {
            if (!this.isValidClassroomName(classroomName)) {
                console.error('Error: Classroom name must be alphanumeric and cannot contain special characters.');
                return this.showMenu();
            }
            try {
                this.controller.deleteClassroom(classroomName);
                // Log the action
                Logger_1.logger.info(`Classroom ${classroomName} has been deleted.`);
            }
            catch (error) {
                if (error instanceof Error) {
                    Logger_1.logger.error(error.message);
                }
                else {
                    Logger_1.logger.error('An unknown error occurred');
                }
            }
            this.showMenu();
        });
    }
    removeStudent() {
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
                        Logger_1.logger.info(`Student ${studentId} has been removed from ${classroomName}.`);
                        console.log(`Student ${studentId} has been removed from ${classroomName}.`);
                    }
                    else {
                        console.log(`No student with ID ${studentId} found in ${classroomName}.`);
                    }
                }
                catch (error) {
                    if (error instanceof Error) {
                        Logger_1.logger.error(error.message);
                    }
                    else {
                        Logger_1.logger.error('An unknown error occurred');
                    }
                }
                this.showMenu();
            });
        });
    }
    submitAssignment() {
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
                        Logger_1.logger.info(`Assignment submitted by Student ${studentId} in ${classroomName}.`);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            Logger_1.logger.error(error.message);
                        }
                        else {
                            Logger_1.logger.error('An unknown error occurred');
                        }
                    }
                    this.showMenu();
                });
            });
        });
    }
    exit() {
        console.log('Exiting...');
        console.log('Thank you!!');
        this.rl.close();
    }
    isValidClassroomName(name) {
        // Alphanumeric characters and spaces only
        return /^[a-zA-Z0-9 ]+$/.test(name);
    }
    isValidStudentId(id) {
        // Positive integer only
        const numberId = parseInt(id, 10);
        return Number.isInteger(numberId) && numberId > 0;
    }
}
exports.VirtualClassroomManager = VirtualClassroomManager;
