type HeaderCellProps = {
  label: string;
};

export const HeaderCell = ({ label }: HeaderCellProps) => {
  return (
    <div className="p-2 bg-primary/10 rounded-md text-gray-900 whitespace-nowrap">
      {label}
    </div>
  );
};
