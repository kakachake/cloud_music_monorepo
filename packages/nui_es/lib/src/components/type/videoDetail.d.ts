export interface Creator {
    authStatus: number;
    followed: boolean;
    accountStatus: number;
    userId: number;
    userType: number;
    nickname: string;
    avatarUrl: string;
    expertTags?: any;
    experts?: any;
    avatarDetail?: any;
}
export interface Resolution {
    size: number;
    resolution: number;
}
export interface VideoGroup {
    id: number;
    name: string;
    alg?: any;
}
export interface VideoDetailType {
    vid: string;
    creator: Creator;
    coverUrl: string;
    title: string;
    description: string;
    durationms: number;
    threadId: string;
    playTime: number;
    praisedCount: number;
    commentCount: number;
    shareCount: number;
    subscribeCount: number;
    publishTime: number;
    avatarUrl: string;
    width: number;
    height: number;
    resolutions: Resolution[];
    videoGroup: VideoGroup[];
    hasRelatedGameAd: boolean;
    advertisement: boolean;
    authType: number;
    markTypes: any[];
    videoUserLiveInfo?: any;
}
