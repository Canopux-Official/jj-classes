import type { FileDetail } from "./FileDetail";
import type { ReferenceDetail } from "./referenceDetails";

export interface Node {
  _id: string;
  heading: string;
  type: 'folder' | 'file';
  parentId: string | null;
  description?: string;
  tags?: string[];
  lastDate?: string;
  createdAt?: string;
  fileDetails?: FileDetail[];
  referenceDetails?: ReferenceDetail[];
}