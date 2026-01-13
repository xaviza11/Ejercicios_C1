
import { students as studentsData } from '../assets/data/students';
import type { Student } from '../models/student.interface'

async function loadStudents(): Promise<Student[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(studentsData), 100);
  });
}

export { loadStudents };