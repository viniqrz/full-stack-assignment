import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { JsonPlaceholderAdapter } from '../common/adapters/json-placeholder.adapter';
import { PhotoService } from '../photo/photo.service';

describe('AlbumService', () => {
  let service: AlbumService;
  let photoService: PhotoService;
  let jsonPlaceholderAdapter: JsonPlaceholderAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: JsonPlaceholderAdapter,
          useValue: {
            createAlbum: jest.fn(),
            getAlbumsByUser: jest.fn(),
            getAlbum: jest.fn(),
            updateAlbum: jest.fn(),
            deleteAlbum: jest.fn(),
          },
        },
        {
          provide: PhotoService,
          useValue: {
            findAllByAlbumId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    jsonPlaceholderAdapter = module.get<JsonPlaceholderAdapter>(
      JsonPlaceholderAdapter,
    );
    photoService = module.get<PhotoService>(PhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jsonPlaceholderAdapter).toBeDefined();
    expect(photoService).toBeDefined();
  });

  it('should create an album', async () => {
    const albumDto = {
      title: 'title',
      userId: 1,
    };
    const album = {
      id: 1,
      title: 'title',
      userId: 1,
    };
    jest.spyOn(jsonPlaceholderAdapter, 'createAlbum').mockResolvedValue(album);

    const result = await service.create(albumDto);
    expect(result).toEqual(album);
  });

  it('should find all albums by user id', async () => {
    const albums = [
      {
        id: 1,
        title: 'title',
        userId: 1,
      },
    ];
    jest
      .spyOn(jsonPlaceholderAdapter, 'getAlbumsByUser')
      .mockResolvedValue(albums);

    const result = await service.findAllByUserId('1');
    expect(result).toEqual(albums);
  });

  it('should find album photos', async () => {
    const photos = [
      {
        id: 1,
        title: 'title',
        albumId: 1,
      },
    ];
    jest
      .spyOn(photoService, 'findAllByAlbumId')
      .mockResolvedValue(photos as any);

    const result = await service.findAlbumPhotos('1');
    expect(result).toEqual(photos);
  });
});
