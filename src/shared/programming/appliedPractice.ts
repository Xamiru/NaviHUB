import { WEB_SYSTEMS_PRACTICE } from './webSystemsPractice'
import { BACKEND_DATABASE_PRACTICE } from './backendDatabasePractice'
import { AI_SECURITY_PRACTICE } from './aiSecurityPractice'

export const PROGRAMMING_APPLIED_PRACTICE = {
  ...WEB_SYSTEMS_PRACTICE,
  ...BACKEND_DATABASE_PRACTICE,
  ...AI_SECURITY_PRACTICE
}
