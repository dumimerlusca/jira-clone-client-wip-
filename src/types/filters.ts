export type FilterOption = {
  value: any;
  label: string;
  icon?: React.ReactNode;
};

export type Filter = {
  name: string;
  label: string;
  options: FilterOption[];
  alwaysDisplay?: boolean;
};
