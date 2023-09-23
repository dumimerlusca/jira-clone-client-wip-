import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import CommentsSection from "./comments/CommentsSection";
import { HistorySection } from "./history/HistorySection";

enum SectionId {
  comments = 0,
  history = 1,
}

export const TicketActivitySection = () => {
  const [activeSection, setActiveSection] = useState(SectionId.comments);

  return (
    <section className="space-y-7">
      <ButtonGroup size="small" variant="outlined">
        <GroupItem
          activeSection={activeSection}
          onClick={setActiveSection}
          label="Comments"
          value={SectionId.comments}
        />
        <GroupItem
          activeSection={activeSection}
          onClick={setActiveSection}
          label="History"
          value={SectionId.history}
        />
      </ButtonGroup>
      {activeSection === SectionId.comments ? (
        <CommentsSection />
      ) : (
        <HistorySection />
      )}
    </section>
  );
};

const GroupItem = ({
  activeSection,
  label,
  onClick,
  value,
}: {
  activeSection: SectionId;
  label: string;
  value: SectionId;
  onClick: (value: SectionId) => void;
}) => {
  return (
    <Button
      onClick={() => {
        onClick(value);
      }}
      variant={activeSection === value ? "contained" : undefined}
    >
      {label}
    </Button>
  );
};
