import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import studentStore from '../server/models/studentStore.js';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../server/controllers/studentController.js';

const seed = structuredClone(studentStore);
const fields = { name: ' Taylor ', gender: 'Other', section: 'BSIT 4A', hobby: 'Reading' };
function response() {
  return {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = structuredClone(data); return this; },
  };
}
beforeEach(() => {
  studentStore.students = structuredClone(seed.students);
  studentStore.nextId = seed.nextId;
});

test('CRUD keeps IDs unique, trims fields and ignores client IDs', () => {
  const created = response();
  createStudent({ body: { ...fields, id: 999, extra: true } }, created);
  assert.equal(created.statusCode, 201);
  assert.deepEqual(created.body, { id: 3, ...fields, name: 'Taylor' });
  const updated = response();
  updateStudent({ params: { id: '3' }, body: { ...fields, name: 'Updated', id: 999 } }, updated);
  assert.equal(updated.body.id, 3);
  assert.equal(updated.body.name, 'Updated');
  const deleted = response();
  deleteStudent({ params: { id: '3' } }, deleted);
  assert.equal(deleted.statusCode, 200);
  const next = response();
  createStudent({ body: fields }, next);
  assert.equal(next.body.id, 4);
  const list = response();
  getStudents({}, list);
  assert.deepEqual(list.body.map(student => student.id), [1, 2, 4]);
});

test('invalid bodies and IDs fail without mutating records', () => {
  for (const body of [null, [], {}, { ...fields, name: ' ' }, { ...fields, hobby: 42 }]) {
    const res = response();
    createStudent({ body }, res);
    assert.equal(res.statusCode, 400);
  }
  for (const id of ['0', '-1', '1.5', '1x', '1e0', '9007199254740992']) {
    for (const handler of [updateStudent, deleteStudent]) {
      const res = response();
      handler({ params: { id }, body: fields }, res);
      assert.equal(res.statusCode, 400);
    }
  }
  const invalidUpdate = response();
  updateStudent({ params: { id: '1' }, body: {} }, invalidUpdate);
  assert.equal(invalidUpdate.statusCode, 400);
  for (const handler of [updateStudent, deleteStudent]) {
    const res = response();
    handler({ params: { id: '99' }, body: fields }, res);
    assert.equal(res.statusCode, 404);
  }
  assert.deepEqual(studentStore, seed);
});

test('removing all students returns an empty array', () => {
  for (const id of ['1', '2']) deleteStudent({ params: { id } }, response());
  const res = response();
  getStudents({}, res);
  assert.deepEqual(res.body, []);
});

