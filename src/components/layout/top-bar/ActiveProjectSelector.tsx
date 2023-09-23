import { useProjectContext } from "@/context/project-context";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

export const ActiveProjectSelector = ({
  className,
}: {
  className?: string;
}) => {
  const { projects, activeProject, selectProject } = useProjectContext();

  return (
    <div className="bg-white rounded-md">
      <FormControl color="info" error={!activeProject}>
        <Select
          size="small"
          displayEmpty
          native={false}
          className={className}
          value={activeProject?.name ?? ""}
          variant="outlined"
          renderValue={(selected) => {
            if (!selected) {
              return (
                <em className={"font-light text-xs text-red-600"}>
                  SELECT ACTIVE PROJECT
                </em>
              );
            }
            return selected;
          }}
          sx={{ color: "var(--color-primary)" }}
          onChange={(e) => {
            selectProject(e.target.value as any);
          }}
        >
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
