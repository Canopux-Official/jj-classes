import { useState } from 'react'
import {
  Box, Container, Typography, Dialog, DialogContent, IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { AnimatePresence } from 'framer-motion'

interface Student {
  id: number
  name: string
  score: string
  scoreLabel: string
  exam: string
  course: string
  image: string
  bio: string
  achievement: string
}

const STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Rahul Sharma',
    score: 'AIR 127',
    scoreLabel: 'AIR 127',
    exam: "JEE Adv. '25",
    course: 'Classroom Course',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=top',
    bio: 'Rahul consistently performed exceptionally well in all mock tests and practice sessions.',
    achievement: 'Admitted to IIT Delhi - Computer Science',
  },
  {
    id: 2,
    name: 'Priya Patel',
    score: 'AIR 89',
    scoreLabel: 'AIR 89',
    exam: "NEET-UG '25",
    course: 'Online Classroom',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=top',
    bio: 'Priya demonstrated outstanding dedication and mastery in Biology and Chemistry.',
    achievement: 'Admitted to AIIMS Delhi - MBBS',
  },
  {
    id: 3,
    name: 'Arjun Kumar',
    score: '99.8%',
    scoreLabel: '99.8%',
    exam: "JEE Main '25",
    course: 'Classroom Course',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=top',
    bio: 'Arjun excelled through systematic practice and strong conceptual understanding.',
    achievement: 'Admitted to NIT Bangalore - Mechanical Engineering',
  },
  {
    id: 4,
    name: 'Neha Singh',
    score: 'AIR 76',
    scoreLabel: 'AIR 76',
    exam: "NEET-UG '25",
    course: 'Online Classroom',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=top',
    bio: 'Neha displayed exceptional focus and consistency throughout her preparation.',
    achievement: 'Admitted to JIPMER - MBBS',
  },
  {
    id: 5,
    name: 'Vikram Patel',
    score: 'AIR 234',
    scoreLabel: 'AIR 234',
    exam: "JEE Adv. '25",
    course: 'Classroom Course',
    image: 'https://images.unsplash.com/photo-1500595046891-90e4e1c3765c?w=300&h=400&fit=crop&crop=top',
    bio: 'Vikram showed remarkable improvement in his problem-solving abilities.',
    achievement: 'Admitted to IIT Bombay - Electrical Engineering',
  },
  {
    id: 6,
    name: 'Anjali Gupta',
    score: 'AIR 102',
    scoreLabel: 'AIR 102',
    exam: "NEET-UG '25",
    course: 'Online Classroom',
    image: 'https://images.unsplash.com/photo-1534126613592-abbf40ecf8f7?w=300&h=400&fit=crop&crop=top',
    bio: 'Anjali balanced her studies with consistent practice and mock tests.',
    achievement: 'Admitted to CMC Vellore - MBBS',
  },
  {
    id: 7,
    name: 'Rohan Mehta',
    score: '98.6%',
    scoreLabel: '98.6%',
    exam: "CBSE 10th '25",
    course: 'Foundation Course',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=top',
    bio: 'Rohan set a benchmark in the foundation batch with consistent top scores.',
    achievement: 'Top scorer in CBSE Board Examination',
  },
  {
    id: 8,
    name: 'Sneha Reddy',
    score: 'AIR 45',
    scoreLabel: 'AIR 45',
    exam: "JEE Adv. '25",
    course: 'Classroom Course',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=top',
    bio: 'Sneha cracked JEE Advanced with remarkable consistency and dedication.',
    achievement: 'Admitted to IIT Madras - Computer Science',
  },
]

