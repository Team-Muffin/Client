import instance from "./base";

//알림 전체 리스트 조회
export async function fetchAlertList(): Promise<{ data: Alert[] }> {
  const response = await instance.get<AlertResponse>(`/alert-service/alerts`);
  console.log(response);
  return { data: response.data.data.alerts };
}

export interface Alert {
  id: number;
  clientId: number;
  messageType: string;
  targetId: number;
  content: string;
  viewed: boolean;
  thumbnail: string;
  createdAt: string;
}

interface AlertData {
  alerts: Alert[];
}

interface AlertResponse {
  success: boolean;
  message: string;
  data: AlertData;
}

// 알림 읽기
export async function readAlert(alertId: number): Promise<{
  data: Alert;
}> {
  const response = await instance.put<AlertOneResponse>(
    `/alert-service/alerts/${alertId}/view`
  );
  return { data: response.data.data.alert };
}

interface AlertOneResponse {
  success: boolean;
  message: string;
  data: {
    alert: Alert;
  };
}

// 모든 알림 삭제
export async function deleteAlert(): Promise<AlertDeleteResponse> {
  const response = await instance.delete<AlertDeleteResponse>(
    `/alert-service/alerts/delete`
  );
  return response.data;
}

interface AlertDeleteResponse {
  success: boolean;
  message: string;
  data: null;
}

//안 본 알림 개수 확인
export async function fetchUnviewedAlertCnt(): Promise<{
  data: AlertUnviewedResponse;
}> {
  const response = await instance.get<AlertUnviewedResponse>(
    `/alert-service/alerts/unviewed`
  );
  return { data: response.data };
}

export interface AlertUnviewedResponse {
  success: boolean;
  message: string;
  data: number;
}

interface AlertViewAllResponse {
  success: boolean;
  message: string;
  data: null;
}

export async function readAllAlert(): Promise<AlertViewAllResponse> {
  console.log("a");
  const response = await instance.put("/alert-service/alerts/viewall");
  console.log("b");
  console.log("Response:", response.data);
  return response.data;
}
