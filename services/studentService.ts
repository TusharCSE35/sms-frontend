import api from '@/lib/api';
import type { Student } from '@/types/student';
import type { StudentInput } from '@/lib/validations';

export const studentService = {
  async getAll(): Promise<Student[]> {
    const res = await api.get('/students');
    return res.data;
  },

  async getOne(id: string | number): Promise<Student> {
    const res = await api.get(`/students/${id}`);
    return res.data;
  },

  async create(data: StudentInput): Promise<Student> {
    const res = await api.post('/students', data);
    return res.data;
  },

  async update(id: string | number, data: StudentInput): Promise<Student> {
    const res = await api.put(`/students/${id}`, data);
    return res.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/students/${id}`);
  },
};