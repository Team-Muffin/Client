import axios from "axios"; 

const fetchFinancialData = async (corpCode: string) => {
    const apiKey = "234ad16bf34a0c8355474a9b21bb38910624ac92"; // Replace with your Dart API key
    try {
      const response = await axios.get(
        `https://opendart.fss.or.kr/api/fnlttSinglIndx.json?crtfc_key=${apiKey}&corp_code=${corpCode}&bsns_year=2024&reprt_code=11011&idx_cl_code=M210000`
      );
      console.log("Financial data response:", response.data);
      // Process the response data here and update your state or do other operations
    } catch (error) {
      console.error("Error fetching financial data:", error);
    }
  };
  