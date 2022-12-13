import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export class Profile {
  id?: string;
  name: string;
  image: string;
  user?: User;
  product?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}
