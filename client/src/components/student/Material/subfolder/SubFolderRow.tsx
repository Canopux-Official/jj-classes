import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Box,
  Chip,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Folder,
  InsertDriveFile,
  AttachFile,
  Link as LinkIcon,
  CalendarToday,
} from "@mui/icons-material";
import type { Node } from "../../../admin/Material/types/node";
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Import AttachFileIcon

export const SubfolderRow: React.FC<{
  node: Node;
  onClick?: () => void;
  isHighlighted?: boolean;
}> = ({ node, onClick, isHighlighted = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isFolder = node.type === "folder";

  // Simple color scheme: Yellow for folders, Green for files
  const iconColor = isFolder ? "#f59e0b" : "#1976d2"; // Yellow for folder, Green for file

  const displayHeading = (node as any).subject
    ? typeof (node as any).subject === "object"
      ? (node as any).subject.name
      : (node as any).subject
    : node.heading;

  const createdDate = node.createdAt
    ? new Date(node.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    : null;

  const hasFiles = node.fileDetails && node.fileDetails.length > 0;
  const hasReferences = node.referenceDetails && node.referenceDetails.length > 0;
  const hasTags = node.tags && node.tags.length > 0;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFileClick = (link: string) => {
    window.open(link, "_blank");
    handleMenuClose();
  };

  const handleRowClick = () => {
    if (isFolder && onClick) {
      onClick();
    }
  };

  return (
    <>
      <TableRow
        onClick={handleRowClick}
        sx={{
          cursor: isFolder ? "pointer" : "default",
          transition: "all 0.2s ease",
          backgroundColor: isHighlighted ? "#fff9e6" : "transparent",
          "&:hover": {
            backgroundColor: isHighlighted ? "#fff9e6" : "#f5f5f5",
            "& .row-action": {
              opacity: 1,
            },
          },
        }}
      >
        {/* Name Column */}
        <TableCell sx={{ py: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Icon - Yellow for folder, Green for file */}
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isFolder ? (
                <Folder sx={{ color: iconColor, fontSize: 28 }} />
              ) : (
                <InsertDriveFile sx={{ color: iconColor, fontSize: 28 }} />
              )}
            </Box>

            {/* Name and Details */}
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#212121",
                  mb: 0.5,
                }}
              >
                {displayHeading}
              </Typography>

              {/* Description - Sliced to 100 characters */}
              {node.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.85rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "400px",
                    color: "#757575",
                  }}
                >
                  {node.description.slice(0, 100)}
                  {node.description.length > 100 && "..."}
                </Typography>
              )}

              {/* Tags */}
              {hasTags && (
                <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
                  {node.tags!.slice(0, 3).map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        backgroundColor: "#f5f5f5",
                        color: "#616161",
                      }}
                    />
                  ))}
                  {node.tags!.length > 3 && (
                    <Chip
                      label={`+${node.tags!.length - 3}`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        backgroundColor: "#e0e0e0",
                        color: "#424242",
                      }}
                    />
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </TableCell>

        {/* Type Column */}
        <TableCell sx={{ py: 2 }}>
          <Chip
            label={isFolder ? "Folder" : "File"}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        </TableCell>

        {/* Attachments Column */}
        <TableCell sx={{ py: 2 }}>
          {(hasFiles || hasReferences) && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {hasFiles && (
                <Chip
                  icon={<AttachFile sx={{ fontSize: 14 }} />}
                  label={node.fileDetails!.length}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "0.75rem",
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                  }}
                />
              )}
              {hasReferences && (
                <Chip
                  icon={<LinkIcon sx={{ fontSize: 14 }} />}
                  label={node.referenceDetails!.length}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "0.75rem",
                    backgroundColor: "#fef3c7",
                    color: "#b45309",
                  }}
                />
              )}
            </Box>
          )}
          {!hasFiles && !hasReferences && (
            <Typography variant="body2" color="text.secondary">
              —
            </Typography>
          )}
        </TableCell>

        {/* Modified Date Column */}
        <TableCell sx={{ py: 2 }}>
          {createdDate && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#757575",
              }}
            >
              <CalendarToday sx={{ fontSize: 16 }} />
              <Typography
                variant="body2"
                sx={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                {createdDate}
              </Typography>
            </Box>
          )}
        </TableCell>

        {/* Action Column */}
        <TableCell sx={{ py: 2, textAlign: "right" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
            {(hasFiles || hasReferences) && (
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{
                  color: "#757575",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <AttachFileIcon /> {/* Attachments Icon */}
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>

      {/* Files & References Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            maxHeight: 400,
            minWidth: 250,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: 2,
          },
        }}
      >
        {hasFiles && (
          <>
            <MenuItem disabled sx={{ opacity: 1, fontWeight: 700, color: "#212121" }}>
              <AttachFile sx={{ fontSize: 18, mr: 1 }} />
              Files
            </MenuItem>
            {node.fileDetails!.map((file, index) => (
              <MenuItem
                key={`file-${index}`}
                onClick={() => handleFileClick(file.uploadLink)}
                sx={{
                  pl: 4,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemIcon>
                  <InsertDriveFile sx={{ fontSize: 20, color: "#1e40af" }} />
                </ListItemIcon>
                <ListItemText
                  primary={file.fileName}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    noWrap: true,
                  }}
                />
              </MenuItem>
            ))}
          </>
        )}

        {hasFiles && hasReferences && (
          <Box sx={{ my: 1, borderTop: "1px solid #e0e0e0" }} />
        )}

        {hasReferences && (
          <>
            <MenuItem disabled sx={{ opacity: 1, fontWeight: 700, color: "#212121" }}>
              <LinkIcon sx={{ fontSize: 18, mr: 1 }} />
              References
            </MenuItem>
            {node.referenceDetails!.map((ref, index) => (
              <MenuItem
                key={`ref-${index}`}
                onClick={() => handleFileClick(ref.referenceLink)}
                sx={{
                  pl: 4,
                  "&:hover": {
                    backgroundColor: "#fef3c7",
                  },
                }}
              >
                <ListItemIcon>
                  <LinkIcon sx={{ fontSize: 20, color: "#b45309" }} />
                </ListItemIcon>
                <ListItemText
                  primary={ref.fileName}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    noWrap: true,
                  }}
                />
              </MenuItem>
            ))}
          </>
        )}
      </Menu>
    </>
  );
};