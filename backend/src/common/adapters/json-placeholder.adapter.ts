import { HttpService } from '@nestjs/axios';
import { User } from '../../user/entities/user.entity';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { Album } from '../../album/entities/album.entity';
import { Photo } from '../../photo/entities/photo.entity';

@Injectable()
export class JsonPlaceholderAdapter {
  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.defaults.baseURL =
      'https://jsonplaceholder.typicode.com';
  }

  async getUsers(): Promise<User[]> {
    try {
      const { data } = await this.httpService.axiosRef.get('users');
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async getOneUser(id: number): Promise<User> {
    try {
      const { data } = await this.httpService.axiosRef.get(`users/${id}`);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async getAlbumsByUser(userId: string): Promise<Album[]> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `/users/${userId}/albums`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async getPhotosByAlbum(albumId: number): Promise<Photo[]> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `/albums/${albumId}/photos`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async createPhoto(photo: Photo): Promise<Photo> {
    try {
      const { data } = await this.httpService.axiosRef.post('/photos', photo);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async createAlbum(album: Album): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.post('/albums', album);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async getAlbum(albumId: number): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `/albums/${albumId}`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async updatePhoto(photo: Photo): Promise<Photo> {
    try {
      const { data } = await this.httpService.axiosRef.put(
        `/photos/${photo.id}`,
        photo,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async deletePhoto(photoId: number): Promise<void> {
    try {
      await this.httpService.axiosRef.delete(`/photos/${photoId}`);
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async updateAlbum(album: Album): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.put(
        `/albums/${album.id}`,
        album,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }

  async deleteAlbum(albumId: number): Promise<void> {
    try {
      await this.httpService.axiosRef.delete(`/albums/${albumId}`);
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ServiceUnavailableException();
      }
    }
  }
}
