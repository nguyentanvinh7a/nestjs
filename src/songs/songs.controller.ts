import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';

@Controller({ path: 'songs' })
export class SongsController {
  constructor(private readonly songsService: SongsService) {
    console.log("this.songsService", this.songsService);
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    try {
      return this.songsService.create(createSongDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Could not create song',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error.message,
        },
      );
    }
  }

  @Get()
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSongDto: UpdateSongDto): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}
