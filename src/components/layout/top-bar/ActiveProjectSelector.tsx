import { useProjectContext } from "@/context/project-context";
import { AllOption } from "@/types/project";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import classNames from "classnames";

export const ActiveProjectSelector = ({
  className,
}: {
  className?: string;
}) => {
  const { projects, activeProject, selectProject, all } = useProjectContext();

  return (
    <div className={classNames("rounded-md bg-blue-400", className)}>
      <FormControl
        className="w-full"
        color="primary"
        error={!activeProject && !all}
      >
        <Select
          size="small"
          displayEmpty
          color="primary"
          native={false}
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
          sx={{ color: "white" }}
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
