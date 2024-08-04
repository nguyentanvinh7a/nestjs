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

@Controller({path: 'songs', scope: Scope.TRANSIENT})
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(): string[] {
    try {
      return this.songsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Could not get songs',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error.message,
        },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    return `This action returns a #${id} song`;
  }

  @Put(':id')
  update(): string {
    return 'This action updates a song';
  }

  @Delete(':id')
  remove(): string {
    return 'This action removes a song';
  }
}
