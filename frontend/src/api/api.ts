import axios from 'axios';
import { type Note, type NoteInput } from '../types';

const BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://notes-app-1k9m.onrender.com';

const API_URL = `${BASE_URL}/api/notes`;

export const getNotes = async (archived = false): Promise<Note[]> => {
    const response = await axios.get(API_URL, { params: { archived } });
    return response.data;
};

export const getNote = async (id: number): Promise<Note> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createNote = async (title: string, content: string, tags: string[] = []): Promise<Note> => {
    const response = await axios.post(API_URL, { title, content, tags });
    return response.data;
};

export const updateNote = async (id: number, data: Partial<NoteInput>): Promise<Note> => {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const archiveNote = async (id: number): Promise<Note> => {
    const response = await axios.patch(`${API_URL}/${id}/archive`);
    return response.data;
};

export const unarchiveNote = async (id: number): Promise<Note> => {
    const response = await axios.patch(`${API_URL}/${id}/unarchive`);
    return response.data;
};
