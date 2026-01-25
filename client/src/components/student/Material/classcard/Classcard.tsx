// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import { Folder, MoreVert } from "@mui/icons-material";
// import type { Node } from "../../../admin/Material/types/node";

// export const ClassCard: React.FC<{
//   node: Node;
//   onClick: () => void;
// }> = ({ node, onClick }) => {
//   const createdDate = node.createdAt
//     ? new Date(node.createdAt).toLocaleDateString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       })
//     : null;

//   return (
//     <Card
//       onClick={onClick}
//       sx={{
//         borderRadius: 2,
//         cursor: "pointer",
//         boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
//         "&:hover": {
//           boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//         },
//       }}
//     >
//       <CardContent sx={{ p: 2.5 }}>
//         {/* Top Row */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Folder sx={{ fontSize: 28, color: "#0F6F5C" }} />

//           <Box sx={{ ml: 2, flexGrow: 1 }}>
//             <Typography variant="subtitle1" fontWeight={600}>
//               {node.heading}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {node.targetExam}
//             </Typography>
//           </Box>

//           <IconButton size="small">
//             <MoreVert />
//           </IconButton>
//         </Box>

//         {/* Divider */}
//         <Box sx={{ borderTop: "1px solid #eee", my: 2 }} />

//         {/* Bottom Row */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           {node.stream && (
//             <Chip
//               label={node.stream}
//               size="small"
//               sx={{
//                 backgroundColor: "#f1f3f4",
//                 fontSize: "0.75rem",
//                 height: 24,
//               }}
//             />
//           )}

//           {createdDate && (
//             <Typography variant="caption" color="text.secondary">
//               Created {createdDate}
//             </Typography>
//           )}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };


import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import type { Node } from "../../../admin/Material/types/node";
import def from '../../../../../public/images/default.jpg'
import chem from '../../../../../public/images/chemistry.jpg'

// Subject-based banner images and colors
const subjectThemes = {
  Physics: {
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop",
    gradient: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    bgColor: "#EFF6FF",
    chipColor: "#1e40af"
  },
  Chemistry: {
    image: chem,
    gradient: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
    bgColor: "#FAF5FF",
    chipColor: "#7e22ce"
  },
  Mathematics: {
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    bgColor: "#ECFDF5",
    chipColor: "#047857"
  },
  Biology: {
    image: "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=800&h=400&fit=crop",
    gradient: "linear-gradient(135deg, #16a34a 0%, #84cc16 100%)",
    bgColor: "#F0FDF4",
    chipColor: "#15803d"
  },
  Geography: {
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=400&fit=crop",
    gradient: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
    bgColor: "#FFF7ED",
    chipColor: "#c2410c"
  },
  History: {
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=400&fit=crop",
    gradient: "linear-gradient(135deg, #d97706 0%, #eab308 100%)",
    bgColor: "#FFFBEB",
    chipColor: "#b45309"
  },
  English: {
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    gradient: "linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)",
    bgColor: "#ECFEFF",
    chipColor: "#0e7490"
  },
  Computer: {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    gradient: "linear-gradient(135deg, #475569 0%, #6b7280 100%)",
    bgColor: "#F8FAFC",
    chipColor: "#334155"
  },
  Default: {
    image: def,
    gradient: "linear-gradient(135deg, #4b5563 0%, #64748b 100%)",
    bgColor: "#F9FAFB",
    chipColor: "#374151"
  }
};

// Function to detect subject from heading or use provided subject
const getSubjectTheme = (node: Node) => {
  const subject = (node as any).subject || node.heading;
  
  for (const [key, theme] of Object.entries(subjectThemes)) {
    if (subject.toLowerCase().includes(key.toLowerCase())) {
      return theme;
    }
  }
  
  return subjectThemes.Default;
};

export const ClassCard: React.FC<{
  node: Node;
  onClick: () => void;
}> = ({ node, onClick }) => {
  const theme = getSubjectTheme(node);
  
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
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        border: "1px solid #e5e7eb",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
          transform: "translateY(-4px)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      }}
    >
      {/* Banner Image */}
      <Box sx={{ position: "relative", height: { xs: 128, sm: 144 } }}>
        <CardMedia
          component="img"
          image={theme.image}
          alt=""
          sx={{
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.gradient,
            opacity: 0.6,
          }}
        />
        
        {/* Menu Button on Banner */}
      </Box>

      {/* Content Section */}
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        {/* Title and Exam */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.125rem" },
              lineHeight: 1.3,
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {node.heading}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.875rem", sm: "0.875rem" },
                fontWeight: 500,
              }}
            >
              {node.targetExam}
            </Typography>
            <ChevronRight
              sx={{
                display: { xs: "block", sm: "none" },
                color: "text.secondary",
                fontSize: 20,
              }}
            />
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            pt: 2,
            borderTop: "1px solid #f3f4f6",
          }}
        >
          {node.stream && (
            <Chip
              label={node.stream}
              size="small"
              sx={{
                backgroundColor: theme.bgColor,
                color: theme.chipColor,
                fontSize: "0.75rem",
                fontWeight: 500,
                height: 28,
                borderRadius: 2,
                "& .MuiChip-label": {
                  px: 1.5,
                },
              }}
            />
          )}

          {createdDate && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                whiteSpace: "nowrap",
                ml: "auto",
              }}
            >
              {createdDate}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};