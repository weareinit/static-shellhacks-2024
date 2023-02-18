export const applicant_filters = new Set([
  'pending',
  'accepted',
  'declined',
  'confirmed',
  'withdrawn'
])

export function isParamInApplicantFilters(param){
  return applicant_filters.has(param)
}
