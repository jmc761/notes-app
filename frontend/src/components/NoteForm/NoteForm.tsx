import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNote, updateNote, getNote } from '../../api/api';
import './NoteForm.css';

export const NoteForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            getNote(Number(id)).then(note => {
                setTitle(note.title);
                setContent(note.content);
                setTags(note.tags.map(t => t.name).join(', '));
            }).catch(err => console.error(err));
        }
    }, [id]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const tagList = tags.split(',').map(t => t.trim()).filter(t => t !== '');

        if (id) {
            await updateNote(Number(id), { title, content, tags: tagList });
        } else {
            await createNote(title, content, tagList);
        }
        navigate('/');
    };

    return (
        <div className="note-form">
            <h2>{id ? 'Edit Note' : 'Create Note'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="form-control"
                        rows={5}
                    />
                </div>
                <div className="form-group">
                    <label>Tags (comma separated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="form-control"
                        placeholder="work, ideas, todo"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="button primary">Save</button>
                    <button type="button" onClick={() => navigate('/')} className="button secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
};
