import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const note = this.notesRepository.create({
      ...createNoteDto,
    });
    return this.notesRepository.save(note);
  }

  findAll(archived: boolean = false) {
    return this.notesRepository.find({
      where: { isArchived: archived },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const note = await this.notesRepository.findOne({
      where: { id },
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);

    const { ...rest } = updateNoteDto;

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
