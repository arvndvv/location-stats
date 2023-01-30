export interface IHistory {
  place_id: string;
  q: string;
  date_selected: Date;
}

export interface IHistoryTableItem {
  date: string;
  title: string;
  link: string;
  full_title: string;
}
