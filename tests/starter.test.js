import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import studentStore from '../server/models/studentStore.js';
import * as controllers from '../server/controllers/studentController.js';

test('seed records have unique IDs and the four activity fields', () => {
  assert.equal(studentStore.students.length, 2);
  assert.equal(new Set(studentStore.students.map((student) => student.id)).size, 2);
  for (const student of studentStore.students) {
    for (const field of ['name', 'gender', 'section', 'hobby']) {
      assert.equal(typeof student[field], 'string');
      assert.ok(student[field].trim());
    }
    assert.ok(student.id < studentStore.nextId);
  }
});

test('starter exposes the controller and React function names described in the activity', async () => {
  for (const name of ['getStudents', 'createStudent', 'updateStudent', 'deleteStudent']) {
    assert.equal(typeof controllers[name], 'function');
  }
  const source = await readFile(new URL('../client/src/App.jsx', import.meta.url), 'utf8');
  for (const name of ['fetchStudents', 'handleInputChangePost', 'handleAddStudent', 'handleInputChangePut', 'handleUpdateStudent', 'handleDeleteChange', 'handleDeleteSubmit']) {
    assert.match(source, new RegExp(`function ${name}\\(`));
  }
});
