import { AttachFile, Description, Folder,Link as LinkIcon } from "@mui/icons-material";
import { ClickableCard, FileChip, IconWrapper, LinkChip, StyledCard } from "../theme/material.styles";
import { CardContent, Chip, Typography } from "@mui/material";
import type { Node } from "../../../admin/Material/types/node";
import { Box } from "@mui/system";

// SubfolderCard Component
export const SubfolderCard: React.FC<{ node: Node; onClick?: () => void }> = ({ node, onClick }) => {
  const isFolder = node.type === 'folder';
  const handleFileClick = (link: string) => {
    window.open(link, '_blank');
  };
  const CardWrapper = isFolder ? ClickableCard : StyledCard;
  return (
    <CardWrapper onClick={isFolder ? onClick : undefined}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
          <IconWrapper itemType={node.type}>
            {isFolder ? <Folder sx={{ fontSize: 28 }} /> : <Description sx={{ fontSize: 28 }} />}
          </IconWrapper>
          <Box sx={{ ml: 1.5, flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {node.heading}
            </Typography>
            {node.lastDate && (
              <Typography variant="caption" color="text.secondary">
                Due: {new Date(node.lastDate).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Box>
        {node.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
            {node.description}
          </Typography>
        )}
        {node.fileDetails && node.fileDetails.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
              Files:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {node.fileDetails.map((file, index) => (
                <FileChip
                  key={index}
                  icon={<AttachFile sx={{ fontSize: 14 }} />}
                  label={file.fileName}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileClick(file.uploadLink);
                  }}
                  size="small"
                />
              ))}
            </Box>
          </Box>
        )}
        {node.referenceDetails && node.referenceDetails.length > 0 && (
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
              References:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {node.referenceDetails.map((ref, index) => (
                <LinkChip
                  key={index}
                  icon={<LinkIcon sx={{ fontSize: 14 }} />}
                  label={ref.fileName}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileClick(ref.referenceLink);
                  }}
                  size="small"
                />
              ))}
            </Box>
          </Box>
        )}
        {node.tags && node.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
            {node.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: '#fafafa',
                  fontSize: '0.7rem',
                  height: '22px',
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </CardWrapper>
  );
};