import {
  ProjectDetailsPanel,
  ProjectDetailsProvider,
} from "@/core/features/projects";

export default function Page() {
  return (
    <ProjectDetailsProvider>
      <ProjectDetailsPanel />
    </ProjectDetailsProvider>
  );
}
