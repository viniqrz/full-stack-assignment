import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JsonPlaceholderAdapter } from '../common/adapters/json-placeholder.adapter';
import { AlbumService } from '../album/album.service';

describe('UserService', () => {
  let service: UserService;
  let jsonPlaceholderAdapter: JsonPlaceholderAdapter;
  let albumService: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: JsonPlaceholderAdapter,
          useValue: {
            createAlbum: jest.fn(),
            getAlbumsByUser: jest.fn(),
            getAlbum: jest.fn(),
            updateAlbum: jest.fn(),
            deleteAlbum: jest.fn(),
            getUsers: jest.fn(),
          },
        },
        {
          provide: AlbumService,
          useValue: {
            findAllByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jsonPlaceholderAdapter = module.get<JsonPlaceholderAdapter>(
      JsonPlaceholderAdapter,
    );
    albumService = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jsonPlaceholderAdapter).toBeDefined();
    expect(albumService).toBeDefined();
  });

  it('should find all users', async () => {
    const users = [
      {
        id: 1,
        name: 'name',
        email: 'email',
      },
    ];
    jest
      .spyOn(jsonPlaceholderAdapter, 'getUsers')
      .mockResolvedValue(users as any);

    const result = await service.findAll();
    expect(result).toEqual(users);
  });
});
