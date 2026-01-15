import type { Node } from "../../admin/Material/types/node";

// Mock Data
export const mockNodes: Node[] = [
  {
    _id: '1',
    heading: 'Mathematics - Advanced',
    targetExam: 'JEE Main 2024',
    stream: 'Science',
    type: 'folder',
    parentId: null,
    description: 'Complete mathematics course for JEE preparation',
    tags: ['Calculus', 'Algebra', 'Geometry'],
    createdAt: '2024-01-15',
  },
  {
    _id: '2',
    heading: 'Physics - Mechanics',
    targetExam: 'NEET 2024',
    stream: 'Science',
    type: 'folder',
    parentId: null,
    description: 'Fundamental physics concepts and problem solving',
    tags: ['Newton Laws', 'Motion', 'Energy'],
    createdAt: '2024-01-16',
  },
  {
    _id: '3',
    heading: 'Calculus Chapter 1',
    targetExam: 'JEE Main 2024',
    stream: 'Science',
    type: 'folder',
    parentId: '1',
    description: 'Introduction to limits and derivatives',
    tags: ['Limits', 'Derivatives'],
    lastDate: '2024-02-15',
  },
  {
    _id: '4',
    heading: 'Assignment 1 - Limits',
    targetExam: 'JEE Main 2024',
    stream: 'Science',
    type: 'file',
    parentId: '3',
    description: 'Practice problems on limits and continuity',
    tags: ['Assignment', 'Practice'],
    lastDate: '2024-02-10',
    fileDetails: [
      { fileName: 'Assignment_Limits.pdf', uploadLink: 'https://drive.google.com/file/d/abc123' },
      { fileName: 'Solutions.pdf', uploadLink: 'https://drive.google.com/file/d/def456' },
    ],
    referenceDetails: [
      { fileName: 'Khan Academy - Limits', referenceLink: 'https://khanacademy.org/limits' },
      { fileName: 'MIT OCW Notes', referenceLink: 'https://ocw.mit.edu/calculus' },
    ],
  },
  {
    _id: '5',
    heading: 'Video Lecture - Derivatives',
    targetExam: 'JEE Main 2024',
    stream: 'Science',
    type: 'file',
    parentId: '3',
    description: 'Comprehensive video on derivative concepts',
    tags: ['Video', 'Lecture'],
    fileDetails: [
      { fileName: 'Lecture_Recording.mp4', uploadLink: 'https://drive.google.com/file/d/ghi789' },
    ],
    referenceDetails: [
      { fileName: 'Practice Problems', referenceLink: 'https://example.com/practice' },
    ],
  },
];