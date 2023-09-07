interface User{
    coverImage: string;
    image: string;
    role: string;
    emailVerified: boolean;
    banned: boolean;
    isOnline: boolean;
    posts: Post[];
    likes: Like[];
    comments: string[];
    followers: Follow[];
    following: [
      {
        _id: string;
        user: string;
        follower: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }
    ];
    notifications: Notification[];
    messages: Message[];
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface Channel {
  authRequired: boolean;
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  likes: Like[];
  comments: Comment[];
  _id: string;
  image?: string;  
	imagePublicId?: string;  
  title: string;
  channel: Channel;
  author: User;
  createdAt: string;  
  updatedAt: string; 
}

interface Like {
  _id: string; 
  user: string;
  post: string, 
  createdAt: string;
  updatedAt: string;
}

interface Follow {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
}
interface Notification {
  seen : boolean;
  _id: string;
  author: User;
  user: User | string;
  post: null | string;
  follow?: string;
  comment?: Comment;
  message?: string;
  createdAt: string;
  updatedAt: string;
}
interface Comment {
  _id: string;
  comment: string;
  author: User;
  post: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  _id: string;
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}