import { application_status_enums } from "@prisma/client";

export const applicantFilters = new Set(Object.keys(application_status_enums))

// Other potential query parameters
// export const developer_filters = new Set()
// export const level_of_study_filters = new Set()
// export const ethnicity_filters = new Set()
// export const race_filters = new Set()
// export const email_message_status_filters = new Set()

export function isParamInApplicantFilters(param: string){
  return applicantFilters.has(param)
}

export function sanitizeAndPrepareParameters(params: string | string[]){
  const resultantFilters: object[] = []
  // If params is an array
  if(Array.isArray(params)){
    for(const param of params){
      if(isParamInApplicantFilters(param)){
        resultantFilters.push({application_status: param})
      }
    }
  }
  // If params is just string
  else{
    if(isParamInApplicantFilters(params)){
      resultantFilters.push({application_status: params})
    }
  }
  return resultantFilters
}
