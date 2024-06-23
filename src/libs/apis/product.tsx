import instance from "./base";

//상품 리스트 조회
export async function fetchProductList(options: {
  pageNo?: number;
  size?: number;
  category?: string;
  sort?: string;
}): Promise<{ data: ProductListResponse }> {
  const { pageNo = 0, size = 10, category = "카드", sort = "최신순" } = options;
  const response = await instance.get<ProductListResponse>(
    `/product-service/products?pageNo=${pageNo}&size=${size}&category=${category}&sort=${sort}`
  );
  return { data: response.data };
}

export interface ProductList {
  id: number;
  name: string;
  corpName: string;
  corpImage: string;
  cardImage: string;
  tags: string[];
  boardCount: number;
  createdTime: string;
}

interface ProductListData {
  products: ProductList[];
}

interface ProductListResponse {
  success: boolean;
  message: string;
  data: ProductListData;
}

// 상품 기본 정보 조회
export async function fetchProductBasic(productId: string): Promise<{
  data: ProductBasic;
}> {
  const response = await instance.get<ProductBasicResponse>(
    `/product-service/products/${productId}`
  );
  return { data: response.data.data["product basic"] };
}

export interface ProductBasic {
  id: number;
  name: string;
  corpName: string;
  corpImage: string;
  cardImage: string;
  tags: string[];
  boardCount: number;
  createdTime: string;
}

interface ProductBasicResponse {
  success: boolean;
  message: string;
  data: {
    "product basic": ProductBasic;
  };
}

// 상품 요약 정보 조회

export async function fetchCardProductSummary(productId: string): Promise<{
  data: CardProductSummary;
}> {
  const response = await instance.get<CardProductSummaryResponse>(
    `/product-service/products/${productId}/summary?category=카드&sort=최신순`
  );
  return { data: response.data.data["card product summary"] };
}

export interface CardProductSummary {
  productId: number;
  notice: string;
  annualFee: string;
  rewards: null | string;
  baseRecord: string;
  mainBenefit: string;
  subBenefit: string;
}

interface CardProductSummaryResponse {
  success: boolean;
  message: string;
  data: {
    "card product summary": CardProductSummary;
  };
}

export async function fetchSavingProductSummary(productId: string): Promise<{
  data: SavingProductSummary;
}> {
  const response = await instance.get<SavingProductSummaryResponse>(
    `/product-service/products/${productId}/summary?category=예적금&sort=최신순`
  );
  return { data: response.data.data["saving product summary"] };
}

export interface SavingProductSummary {
  productId: number;
  interestRate: number;
  primeInterestRate: number;
  savingTerm: string;
  specialOfferSummary: string;
  specialOfferPeriod: string;
}

interface SavingProductSummaryResponse {
  success: boolean;
  message: string;
  data: {
    "saving product summary": SavingProductSummary;
  };
}

export async function fetchFundProductSummary(productId: string): Promise<{
  data: FundProductSummary;
}> {
  const response = await instance.get<FundProductSummaryResponse>(
    `/product-service/products/${productId}/summary?category=펀드&sort=최신순`
  );
  return { data: response.data.data["fund product summary"] };
}

export interface FundProductSummary {
  productId: number;
  fundCode: string;
  stdPrice: number;
  diffPrice: number;
  drvNav: number;
  rt3m: number;
  ter: number;
}

interface FundProductSummaryResponse {
  success: boolean;
  message: string;
  data: {
    "fund product summary": FundProductSummary;
  };
}

export async function fetchLoanProductSummary(productId: string): Promise<{
  data: LoanProductSummary;
}> {
  const response = await instance.get<LoanProductSummaryResponse>(
    `/product-service/products/${productId}/summary?category=대출&sort=최신순`
  );
  return { data: response.data.data["loan product summary"] };
}

export interface LoanProductSummary {
  productId: number;
  minInterestRate: number;
  maxInterestRate: number;
  maxLoanAmount: string;
}

interface LoanProductSummaryResponse {
  success: boolean;
  message: string;
  data: {
    "loan product summary": LoanProductSummary;
  };
}

// 상품 상세 정보 조회

export async function fetchCardProductDetail(productId: string): Promise<{
  data: CardProductDetail;
}> {
  const response = await instance.get<CardProductDetailResponse>(
    `/product-service/products/${productId}/details?category=카드&sort=최신순`
  );
  return { data: response.data.data["card product detail"] };
}

interface CardProductDetailResponse {
  success: boolean;
  message: string;
  data: {
    "card product detail": CardProductDetail;
  };
}

export interface CardProductDetail {
  productId: number;
  description: string;
  terms: string[];
}

export async function fetchLoanProductDetail(productId: string): Promise<{
  data: LoanProductDetail;
}> {
  const response = await instance.get<LoanProductDetailResponse>(
    `/product-service/products/${productId}/details?category=대출&sort=최신순`
  );
  return { data: response.data.data["loan product detail"] };
}

interface LoanProductDetailResponse {
  success: boolean;
  message: string;
  data: {
    "loan product detail": LoanProductDetail;
  };
}

export interface LoanProductDetail {
  productId: number;
  description: string;
}

export interface LoanFeature {
  title: string;
  content: string;
  order: number;
}

export async function fetchSavingProductDetail(productId: string): Promise<{
  data: SavingProductDetail;
}> {
  const response = await instance.get<SavingProductDetailResponse>(
    `/product-service/products/${productId}/details?category=예적금&sort=최신순`
  );
  return { data: response.data.data["saving product detail"] };
}

interface SavingProductDetailResponse {
  success: boolean;
  message: string;
  data: {
    "saving product detail": SavingProductDetail;
  };
}

export interface SavingProductDetail {
  productId: number;
  joinPeriod: string;
  joinAmount: string;
  joinTarget: string;
  specialConditions: string;
  channel: string;
  interestPaymentCycle: string;
  note: string;
  depositorProtection: string;
}

export async function fetchFundProductDetail(productId: string): Promise<{
  data: FundProductDetail;
}> {
  const response = await instance.get<FundProductDetailResponse>(
    `/product-service/products/${productId}/details?category=펀드&sort=최신순`
  );
  return { data: response.data.data["fund product detail"] };
}

interface FundProductDetailResponse {
  success: boolean;
  message: string;
  data: {
    "fund product detail": FundProductDetail;
  };
}

export interface FundProductDetail {
  productId: number;
  rt1m: number;
  rt3m: number;
  rt6m: number;
  rtYtd: number;
  rt1y: number;
  rt3y: number;
  rt5y: number;
  riskGrade: number;
  riskGradeText: string;
  feeGb: string;
  category1: string;
  category2: string;
  infoObject: string;
  infoStrategy: string;
  region: string;
  amtGb: string;
  exceBm: string;
  riskGb: string;
  rtGb: string;
}
