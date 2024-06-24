import instance from "./base";

// Define the Challenge type
export interface Challenge {
  id: number;
  challengeType : number;
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

// Define the response type
interface OurChallengeResp {
  success: boolean;
  message: string;
  data: Challenge[]; // This should be an array of challenges
}

// Fetch function
export async function fetchOurChallenges(): Promise<Challenge[]> {
  try {
    const response = await instance.get<OurChallengeResp>(`challenge-service/challenges`);
    console.log("challenge Response data:", response.data);
    return response.data.data; // Return the data array directly
  } catch (error) {
    console.error("챌린지 조회 오류 발생", error);
    throw error;
  }
}

//기업 챌린지 조회

export async function fetchCorpChallenges(sortId: number): Promise<Challenge[]> {
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
