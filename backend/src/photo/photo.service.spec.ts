import { Test, TestingModule } from '@nestjs/testing';
import { PhotoService } from './photo.service';
import { JsonPlaceholderAdapter } from '../common/adapters/json-placeholder.adapter';

describe('PhotoService', () => {
  let service: PhotoService;
  let jsonPlaceholderAdapter: JsonPlaceholderAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotoService,
        {
          provide: JsonPlaceholderAdapter,
          useValue: {
            createAlbum: jest.fn(),
            getAlbumsByUser: jest.fn(),
            getAlbum: jest.fn(),
            updateAlbum: jest.fn(),
            deleteAlbum: jest.fn(),
            getPhotosByAlbum: jest.fn(),
            createPhoto: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PhotoService>(PhotoService);
    jsonPlaceholderAdapter = module.get<JsonPlaceholderAdapter>(
      JsonPlaceholderAdapter,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jsonPlaceholderAdapter).toBeDefined();
  });

  it('should create a photo', async () => {
    const photoDto = {
      title: 'title',
      albumId: 1,
      url: 'url',
      thumbnailUrl: 'thumbnailUrl',
    };
    const photo = {
      id: 1,
      title: 'title',
      albumId: 1,
      url: 'url',
      thumbnailUrl: 'thumbnailUrl',
    };
    jest.spyOn(jsonPlaceholderAdapter, 'createPhoto').mockResolvedValue(photo);

    const result = await service.create(photoDto);
    expect(result).toEqual(photo);
  });

  it('should find all photos by album id', async () => {
    const photos = [
      {
        id: 1,
        title: 'title',
        albumId: 1,
        url: 'url',
        thumbnailUrl: 'thumbnailUrl',
      },
    ];
    jest
      .spyOn(jsonPlaceholderAdapter, 'getPhotosByAlbum')
      .mockResolvedValue(photos as any);

    const result = await service.findAllByAlbumId(1);
    expect(result).toEqual(photos);
  });
});
