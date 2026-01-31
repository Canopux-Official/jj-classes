import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Folder,
  InsertDriveFile,
  MoreVert,
  AttachFile,
  Link as LinkIcon,
  CalendarToday,
  Label,
} from "@mui/icons-material";
import type { Node } from "../../../admin/Material/types/node";

export const MobileSubfolderCard: React.FC<{
  node: Node;
  onClick?: () => void;
  isHighlighted?: boolean;
}> = ({ node, onClick, isHighlighted = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isFolder = node.type === "folder";

  // Simple color scheme: Yellow for folders, Green for files
  const iconColor = isFolder ? "#f59e0b" : "#10b981"; // Yellow for folder, Green for file
  const iconBgColor = isFolder ? "#fef3c7" : "#d1fae5"; // Light yellow, Light green

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

  const handleCardClick = () => {
    if (isFolder && onClick) {
      onClick();
    }
  };

  return (
    <>
      <Paper
        onClick={handleCardClick}
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          p: 2,
          cursor: isFolder ? "pointer" : "default",
          backgroundColor: isHighlighted ? "#fff9e6" : "white",
          borderBottom: "1px solid #e0e0e0",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: isHighlighted ? "#fff9e6" : "#f5f5f5",
          },
          "&:active": {
            backgroundColor: isFolder ? "#eeeeee" : undefined,
          },
        }}
      >
        {/* Icon - Yellow for folder, Green for file */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            backgroundColor: iconBgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.5,
          }}
        >
          {isFolder ? (
            <Folder sx={{ color: iconColor, fontSize: 28 }} />
          ) : (
            <InsertDriveFile sx={{ color: iconColor, fontSize: 28 }} />
          )}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Name */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#212121",
              mb: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
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
                fontSize: "0.8rem",
                mb: 0.5,
                color: "#757575",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {node.description.slice(0, 100)}
              {node.description.length > 100 && "..."}
            </Typography>
          )}

          {/* Metadata Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              mb: hasTags ? 0.5 : 0,
            }}
          >
            {/* Type Badge */}
            <Chip
              label={isFolder ? "Folder" : "File"}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.65rem",
                fontWeight: 600,
                backgroundColor: isFolder ? "#fef3c7" : "#d1fae5",
                color: isFolder ? "#b45309" : "#047857",
                border: `1px solid ${isFolder ? "#fbbf24" : "#34d399"}30`,
              }}
            />

            {/* Attachments */}
            {hasFiles && (
              <Chip
                icon={<AttachFile sx={{ fontSize: 12 }} />}
                label={node.fileDetails!.length}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  backgroundColor: "#dbeafe",
                  color: "#1e40af",
                  "& .MuiChip-icon": {
                    ml: 0.5,
                  },
                }}
              />
            )}

            {hasReferences && (
              <Chip
                icon={<LinkIcon sx={{ fontSize: 12 }} />}
                label={node.referenceDetails!.length}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  backgroundColor: "#fef3c7",
                  color: "#b45309",
                  "& .MuiChip-icon": {
                    ml: 0.5,
                  },
                }}
              />
            )}

            {/* Date */}
            {createdDate && (
              <>
                <Typography
                  variant="caption"
                  sx={{ color: "#9e9e9e", fontSize: "0.7rem" }}
                >
                  •
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarToday sx={{ fontSize: 12, color: "#9e9e9e" }} />
                  <Typography
                    variant="caption"
                    sx={{ color: "#757575", fontSize: "0.7rem" }}
                  >
                    {createdDate}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          {/* Tags */}
          {hasTags && (
            <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
              {node.tags!.slice(0, 3).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  icon={<Label sx={{ fontSize: 10 }} />}
                  sx={{
                    height: 20,
                    fontSize: "0.65rem",
                    backgroundColor: "#f5f5f5",
                    color: "#616161",
                    "& .MuiChip-icon": {
                      ml: 0.5,
                      fontSize: 12,
                    },
                  }}
                />
              ))}
              {node.tags!.length > 3 && (
                <Chip
                  label={`+${node.tags!.length - 3} more`}
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

        {/* Three Dot Menu Button */}
        <IconButton
          size="small"
          onClick={handleMenuOpen}
          sx={{
            flexShrink: 0,
            color: "#9e9e9e",
            mt: 0.5,
            "&:hover": {
              backgroundColor: "#f5f5f5",
              color: "#757575",
            },
          }}
        >
          <MoreVert />
        </IconButton>
      </Paper>

      {/* Files & References Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            maxHeight: 400,
            minWidth: 250,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            borderRadius: 2,
            mt: -1,
          },
        }}
      >
        {/* Header with node name */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "#212121",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {displayHeading}
          </Typography>
        </Box>

        {hasFiles && (
          <>
            <MenuItem
              disabled
              sx={{
                opacity: 1,
                fontWeight: 700,
                color: "#212121",
                py: 1,
                mt: 0.5,
              }}
            >
              <AttachFile sx={{ fontSize: 18, mr: 1 }} />
              Files ({node.fileDetails!.length})
            </MenuItem>
            {node.fileDetails!.map((file, index) => (
              <MenuItem
                key={`file-${index}`}
                onClick={() => handleFileClick(file.uploadLink)}
                sx={{
                  pl: 4,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#f0f9ff",
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
                    fontWeight: 500,
                  }}
                />
              </MenuItem>
            ))}
          </>
        )}

        {hasFiles && hasReferences && <Divider sx={{ my: 1 }} />}

        {hasReferences && (
          <>
            <MenuItem
              disabled
              sx={{
                opacity: 1,
                fontWeight: 700,
                color: "#212121",
                py: 1,
              }}
            >
              <LinkIcon sx={{ fontSize: 18, mr: 1 }} />
              References ({node.referenceDetails!.length})
            </MenuItem>
            {node.referenceDetails!.map((ref, index) => (
              <MenuItem
                key={`ref-${index}`}
                onClick={() => handleFileClick(ref.referenceLink)}
                sx={{
                  pl: 4,
                  py: 1.5,
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
                    fontWeight: 500,
                  }}
                />
              </MenuItem>
            ))}
          </>
        )}

        {!hasFiles && !hasReferences && (
          <MenuItem disabled sx={{ justifyContent: "center", py: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No attachments
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};