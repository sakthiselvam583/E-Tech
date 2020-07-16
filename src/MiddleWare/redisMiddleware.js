﻿import http from "./httpMiddleWare";
import { ACCESS_POINT,REDIS_ACCESS_POINT } from "../config";

const singleTable = async (tableName,customerid,column) => {
    const result = await http.get(ACCESS_POINT+`/redis/singleTable/${tableName}/${column}/${customerid}`);
    return result;
  };

export default {
    singleTable
};