function StudentCard({ student, onSelect }: { student: Student; onSelect: (s: Student) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Box
      onClick={() => onSelect(student)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ cursor: 'pointer', width: 220, flexShrink: 0 }}
    >
      {/* Photo area */}
      <Box
        sx={{
          position: 'relative',
          height: 260,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        {/* Student cutout image — no card background, just the photo */}
        <Box
          component="img"
          src={student.image}
          alt={student.name}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            borderRadius: 3,
            filter: hovered ? 'brightness(0.92)' : 'brightness(1)',
            transition: 'filter 0.3s, transform 0.3s',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />
      </Box>

      {/* Info below photo */}
      <Box>
        {/* Name + Score row */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1, mb: 0.4 }}>
          <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 15, color: '#111', lineHeight: 1.2 }}>
            {student.name}
          </Typography>
          <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 15, color: '#111', flexShrink: 0 }}>
            {student.scoreLabel}
          </Typography>
        </Box>

        {/* Course + Exam row */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1 }}>
          <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.4 }}>
            {student.course}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: 'text.secondary', flexShrink: 0 }}>
            {student.exam}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default function Results() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  return (
    <Box id="results" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        {/* Header — centered */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 6 }}>
          <Typography variant="h3" sx={{ color: '#111', fontSize: { xs: '1.8rem', md: '2.2rem' }, fontFamily: 'Montserrat', fontWeight: 800 }}>
            Success Stories
          </Typography>
          <AutoAwesomeIcon sx={{ color: '#c47a3a', fontSize: 28, mb: 1 }} />
        </Box>
      </Container>

      {/* Scrolling strip */}
      <Box
        sx={{ position: 'relative', overflow: 'hidden', width: '100%' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade masks */}
        <Box sx={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(to right, #fff, transparent)',
          zIndex: 10, pointerEvents: 'none',
        }} />
        <Box sx={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(to left, #fff, transparent)',
          zIndex: 10, pointerEvents: 'none',
        }} />

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            px: 4,
            pb: 2,
            width: 'max-content',
            animationName: 'marquee',
            animationDuration: '35s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          }}
        >
          {[...STUDENTS, ...STUDENTS].map((student, i) => (
            <StudentCard key={`${student.id}-${i}`} student={student} onSelect={setSelectedStudent} />
          ))}
        </Box>
      </Box>

      {/* Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <Dialog
            open={!!selectedStudent}
            onClose={() => setSelectedStudent(null)}
            maxWidth="xs"
            fullWidth
            PaperProps={{
              sx: { borderRadius: 3, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' },
            }}
          >
            {/* Title bar */}
            <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1rem', color: '#111' }}>
                {selectedStudent.name.split(' ')[0]}'s journey to {selectedStudent.achievement.split(' - ')[1] ?? selectedStudent.achievement}
              </Typography>
              <IconButton onClick={() => setSelectedStudent(null)} size="small" sx={{ color: '#555', border: '1.5px solid #ddd', borderRadius: '50%', p: 0.3 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <DialogContent sx={{ px: 2.5, pt: 0, pb: 3 }}>

              {/* Photo + name/rank card */}
              <Box sx={{
                display: 'flex', gap: 0, borderRadius: 2.5, overflow: 'hidden',
                border: '1px solid #eee', mb: 3,
              }}>
                {/* Photo with play overlay */}
                <Box sx={{ position: 'relative', width: 140, flexShrink: 0 }}>
                  <Box
                    component="img"
                    src={selectedStudent.image}
                    alt={selectedStudent.name}
                    sx={{ width: '100%', height: 160, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                  <Box sx={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.15)',
                  }}>
                    <Box sx={{
                      width: 44, height: 44, borderRadius: '50%',
                      bgcolor: '#1a73e8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(26,115,232,0.5)',
                    }}>
                      <PlayArrowIcon sx={{ color: '#fff', fontSize: 26 }} />
                    </Box>
                  </Box>
                </Box>

                {/* Name + exam + rank */}
                <Box sx={{ flex: 1, bgcolor: '#f0f4ff', px: 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
                  <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1.1rem', color: '#111' }}>
                    {selectedStudent.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#555' }}>
                    {selectedStudent.exam}
                  </Typography>
                  {/* AIR badge */}
                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: '#1a9e6e', color: '#fff',
                    borderRadius: 2, px: 2, py: 0.8,
                    fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.1rem',
                    width: 'fit-content',
                    boxShadow: '0 2px 8px rgba(26,158,110,0.35)',
                  }}>
                    {selectedStudent.scoreLabel}
                  </Box>
                </Box>
              </Box>

              {/* Preparation at a glance */}
              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1rem', color: '#111', mb: 1.5 }}>
                Preparation at a glance
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, mb: 2.5 }}>
                {[
                  { label: 'Classes\nattended', value: '320' },
                  { label: 'Questions\npracticed', value: '9,840' },
                  { label: 'Doubts\nAsked', value: '514' },
                ].map((s) => (
                  <Box key={s.label}>
                    <Typography sx={{ fontSize: 12, color: '#888', lineHeight: 1.4, whiteSpace: 'pre-line', mb: 0.3 }}>{s.label}</Typography>
                    <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1.2rem', color: '#111' }}>{s.value}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Favourite feature banner */}
              <Box sx={{
                bgcolor: '#1a9e6e', borderRadius: 2,
                px: 2.5, py: 1.2,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                mb: 3,
              }}>
                <Typography sx={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>
                  ♥ Favourite feature:
                </Typography>
                <Typography sx={{ color: '#fff', fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14 }}>
                  Mock Tests
                </Typography>
              </Box>

              {/* Course section */}
              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1rem', color: '#111', mb: 1.5 }}>
                The course {selectedStudent.name.split(' ')[0]} chose
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                <Box sx={{ bgcolor: '#7c3aed', color: '#fff', fontSize: 11, fontWeight: 700, px: 1.5, py: 0.4, borderRadius: 50, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  📺 LIVE PROGRAM
                </Box>
                <Box sx={{ bgcolor: '#fff3e0', color: '#c47a3a', fontSize: 11, fontWeight: 700, px: 1.5, py: 0.4, borderRadius: 50, border: '1px solid #f5c58a' }}>
                  BESTSELLER
                </Box>
              </Box>

              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1rem', color: '#111', mb: 0.3 }}>
                {selectedStudent.course} — {selectedStudent.exam.replace("'25", '').trim()}
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#888', mb: 2 }}>Target 2026</Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, borderTop: '1px solid #eee', pt: 2 }}>
                {[
                  { label: 'Class:', value: '11th / 12th' },
                  { label: 'Duration:', value: '1 year' },
                  { label: 'Language:', value: 'English / Hindi' },
                  { label: 'Starting from:', value: 'Anytime' },
                ].map((item) => (
                  <Box key={item.label}>
                    <Typography sx={{ fontSize: 12, color: '#999' }}>{item.label}</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{item.value}</Typography>
                  </Box>
                ))}
              </Box>

            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </Box>
  )
}