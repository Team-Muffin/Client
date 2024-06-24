import axios from 'axios';
import * as fs from 'fs';

interface FinancialStatementData {
  bsns_year: string;
  corp_code: string;
  stock_code: string;
  reprt_code: string;
  idx_cl_code: string;
  idx_cl_nm: string;
  idx_code: string;
  idx_nm: string;
  idx_val: string;
}

const fetchFinancialStatement = async (
  corpCode: string,
  bsnsYear: string,
  reprtCode: string,
  idxClCode: string,
  crtfcKey: string
): Promise<FinancialStatementData[]> => {
  const apiUrl = 'https://opendart.fss.or.kr/api/fnlttSinglIndx.json';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        crtfc_key: crtfcKey,
        corp_code: corpCode,
        bsns_year: bsnsYear,
        reprt_code: reprtCode,
        idx_cl_code: idxClCode,
      },
    });

    return response.data.list;
  } catch (error) {
    console.error('Error fetching financial statement data:', error);
    return [];
  }
};

const saveFinancialStatementData = async () => {
  const corpCode = 'your_corp_code';
  const bsnsYear = 'your_bsns_year';
  const reprtCode = 'your_reprt_code';
  const idxClCode = 'your_idx_cl_code';
  const crtfcKey = 'your_crtfc_key';

  const data = await fetchFinancialStatement(corpCode, bsnsYear, reprtCode, idxClCode, crtfcKey);

  if (data.length > 0) {
    await fs.writeFile('financial_statement_data.json', JSON.stringify(data, null, 2));
    console.log('Financial statement data saved successfully.');
  } else {
    console.log('No data to save.');
  }
};

saveFinancialStatementData();
