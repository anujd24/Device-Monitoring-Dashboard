export interface DeviceTypes {
  id: number;
  name: string;
  status: string;
  lastUpdated: string;
}

export interface PaginationTypes {
  totalDevices: number;  // 
  devicesPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}