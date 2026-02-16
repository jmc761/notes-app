export interface Tag {
    id: number;
    name: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
}

export interface NoteInput {
    title: string;
    content: string;
    tags?: string[];
}
