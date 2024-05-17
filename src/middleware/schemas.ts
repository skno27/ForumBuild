import z from "zod";
import pr from "@prisma/client";
const { NotificationSettings, Roles } = pr;
import { title } from "process";

const userLazy: z.ZodLazy<any> = z.lazy(() => User);
const postLazy: z.ZodLazy<any> = z.lazy(() => Post);
const replyLazy: z.ZodLazy<any> = z.lazy(() => Reply);

// User Schema
export const User = z.object({
  id: z.number().int().nonnegative().optional(),
  email: z.string().email(),
  name: z.string().min(2, "at least 2 chars").max(60, "at most 60 chars"),
  username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
  password: z.string(),
  verified: z.boolean().optional(),
  roles: z.nativeEnum(Roles).array().optional(),
  notificationSettings: z.nativeEnum(NotificationSettings).array().optional(),
  posts: z.array(postLazy).optional(),
  postsLike: z.array(postLazy).optional(),
  postReplies: z.array(postLazy).optional(),
});

function containsNumber(value: string): boolean {
  return /\d/.test(value);
}

function containsUppercase(value: string): boolean {
  return /[A-Z]/.test(value);
}

function containsSpecial(value: string): boolean {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
}

export const Account = User.pick({
  name: true,
  username: true,
  email: true,
})
  .extend({
    password: z
      .string()
      .min(8, "at least 8 chars")
      .refine(containsNumber, "Must contain a number")
      .refine(containsUppercase, "Must contain a uppercase letter")
      .refine(containsSpecial, "Must contain a special character"),
  })
  .strict();

export const Login = User.pick({
  password: true,
})
  .extend({
    username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
    // .or(z.string().min(5, "at least 5 chars").max(50, "at most 50 chars")),
  })
  .strict();

export const UserUpdate = User.partial()
  .omit({
    roles: true,
  })
  .strict();

// Post Schema
export const Post = z.object({
  id: z.number().int().nonnegative().optional(),
  title: z.string().min(10),
  body: z.string().min(10),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.number().int().nonnegative().optional(),
  published: z.boolean().default(true),
  tags: z.string().array().optional(),
  likes: z.array(userLazy).optional(),
  author: userLazy.optional(),
  replies: z.array(replyLazy).optional(),
});

export const PostUpdate = Post.pick({
  body: true,
  title: true,
  tags: true,
  published: true,
}).strict();

// test shows that strict() doesnt force these all to be required. theyre kept as they are in the parent, but no new properties can be added.

export const Reply = z.object({
  id: z.number().int().nonnegative().optional(),
  userId: z.number().int().nonnegative().optional(),
  postId: z.number().int().nonnegative(),
  body: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  author: userLazy.optional(),
  post: postLazy.optional(),
});
