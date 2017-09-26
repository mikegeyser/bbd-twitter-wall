export class User {
  profile_image_url: string;
  name: string;
  screen_name: string;
}

export class Media {
  media_url: string;
}

export class Entity {
  media: Media;
}

export class Tweet {
  user: User;
  entities: Entity;
  text: string;
  created_at: Date;
}