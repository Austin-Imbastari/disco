// types & interfaces
type Comments = {
    userId: number;
    postId: string;
    text: string;
};

type ExtendedComments = Comments & {
    id: number;
    author: {
        username: string;
    };
};

export type { Comments, ExtendedComments };
