import { useProjectContext } from "@/context/project-context";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

export const ProjectSelector = ({
  selectedProjectId,
  onChange,
  className,
}: {
  selectedProjectId?: string;
  onChange: (projectId: string) => void;
  className?: string;
}) => {
  const { projects } = useProjectContext();

  const selectedProject = projects.find(
    (item) => item.id === selectedProjectId
  );

  return (
    <div className="bg-white rounded-md">
      <FormControl color="info" error={!selectedProjectId}>
        <Select
          size="small"
          displayEmpty
          native={false}
          className={className}
          value={selectedProjectId}
          variant="outlined"
          renderValue={(selected) => {
            if (!selected) {
              return (
                <em className={"font-light text-xs text-red-600"}>
                  SELECT PROJECT
                </em>
              );
            }

            return selectedProject?.name;
          }}
          sx={{ color: "var(--color-primary)" }}
          onChange={(e) => {
            onChange(e.target.value as string);
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
