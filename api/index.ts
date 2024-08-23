import { getReq, postReq } from "@/utils/request"
export const getMenuInfo = (data: any): Promise<any> =>
   getReq(`menu`, data)
// export const getNewsInfo = (data: any): Promise<any> =>
//    getReq(`news/info`, data)
export const getNewsArticle = (data: any): Promise<any> =>
   postReq(`news/page`, data)
export const getIndexData = (): Promise<any> =>
   getReq(`service/index/data`)
   export const getProgramData = (): Promise<any> =>
   getReq(`school-info/count`)
export const getProgramInfo = (data: any): Promise<any> =>
   postReq(`school-info/page`, data)
export const getProgramCase = (): Promise<any> => 
   getReq(`stu-case/page`)
export const getClassicCase = (): Promise<any> =>
   getReq(`stu-case/all`)
export const getVolunteerStory = (): Promise<any> =>
   getReq(`tea-story/all`)
export const getProgramVideo = (): Promise<any> =>
   getReq(`program/video`)
export const getRecruitMemberInfo = (): Promise<any> =>
   getReq(`recruit/all`)
export const getProfileInfo = (): Promise<any> =>
   getReq(`profile`)
export const getVideoByID = (params: any): Promise<any> =>
   getReq(`video/get`, params)
export const getDevelopEvent = (): Promise<any> =>
   getReq(`develop-path/all`)
export const getCooperator = (): Promise<any> =>
   getReq(`support/all`)

export const getVideoPage = (data: any): Promise<any> =>
   postReq(`video/page`, data)

 
    
   