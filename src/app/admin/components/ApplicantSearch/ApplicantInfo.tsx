import { Hacker_Applications } from "@prisma/client";
import ApplicantProperty from "./ApplicantProperty";

interface ApplicantInfoProps {
  applicant: Hacker_Applications;
  isEditing: boolean;
  handleEdit: (fieldName: string, payload: string | number) => void;
}
export default function ApplicantInfo({
  applicant,
  isEditing,
  handleEdit,
}: ApplicantInfoProps) {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-between gap-4 md:flex-nowrap">
        <div>
          <h2 className="text-lg font-medium">Personal Information</h2>
          {isEditing && (
            <>
              <ApplicantProperty
                propertyName="First Name"
                editing={isEditing}
                handleEdit={(payload: string) =>
                  handleEdit("first_name", payload)
                }
                propertyValue={applicant.first_name}
              />
              <ApplicantProperty
                propertyName="Last Name"
                editing={isEditing}
                handleEdit={(payload: string) =>
                  handleEdit("last_name", payload)
                }
                propertyValue={applicant.last_name}
              />
            </>
          )}
          <ApplicantProperty
            propertyName="Age"
            editing={isEditing}
            handleEdit={(payload: string) =>
              handleEdit("age", parseInt(payload))
            }
            propertyValue={applicant.age}
          />
          <ApplicantProperty
            propertyName="Country"
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("country", payload)}
            propertyValue={applicant.country}
          />
          <ApplicantProperty
            propertyName="Gender"
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("gender", payload)}
            propertyValue={applicant.gender}
          />
          <ApplicantProperty
            propertyName="Pronouns"
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("pronouns", payload)}
            propertyValue={applicant.pronouns}
          />
          <ApplicantProperty
            propertyName="Ethnicity"
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("ethnicity", payload)}
            propertyValue={applicant.ethnicity}
          />
          <ApplicantProperty
            propertyName="International"
            editing={false}
            propertyValue={applicant.is_international ? "Yes" : "No"}
          />
        </div>
        <div>
          <h2 className="text-lg font-medium">Education Information</h2>
          <ApplicantProperty
            propertyName="School"
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("school", payload)}
            propertyValue={applicant.school}
          />
          <ApplicantProperty
            propertyName="Graduation Year"
            editing={isEditing}
            handleEdit={(payload: string) =>
              handleEdit("grad_year", parseInt(payload))
            }
            propertyValue={applicant.grad_year}
          />
          <ApplicantProperty
            propertyName="Major"
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("major", payload)}
            propertyValue={applicant.major}
          />
          <ApplicantProperty
            propertyName="Level of Study"
            editing={isEditing}
            handleEdit={(payload: string) =>
              handleEdit("level_of_study", payload)
            }
            propertyValue={applicant.level_of_study}
          />
        </div>
        <div>
          <h2 className="text-lg font-medium">Contact Information</h2>
          <ApplicantProperty
            propertyName="Email"
            editing={false}
            propertyValue={applicant.email}
          />
          <ApplicantProperty
            propertyName="Phone Number"
            editing={isEditing}
            handleEdit={(payload: string) =>
              handleEdit("phone_number", payload)
            }
            propertyValue={applicant.phone_number}
          />

          {/* <ApplicantProperty
            propertyName="Discord"
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("discord", payload)}
            propertyValue={applicant.discord}
          />
          {applicant.discord_id && (
            <ApplicantProperty
              propertyName="Discord ID"
              editing={false}
              propertyValue={applicant.discord_id}
            />
          )} */}
          <ApplicantProperty
            propertyName="Github"
            isLink
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("github", payload)}
            propertyValue={applicant.github}
          />
          <ApplicantProperty
            propertyName="LinkedIn"
            isLink
            editing={isEditing}
            handleEdit={(payload: string) => handleEdit("linkedin", payload)}
            propertyValue={applicant.linkedin}
          />
          <ApplicantProperty
            propertyName="Agreed MLH News"
            editing={false}
            propertyValue={applicant.agreed_mlh_news ? "Yes" : "No"}
          />
        </div>
      </div>
    </>
  );
}
