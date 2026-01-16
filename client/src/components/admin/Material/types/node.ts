import type { FileDetail } from "./FileDetail";
import type { ReferenceDetail } from "./referenceDetails";

export interface Node {
  _id: string;
  heading: string;
  targetExam: string;
  stream: string;
  type: 'folder' | 'file';
  parentId: string | null;
  classType: string,
  description?: string;
  tags?: string[];
  lastDate?: string;
  createdAt?: string;
  updatedAt?: string;
  fileDetails?: FileDetail[];
  referenceDetails?: ReferenceDetail[];
}