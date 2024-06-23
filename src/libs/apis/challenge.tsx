import instance from "./base";

interface OurChallengeResp {
    success:boolean;
    message: string;
    data:{
        id: number;
        name: string;
        description: string;
        logoUrl : string,
        endAt: string,
        challengeUrl: string,
        corpName: string,
        term: number,
        reward: number,
        participation: number
    };
}

export async function fetchOurChallenges(): Promise<OurChallengeResp>{
    try{
        const response = await instance.get(`challenge-service/challenges`);
        console.log("challenge Response data:", response.data);
        return response.data;
    } catch (error) {
        console.error("챌린지 조회 오류 발생",error);
        throw error;
    }
}