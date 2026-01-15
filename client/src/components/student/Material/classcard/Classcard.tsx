import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { Folder, MoreVert } from "@mui/icons-material";
import type { Node } from "../../../admin/Material/types/node";

export const ClassCard: React.FC<{
  node: Node;
  onClick: () => void;
}> = ({ node, onClick }) => {
  const createdDate = node.createdAt
    ? new Date(node.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : null;

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 2,
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Top Row */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Folder sx={{ fontSize: 28, color: "#0F6F5C" }} />

          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {node.heading}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {node.targetExam}
            </Typography>
          </Box>

          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>

        {/* Divider */}
        <Box sx={{ borderTop: "1px solid #eee", my: 2 }} />

        {/* Bottom Row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {node.stream && (
            <Chip
              label={node.stream}
              size="small"
              sx={{
                backgroundColor: "#f1f3f4",
                fontSize: "0.75rem",
                height: 24,
              }}
            />
          )}

          {createdDate && (
            <Typography variant="caption" color="text.secondary">
              Created {createdDate}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
