import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    CircularProgress,
    Alert,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    IconButton,
    Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getAllAdmins, updateAdminPermissions, addAdmin, deleteAdmin } from '../../api/apiFunctions';

interface AdminPermissions {
    students: boolean;
    streams: boolean;
    targetExams: boolean;
    subjects: boolean;
    session: boolean;
    upload: boolean;
    notice: boolean;
    attendance: boolean;
}

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    permissions?: AdminPermissions;
}

const permissionLabels: Record<keyof AdminPermissions, string> = {
    students: "Students Directory",
    streams: "Streams Manager",
    targetExams: "Target Exams Manager",
    subjects: "Subjects Manager",
    session: "Session Manager",
    upload: "Upload Material",
    notice: "Add Notice",
    attendance: "Attendance"
};

const AdminAccessControl: React.FC = () => {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Add Admin State
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        name: '', email: '', phoneNumber: '', password: '', role: 'admin'
    });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const res = await getAllAdmins();
            if (res.success && res.data) {
                setAdmins((res.data as { admins: AdminUser[] }).admins || []);
            } else {
                setError(res.message || "Failed to load admins");
            }
        } catch {
            setError("An error occurred while fetching admins.");
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePermission = async (adminId: string, currentPermissions: AdminPermissions | undefined, key: keyof AdminPermissions) => {
        const updatedPermissions = {
            ...(currentPermissions || {
                students: false, streams: false, targetExams: false,
                subjects: false, session: false, upload: false,
                notice: false, attendance: false
            }),
            [key]: currentPermissions ? !currentPermissions[key] : true
        };

        // Optimistic UI Update
        setAdmins((prev) =>
            prev.map(admin =>
                admin._id === adminId
                    ? { ...admin, permissions: updatedPermissions }
                    : admin
            )
        );

        const res = await updateAdminPermissions(adminId, updatedPermissions);
        if (!res.success) {
            alert("Failed to update permissions: " + res.message);
            // Revert if failed
            fetchAdmins();
        }
    };

    const handleAddAdminSubmit = async () => {
        setSubmitting(true);
        const res = await addAdmin(newAdmin);
        setSubmitting(false);
        if (res.success) {
            setOpenAddDialog(false);
            setNewAdmin({ name: '', email: '', phoneNumber: '', password: '', role: 'admin' });
            fetchAdmins();
        } else {
            alert(res.message || "Failed to add admin");
        }
    };

    const handleDeleteAdmin = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete administrator ${name}?`)) return;
        const res = await deleteAdmin(id);
        if (res.success) {
            fetchAdmins();
        } else {
            alert(res.message || "Failed to delete admin");
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box>
                    <Typography variant="h4" fontWeight={800} sx={{ color: '#0b2021' }}>
                        Admin Access Control
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Manage feature permissions and accounts for standard administrators.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddDialog(true)}
                    sx={{ bgcolor: '#0b2021', '&:hover': { bgcolor: '#1a3a3a' } }}
                >
                    Create Admin
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} elevation={0}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                                <TableRow>
                                    <TableCell><strong>Administrator</strong></TableCell>
                                    <TableCell><strong>Contact</strong></TableCell>
                                    <TableCell><strong>Permissions</strong></TableCell>
                                    <TableCell align="right"><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {admins.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                                            <Typography color="text.secondary">No standard admins found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    admins.map((admin) => (
                                        <TableRow key={admin._id} hover>
                                            <TableCell>
                                                <Typography fontWeight={600}>{admin.name}</Typography>
                                                <Chip label={admin.role} size="small" color="primary" sx={{ mt: 0.5 }} />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{admin.email}</Typography>
                                                <Typography variant="body2" color="text.secondary">{admin.phoneNumber}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                                    {Object.keys(permissionLabels).map((key) => {
                                                        const permKey = key as keyof AdminPermissions;
                                                        const isChecked = admin.permissions ? admin.permissions[permKey] : false;
                                                        return (
                                                            <Box
                                                                key={permKey}
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    bgcolor: isChecked ? 'rgba(6, 100, 102, 0.08)' : 'rgba(0,0,0,0.02)',
                                                                    borderRadius: 2,
                                                                    px: 1,
                                                                    border: '1px solid',
                                                                    borderColor: isChecked ? 'rgba(6, 100, 102, 0.2)' : 'transparent',
                                                                    minWidth: 180
                                                                }}
                                                            >
                                                                <Switch
                                                                    size="small"
                                                                    checked={isChecked}
                                                                    onChange={() => handleTogglePermission(admin._id, admin.permissions, permKey)}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                />
                                                                <Typography variant="body2" sx={{ ml: 1, fontWeight: isChecked ? 600 : 400, color: isChecked ? '#0b2021' : 'text.secondary' }}>
                                                                    {permissionLabels[permKey]}
                                                                </Typography>
                                                            </Box>
                                                        );
                                                    })}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton color="error" onClick={() => handleDeleteAdmin(admin._id, admin.name)} title="Delete Admin">
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Add Admin Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>Register New Administrator</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Full Name"
                            fullWidth
                            value={newAdmin.name}
                            onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
                        />
                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={newAdmin.email}
                            onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
                        />
                        <TextField
                            label="Phone Number"
                            fullWidth
                            value={newAdmin.phoneNumber}
                            onChange={e => setNewAdmin({ ...newAdmin, phoneNumber: e.target.value })}
                        />
                        <TextField
                            label="Initial Password"
                            type="password"
                            fullWidth
                            value={newAdmin.password}
                            onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
                        />
                        <TextField
                            select
                            label="Role"
                            value={newAdmin.role}
                            onChange={e => setNewAdmin({ ...newAdmin, role: e.target.value })}
                            fullWidth
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="superadmin">Super Admin</MenuItem>
                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenAddDialog(false)} color="inherit">Cancel</Button>
                    <Button
                        onClick={handleAddAdminSubmit}
                        variant="contained"
                        disabled={submitting || !newAdmin.name || !newAdmin.email || !newAdmin.phoneNumber || !newAdmin.password}
                        sx={{ bgcolor: '#0b2021', '&:hover': { bgcolor: '#1a3a3a' } }}
                    >
                        {submitting ? <CircularProgress size={24} color="inherit" /> : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default AdminAccessControl;
