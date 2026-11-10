import studentStore from '../models/studentStore.js';

// Task 1: return studentStore.students as JSON (200).
export function getStudents(req, res) {}

// Task 2: validate req.body, assign studentStore.nextId, append, return the record (201).
export function createStudent(req, res) {}

// Task 3: find the numeric ID, validate all fields, replace the record, return it (200).
export function updateStudent(req, res) {}

// Task 4: find the numeric ID, remove the record, return a success message (200).
export function deleteStudent(req, res) {}
