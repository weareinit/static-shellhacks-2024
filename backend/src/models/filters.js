import { application_status_enums } from "@prisma/client";

export const applicant_filters = new Set(Object.keys(application_status_enums))

// Other potential query parameters
// export const developer_filters = new Set()
// export const level_of_study_filters = new Set()
// export const ethnicity_filters = new Set()
// export const race_filters = new Set()
// export const email_message_status_filters = new Set()

export function isParamInApplicantFilters(param){
  return applicant_filters.has(param)
}

export function sanitizeAndPrepareParameters(params){
  let resultantFilters = [] 
  // If params is an array 
  if(Array.isArray(params)){
    for(let i = 0; i < params.length; i++){
      if(isParamInApplicantFilters(params[i])){
        resultantFilters.push({application_status: params[i]})
      } 
    }
  }
  // If params is just a value
  else{
    if(isParamInApplicantFilters(params)){
      resultantFilters.push({application_status: params})
    }
  }
  return resultantFilters
}
