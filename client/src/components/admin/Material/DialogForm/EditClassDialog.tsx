import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { StyledFormControl } from './EditClassDialog.styles';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (classType: string, targetExam: string) => void;
  initialClassType?: string;
  initialTargetExam?: string;
}

export const CLASS_OPTIONS = [
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 11', label: 'Class 11' },
  { value: 'Class 12', label: 'Class 12' },
  { value: 'JEE', label: 'JEE' },
];

export const TARGET_EXAM_OPTIONS = [
  { value: 'JEE', label: 'JEE' },
  { value: 'NEET', label: 'NEET' },
  { value: 'BOARD', label: 'BOARD' },
  { value: 'OTHER', label: 'OTHER' },
];

const EditClassDialog: React.FC<DialogProps> = ({ 
  open, 
  onClose, 
  onSave,
  initialClassType = '',
  initialTargetExam = ''
}) => {
  const [selectedClass, setSelectedClass] = useState(initialClassType);
  const [selectedTargetExam, setSelectedTargetExam] = useState(initialTargetExam);

  // Update state when initial values change
  useEffect(() => {
    setSelectedClass(initialClassType);
    setSelectedTargetExam(initialTargetExam);
  }, [initialClassType, initialTargetExam]);

  const handleClassChange = (event: SelectChangeEvent<string>) => {
    setSelectedClass(event.target.value);
  };

  const handleTargetExamChange = (event: SelectChangeEvent<string>) => {
    setSelectedTargetExam(event.target.value);
  };

  const handleSubmit = () => {
    onSave(selectedClass, selectedTargetExam);
  };

  const handleClose = () => {
    // Reset to initial values on cancel
    setSelectedClass(initialClassType);
    setSelectedTargetExam(initialTargetExam);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Edit Class Information</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <StyledFormControl fullWidth>
          <InputLabel id="class-label">Class</InputLabel>
          <Select
            labelId="class-label"
            id="class-select"
            value={selectedClass}
            label="Class"
            onChange={handleClassChange}
            fullWidth
          >
            {CLASS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <Box sx={{ mt: 3 }} />

        <StyledFormControl fullWidth>
          <InputLabel id="target-exam-label">Target Exam</InputLabel>
          <Select
            labelId="target-exam-label"
            id="target-exam-select"
            value={selectedTargetExam}
            label="Target Exam"
            onChange={handleTargetExamChange}
            fullWidth
          >
            {TARGET_EXAM_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!selectedClass || !selectedTargetExam}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditClassDialog;