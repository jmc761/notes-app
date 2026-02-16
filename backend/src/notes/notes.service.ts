import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  private async preloadTags(tagNames: string[]): Promise<Tag[]> {
    if (!tagNames || tagNames.length === 0) return [];

    const existingTags = await this.tagsRepository.find({
      where: { name: In(tagNames) },
    });

    const existingNames = existingTags.map((t) => t.name);
    const newNames = tagNames.filter((name) => !existingNames.includes(name));

    const newTags = this.tagsRepository.create(
      newNames.map((name) => ({ name })),
    );
    await this.tagsRepository.save(newTags);

    return [...existingTags, ...newTags];
  }

  async create(createNoteDto: CreateNoteDto) {
    const tags = await this.preloadTags(createNoteDto.tags || []);
    const note = this.notesRepository.create({
      ...createNoteDto,
      tags,
    });
    return this.notesRepository.save(note);
  }

  findAll(archived: boolean = false) {
    return this.notesRepository.find({
      where: { isArchived: archived },
      order: { createdAt: 'DESC' },
      relations: ['tags'],
    });
  }

  async findOne(id: number) {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);

    const { tags: tagNames, ...rest } = updateNoteDto;

    if (tagNames) {
      const tags = await this.preloadTags(tagNames);
      note.tags = tags;
    }

    this.notesRepository.merge(note, rest);
    return this.notesRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    return this.notesRepository.remove(note);
  }

  async setArchived(id: number, isArchived: boolean) {
    return this.update(id, { isArchived });
  }
}
