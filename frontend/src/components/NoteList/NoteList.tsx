import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotes, deleteNote, archiveNote, unarchiveNote } from '../../api';
import { type Note } from '../../types';
import './NoteList.css';

interface NoteListProps {
    archived: boolean;
}

export const NoteList: React.FC<NoteListProps> = ({ archived }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const fetchNotes = async () => {
        const data = await getNotes(archived);
        setNotes(data);
    };

    useEffect(() => {
        fetchNotes();
        setSelectedTag(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [archived]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure?')) {
            await deleteNote(id);
            fetchNotes();
        }
    };

    const handleArchiveObj = async (note: Note) => {
        if (note.isArchived) {
            await unarchiveNote(note.id);
        } else {
            await archiveNote(note.id);
        }
        fetchNotes();
    };

    const allTags = Array.from(new Set(notes.flatMap(n => n.tags ? n.tags.map(t => t.name) : []))).sort();

    const filteredNotes = selectedTag
        ? notes.filter(n => n.tags && n.tags.some(t => t.name === selectedTag))
        : notes;

    return (
        <div className="note-list">
            <div className="list-header">
                <h2>{archived ? 'Archived Notes' : 'My Notes'}</h2>
                {allTags.length > 0 && (
                    <div className="tag-filter">
                        <span>Filter by tag: </span>
                        <select onChange={(e) => setSelectedTag(e.target.value || null)} value={selectedTag || ''}>
                            <option value="">All</option>
                            {allTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="grid">
                {filteredNotes.length === 0 && <p>No notes found.</p>}
                {filteredNotes.map((note) => (
                    <div key={note.id} className="note-card">
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        {note.tags && note.tags.length > 0 && (
                            <div className="tags">
                                {note.tags.map(tag => (
                                    <span key={tag.id} className="tag-pill">{tag.name}</span>
                                ))}
                            </div>
                        )}
                        <div className="card-actions">
                            <Link to={`/edit/${note.id}`}>Edit</Link>
                            <button onClick={() => handleArchiveObj(note)}>
                                {note.isArchived ? 'Unarchive' : 'Archive'}
                            </button>
                            <button onClick={() => handleDelete(note.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
