import axios from "axios"; 

const fetchFinancialData = async (dartCode: string) => {
  try {
    const response = await axios.get(`http://dart.tofin.site:8000/${dartCode}`);
    console.log("Financial data response:", response.data);
    return(response.data);
    // Process the response data here and update your state or do other operations
  } catch (error) {
    console.error("Error fetching financial data:", error);
  }
};

export default fetchFinancialData;
