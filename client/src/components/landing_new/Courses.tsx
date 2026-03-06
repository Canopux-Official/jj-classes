import { useState } from 'react'
import {
  Box, Container, Typography, Collapse, Button,
} from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import PeopleIcon from '@mui/icons-material/People'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface Course {
  id: string
  title: string
  description: string
  level: string
  students: number
  duration: string
  features: string[]
  gradient: string
}

const COURSES: Course[] = [
  {
    id: 'jee',
    title: 'JEE Main & Advanced',
    description: "Comprehensive preparation for India's most competitive engineering entrance exam",
    level: 'Advanced',
    students: 2500,
    duration: '18 months',
    features: ['Expert faculty', 'Mock tests', 'Doubt sessions', 'Study materials'],
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.08) 100%)',
  },
  {
    id: 'neet',
    title: 'NEET Preparation',
    description: 'Targeted coaching for medical entrance examinations with proven results',
    level: 'Advanced',
    students: 1800,
    duration: '24 months',
    features: ['Biology experts', 'Anatomy models', 'Live practicals', 'Career guidance'],
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(5,150,105,0.08) 100%)',
  },
  {
    id: 'foundation',
    title: 'Foundation Course',
    description: 'Build strong fundamentals for classes 9-10 students preparing for competitive exams',
    level: 'Intermediate',
    students: 3200,
    duration: '12 months',
    features: ['Concept clarity', 'Problem solving', 'Logic building', 'Group study'],
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.08) 100%)',
  },
  {
    id: 'board',
    title: 'Board Exam Focus',
    description: 'Excel in your board exams while building competitive exam foundations',
    level: 'Intermediate',
    students: 2100,
    duration: '10 months',
    features: ['Board curriculum', 'Question bank', 'Model papers', 'Revision plans'],
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(239,68,68,0.08) 100%)',
  },
]

function CourseCard({ 
  course, 
  isExpanded, 
  onToggle 
}: { 
  course: Course
  isExpanded: boolean
  onToggle: () => void 
}) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        background: course.gradient,
        border: '1px solid',
        borderColor: isExpanded ? 'rgba(196,122,58,0.4)' : 'rgba(0,0,0,0.1)',
        borderRadius: 3,
        p: { xs: 2, sm: 2.5, md: 3 },
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,26,77,0.12)',
          borderColor: 'rgba(196,122,58,0.4)',
        },
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, md: 2 }, minWidth: 0, flex: 1 }}>
          <Box sx={{ p: 1, bgcolor: 'rgba(0,26,77,0.08)', borderRadius: 1.5, color: 'primary.main', flexShrink: 0 }}>
            <BookIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'primary.main', 
                fontFamily: 'Montserrat', 
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.25rem' },
                wordBreak: 'break-word',
              }}
            >
              {course.title}
            </Typography>
            <Typography sx={{ color: '#c47a3a', fontSize: { xs: 12, md: 13 }, fontWeight: 600 }}>
              {course.level}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ color: '#c47a3a', fontSize: { xs: 20, md: 24 }, flexShrink: 0, transition: 'transform 0.3s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          {isExpanded ? <RemoveIcon /> : <AddIcon />}
        </Box>
      </Box>

      <Typography 
        sx={{ 
          color: 'text.secondary', 
          mb: 2.5, 
          lineHeight: 1.6,
          fontSize: { xs: '0.9rem', md: '1rem' },
        }}
      >
        {course.description}
      </Typography>

      <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled' }}>
          <PeopleIcon fontSize="small" sx={{ fontSize: { xs: 18, md: 20 } }} />
          <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
            {course.students} students
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled' }}>
          <AccessTimeIcon fontSize="small" sx={{ fontSize: { xs: 18, md: 20 } }} />
          <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
            {course.duration}
          </Typography>
        </Box>
      </Box>

      <Collapse in={isExpanded} timeout="auto">
        <Box sx={{ pt: 2.5, mt: 2.5, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'primary.main', 
              fontFamily: 'Montserrat', 
              fontWeight: 600, 
              mb: 2,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
            }}
          >
            Key Features
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr' }, gap: { xs: 1, md: 1.5 }, mb: 3 }}>
            {course.features.map((feature, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: '#c47a3a', mt: 0.5, flexShrink: 0 }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                  }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            onClick={(e) => e.stopPropagation()}
            sx={{
              py: { xs: 1.2, md: 1.5 },
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            Enroll Now
          </Button>
        </Box>
      </Collapse>
    </Box>
  )
}

export default function Courses() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (courseId: string) => {
    // If clicking the same card, close it. Otherwise, open the new one and close the old one.
    setExpandedId(expandedId === courseId ? null : courseId)
  }

  return (
    <Box id="courses" sx={{ py: { xs: 8, sm: 10, md: 14 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, px: { xs: 1, sm: 2 } }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'primary.main', 
              mb: 2, 
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
              lineHeight: 1.2,
            }}
          >
            Our Courses
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary', 
              maxWidth: 600, 
              mx: 'auto', 
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              lineHeight: 1.7,
            }}
          >
            Choose from our comprehensive range of courses designed to help you achieve your academic and career goals
          </Typography>
        </Box>

        {/* Two Column Grid Layout */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: { xs: 2, sm: 2.5, md: 3 },
            px: { xs: 1, sm: 2 },
          }}
        >
          {COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isExpanded={expandedId === course.id}
              onToggle={() => handleToggle(course.id)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}