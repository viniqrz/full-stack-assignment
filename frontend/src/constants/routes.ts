export const ROUTES = {
  ALBUM: (
    userId: string | number = ":userId",
    albumId: string | number = ":albumId"
  ) => `/users/${userId}/albums/${albumId}`,
  HOME: () => "/",
  PROFILE: (userId: string | number = ":userId") => `/users/${userId}`,
};
