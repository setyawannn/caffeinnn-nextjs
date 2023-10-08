export interface IUser {
  id: number;
  uuid: string;
  name: string;
  photo_profile: string;
  username: string;
  role: "MANAGER" | "ADMIN" | "KASIR";
}
