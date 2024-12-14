import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static fromDto(dto: UserDto): User {
    const user = new User();
    user.id = dto.id;
    user.name = dto.name;
    user.username = dto.username;
    user.email = dto.email;
    return user;
  }

  static toDto(entity: User): UserDto {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.username = entity.username;
    dto.email = entity.email;
    return dto;
  }

  static toDtoList(entities: User[]): UserDto[] {
    return entities.map((entity) => UserMapper.toDto(entity));
  }
}
