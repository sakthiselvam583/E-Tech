import http from "./httpMiddleWare";
import { ACCESS_POINT , REDIS_ACCESS_POINT } from "../config";

const getFreedom = async (
  select,
  tableName,
  condition,
  groupby = "id",
  orderby = "id"
) => {
  let value = {};
  value.select = select;
  value.tableName = tableName;
  value.condition = condition;
  value.groupby = groupby;
  value.orderby = orderby;
  const result = await http.put(  
    ACCESS_POINT + `/cmsContent/getFullFreedom/getFreedom`,
    value
  );
  return result;
};

const getOtp = async (mobile,from) => {
  const result = await http.put(ACCESS_POINT + `/user/commonLogin/${mobile}/${from}`);
  return result; 
};

const loginOTPCheckPost = async (actualNum,mobileNumber) => {
  const result = await http.post(ACCESS_POINT + `/user/mobileOTPCheck/${actualNum}`,{num:mobileNumber});
  return result; 
};

/*const getThemeById = async themeid => {
  const result = await http.get(ACCESS_POINT + `/cmsContent/${themeid}`);
  return result;
};*/

const testRedis = async themeid => {
  const result = await http.get(REDIS_ACCESS_POINT + `/swtn/test`);
  return result;
};

const createcaptcha = async () => {
  const result = await http.get(
    ACCESS_POINT +
      `/cmsContent/createcaptcha/captcha`
  );
  return result;
};
const getThemebyid = async themeid => {
  const result = await http.get(REDIS_ACCESS_POINT + `/swtn/getPage/${themeid}`);
  return result;
}; 

const getHeader = async themeid => {
  const result = await http.get(REDIS_ACCESS_POINT + `/swtn/headNav/${themeid}`);
  return result;
};

const search = async themeid => {
  const result = await http.get(REDIS_ACCESS_POINT + `/swtn/search/${themeid}`); 
  return result;
};

const pageViewCount = async d => { 
  const result = await http.post(ACCESS_POINT + `/cmsContent/getContent/pageViewCount`,
  d,
  { headers: { "Content-Type": "multipart/form-data" } });
  return result;
};

const samplesitepage = async (customerid,id) => {
  const result = await http.get(REDIS_ACCESS_POINT + `/swtn/samplesitepage/${customerid}/${id}`); 
  return result;
};

const getVideoContentById = async themeid => {
  const result = await http.get(
    ACCESS_POINT + `/cmsContent/videoContent/${themeid}`
  );
  return result;
};
const updateQuizAnswer = async (quizAnswerJson, tableName) => {
  const result = await http.post(
    ACCESS_POINT + `/cmsContent/quizAnswer/${tableName}`,
    quizAnswerJson
  );
  return result;
};
const checkQuizAttended = async (userId, quizId) => {
  const result = await http.get(
    ACCESS_POINT + `/cmsContent/quizAnswer/${userId}/${quizId}`
  );
  return result;
};
const createMasterValue = async (tableName, masterValue) => {
  const result = await http.post(ACCESS_POINT + `/superAdmin/dynamic/${tableName}`, masterValue);
  return result;
};
const updateMaster = async (tableName, id, categoryArray, column = "id") => {
  const result = await http.put(
    ACCESS_POINT + `/cmsContent/master/${tableName}/${column}`,
    { id: id, categoryArray }
  );
  return result;
};
const addMaster = async (tableName, categoryArray) => {
  const result = await http.post(
    ACCESS_POINT + `/cmsContent/master/${tableName}`,
    categoryArray
  );
  return result;
};

const getTwoConditionedValue = async (
  tableName,
  columName,
  value,
  columName1,
  value1,
  val = "*"
) => {
  const result = await http.put(
    ACCESS_POINT + "/cmsContent/getTwoConditionedValue/alternatestatus",
    { tableName, columName, value, columName1, value1, val }
  );
  return result;
};


const getUserJson = async (
 id
) => {
  const result = await http.get(
    ACCESS_POINT + `/cmsContent/getUserJson/${id}`,
    
  );
  return result;
};


const Freelogin = async (mobileNumber,otp='') => {
  const result = await http.post(ACCESS_POINT + `/user/commonLogin/${mobileNumber}`,{num:otp});
  return result;
};
const getMasterValues = async (tableName, columName = "id", order = "desc") => {
  const result = await http.get(
    ACCESS_POINT + `/cmsContent/master/${tableName}/${columName}/${order}`
  );
  return result;
};

const getSelectvalue = async (
  tableName,
  column,
  companyid,
  id = "id",
  name = "name"
) => {
  const result = await http.get(
    ACCESS_POINT +
      `/cmsContent/getSelectvalue/${tableName}/${column}/${companyid}/${id}/${name}`
  );

  return result;
};

const authorinsert = async (formData, tableName) => {
  const result = await http.post(
    ACCESS_POINT + `/cmsContent/addauthor/${tableName}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return result;
};


const getSingleConditioned = async (
  tableName,
  columName1,
  value,
  dothis = "SELECT *"
) => {
  const result = await http.get(
    ACCESS_POINT +
      `/cmsContent/getSingleConditioned/${dothis}/${tableName}/${columName1}/${value}/`
  );
  return result;
};
const getConditionedValuewithStatus = async (
  tablename,
  columname,
  value,
  id = "id",
  name = "name"
) => {
  const result = await http.get(
    ACCESS_POINT +
      `/cmsContent/getConditionedValuewithStatus/${tablename}/${columname}/${value}/${id}/${name}`
  );
  return result;
};

const getAllSubtitleList = async tablename => {
  const result = await http.get(
    ACCESS_POINT + `/cmsContent/subTitleMaster/getAllList/${tablename}`
  );
  return result;
};

const mapUserToResource = async (tableName, formdata) => {
  const result = await http.post(
    ACCESS_POINT + `/cmsContent/mapUserToResource/${tableName}`,
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return result;
};

const addQuizContent = async jsonContent => {
  const result = await http.post(
    ACCESS_POINT + `/cmsContent/quizContent/addQuiz`,
    jsonContent
  );
  return result;
};
const displayQuizQuestion = async (value, customerid) => {
  const result = await http.put(
    ACCESS_POINT + `/cmsContent/quizContent/selectBox`,
    { value, customerid }
  );
  return result;
};


const mappingportlet = async (formData, tableName) => {
  const result = await http.post(
    ACCESS_POINT + `/cmsContent/mappingportlet/${tableName}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return result;
};


export default {
  getFreedom,
  //getThemeById,
  testRedis,
  getThemebyid,
  search,
  getHeader,
  getOtp,
  loginOTPCheckPost,
  pageViewCount,
  samplesitepage,
  getVideoContentById,
  updateQuizAnswer,
  checkQuizAttended,
  createMasterValue,
  updateMaster,
addMaster,
createcaptcha,
getTwoConditionedValue,
getUserJson,
Freelogin,
getMasterValues,
getSelectvalue,
authorinsert,
getSingleConditioned,
getConditionedValuewithStatus,
getAllSubtitleList,
mapUserToResource,
addQuizContent,
displayQuizQuestion,
mappingportlet

};
