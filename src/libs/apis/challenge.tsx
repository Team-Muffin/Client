import instance from "./base";
import { ChallengeResponse, GlobalResponse } from "./responses/response";

// Define the Challenge type
export interface Challenge {
  id: number;
  challengeType: number;
  name: string;
  description: string;
  logoUrl: string;
  endAt: string;
  challengeUrl: string;
  corpName: string;
  term: number;
  reward: number;
  participation: number;
}

// Define the Badge type
export interface Badge {
  imgUrl: string;
  badgeName: string;
  challengeName: string;
}

// Define the response type
interface OurChallengeResp {
  success: boolean;
  message: string;
  data: Challenge[]; // This should be an array of challenges
}

interface SuccessBadgesResp {
  success: boolean;
  message: string;
  data: Badge[];
}

// Fetch function
export async function fetchOurChallenges(): Promise<Challenge[]> {
  try {
    const response = await instance.get<OurChallengeResp>(
      `challenge-service/challenges`
    );
    console.log("challenge Response data:", response.data);
    return response.data.data; // Return the data array directly
  } catch (error) {
    console.error("챌린지 조회 오류 발생", error);
    throw error;
  }
}

//기업 챌린지 조회

export async function fetchCorpChallenges(
  sortId: number
): Promise<Challenge[]> {
  try {
    const response = await instance.get<OurChallengeResp>(
      `challenge-service/challenges/corp`,
      {
        params: { sortId },
      }
    );
    console.log("challenge Response data:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("챌린지 조회 오류 발생", error);
    throw error;
  }
}

export async function fetchMyChallenge(isDone: boolean, userId: number) {
  try {
    const response = await instance.get("challenge-service/my-challenges", {
      params: {
        isDone: isDone ? 0 : 1,
        userId: userId,
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchChallengeById(
  id: string
): Promise<ChallengeResponse> {
  try {
    const response = await instance.get<GlobalResponse<ChallengeResponse>>(
      `challenge-service/challenges/${id}`
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function joinEmoChallenge(
  id: number,
  toAcc: string,
  fromAcc: string
): Promise<number> {
  try {
    const res = await instance.post<GlobalResponse<number>>(
      "challenge-service/my-emoChallenges",
      {
        challengeId: id,
        inACNT: toAcc,
        outACNT: fromAcc,
      }
    );

    return res.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getMyChallenges(isDone: number, userId: number) {
  try {
    const res = await instance.get(`challenge-service/my-challenges`, {
      params: {
        isDone: isDone,
        userId: userId,
      },
    });

    return res.data.data;
  } catch (err) {
    throw err;
  }
}

// 성공한 뱃지 조회
export async function fetchSuccessBadges(userId: string): Promise<Badge[]> {
  try {
    const response = await instance.get<SuccessBadgesResp>(
      `challenge-service/my-challenges/badge`,
      {
        params: { userId },
      }
    );
    console.log("Success Badge Response data: ", response.data);
    return response.data.data;
  } catch (error) {
    console.log("성공한 뱃지 조회 오류: ", error);
    throw error;
  }
}

export async function getEmoChallengeLog() {
  try {
    const res = await instance.get("challenge-service/my-emoChallenges/log");

    return res.data.data;
  } catch (err) {
    throw err;
  }
}

export async function postEmoChallenge(emojiId: number): Promise<void> {
  try {
    const response = await instance.post(
      "challenge-service/my-emoChallenges/emoji",
      {
        emojiId: emojiId,
      }
    );
  } catch (err) {
    throw err;
  }
}
