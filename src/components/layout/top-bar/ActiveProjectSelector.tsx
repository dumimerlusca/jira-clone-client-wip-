import { useProjectContext } from "@/context/project-context";
import { AllOption } from "@/types/project";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

export const ActiveProjectSelector = ({
  className,
}: {
  className?: string;
}) => {
  const { projects, activeProject, selectProject, all } = useProjectContext();

  return (
    <div className="bg-white rounded-md">
      <FormControl color="info" error={!activeProject && !all}>
        <Select
          size="small"
          displayEmpty
          native={false}
          className={className}
          value={all ? AllOption : activeProject?.id ?? ""}
          variant="outlined"
          renderValue={(selected) => {
            if (!selected) {
              return (
                <em className={"font-light text-xs text-red-600"}>
                  SELECT ACTIVE PROJECT
                </em>
              );
            }

            if (selected === AllOption) {
              return "ALL";
            }
            return activeProject?.name;
          }}
          sx={{ color: "var(--color-primary)" }}
          onChange={(e) => {
            selectProject(e.target.value as any);
          }}
        >
          {projects.length > 1 && <MenuItem value={AllOption}>ALL</MenuItem>}
          {projects.map((project) => {
            return (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            );
          })}
          {projects.length === 0 && (
            <Typography className="p-3">No projects available</Typography>
          )}
        </Select>
      </FormControl>
    </div>
  );
};
