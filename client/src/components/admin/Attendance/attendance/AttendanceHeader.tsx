// AttendanceHeader.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

interface AttendanceHeaderProps {
  monthName: string;
  year: number;
  dirtyCount: number;
  dayHeaders: number[];
  isCurrentMonth: boolean;
  syncing: boolean;
  onMarkAllPresent: (day: number) => void;
  onMarkAllAbsent: (day: number) => void;
  onSaveChanges: () => Promise<any>;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  monthName,
  year,
  dirtyCount,
  dayHeaders,
  isCurrentMonth,
  syncing,
  onMarkAllPresent,
  onMarkAllAbsent,
  onSaveChanges,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDay(null);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleMarkPresent = () => {
    if (selectedDay) {
      onMarkAllPresent(selectedDay);
    }
    handleMenuClose();
  };

  const handleMarkAbsent = () => {
    if (selectedDay) {
      onMarkAllAbsent(selectedDay);
    }
    handleMenuClose();
  };

  const handleSaveClick = () => {
    if (dirtyCount === 0) return;
    setSaveDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      await onSaveChanges();
      setSaveDialogOpen(false);
    } catch (error) {
      // Error handling is done in parent
    }
  };

  const getTodayDate = () => {
    if (!isCurrentMonth) return null;
    const today = new Date().getDate();
    return dayHeaders.includes(today) ? today : null;
  };

  const todayDate = getTodayDate();

  return (
    <>
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Box>
            <Typography variant="h5" component="h1" fontWeight="bold">
              Attendance Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {monthName} {year}
              {dirtyCount > 0 && (
                <Chip
                  label={`${dirtyCount} unsaved ${
                    dirtyCount === 1 ? 'change' : 'changes'
                  }`}
                  size="small"
                  color="warning"
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {/* Quick Mark Today - Only on current month */}
            {todayDate && !isMobile && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => onMarkAllPresent(todayDate)}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Mark All Present (Today)
                </Button>
              </>
            )}

            {/* Mark All Menu for other days */}
            {!isMobile && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleMenuOpen}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Mark All (Select Day)
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && !selectedDay}
                  onClose={handleMenuClose}
                  PaperProps={{
                    style: {
                      maxHeight: 300,
                    },
                  }}
                >
                  {dayHeaders.map((day) => (
                    <MenuItem
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      selected={day === todayDate}
                    >
                      {day === todayDate ? `Day ${day} (Today)` : `Day ${day}`}
                    </MenuItem>
                  ))}
                </Menu>

                {selectedDay && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(selectedDay)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMarkPresent}>
                      <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                      Mark All Present (Day {selectedDay})
                    </MenuItem>
                    <MenuItem onClick={handleMarkAbsent}>
                      <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                      Mark All Absent (Day {selectedDay})
                    </MenuItem>
                  </Menu>
                )}
              </>
            )}

            {/* Mobile More Menu */}
            {isMobile && (
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            )}

            {/* Save Button */}
            <Button
              variant="contained"
              startIcon={syncing ? <CircularProgress size={16} /> : <SaveIcon />}
              onClick={handleSaveClick}
              disabled={dirtyCount === 0 || syncing}
              color="primary"
            >
              {syncing ? 'Saving...' : 'Save Changes'}
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Save Confirmation Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Confirm Save Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to save {dirtyCount} attendance{' '}
            {dirtyCount === 1 ? 'record' : 'records'} to the server. This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)} disabled={syncing}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSave}
            variant="contained"
            disabled={syncing}
            startIcon={syncing ? <CircularProgress size={16} /> : null}
          >
            {syncing ? 'Saving...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};