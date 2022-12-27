declare interface Permission {
  id: number;
  name: string;
  parentId: number;
  uniqueKey: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  parentId: number;
  children?: Permission[];
}
