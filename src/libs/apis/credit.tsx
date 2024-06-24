import instance from "./base";

// Interface for the credit response
interface CreditResp {
  success: boolean;
  message: string;
  data: number;
}

// Function to fetch the credit balance
export async function fetchCredit(): Promise<CreditResp> {
  try {
    const response = await instance.get('credit-service/credit');
    console.log("Credit Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("크레딧 조회 오류 발생", error);
    throw error;
  }
}
