import { ErrorCallout } from "@/components/ErrorCallout";
import { AssistantEditor } from "../AssistantEditor";
import { BackButton } from "@/components/BackButton";
import { Card, Title } from "@tremor/react";
import { DeletePersonaButton } from "./DeletePersonaButton";
import { fetchPersonaEditorInfoSS } from "@/lib/assistants/fetchPersonaEditorInfoSS";
import { SuccessfulPersonaUpdateRedirectType } from "../enums";
import { RobotIcon } from "@/components/icons/icons";
import { AdminPageTitle } from "@/components/admin/Title";

export default async function Page({
  params,
}: {
  params: { personaId: string };
}) {
  const [values, error] = await fetchPersonaEditorInfoSS(params.personaId);

  let body;
  if (!values) {
    body = (
      <ErrorCallout errorTitle="Something went wrong :(" errorMsg={error} />
    );
  } else {
    body = (
      <>
        <Card>
          <AssistantEditor
            {...values}
            defaultPublic={true}
            redirectType={SuccessfulPersonaUpdateRedirectType.ADMIN}
          />
        </Card>

        <div className="mt-12">
          <Title>Delete Assistant</Title>
          <div className="flex mt-6">
            <DeletePersonaButton personaId={values.existingPersona!.id} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <BackButton />

      <AdminPageTitle title="Edit Assistant" icon={<RobotIcon size={32} />} />

      {body}
    </div>
  );
}
