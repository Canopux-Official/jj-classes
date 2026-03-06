import { useState } from 'react'
import { Box, Container, Typography, Dialog, DialogContent, IconButton, Divider } from '@mui/material'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import CloseIcon from '@mui/icons-material/Close'
import SchoolIcon from '@mui/icons-material/School'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined'

interface FacultyMember {
  id: string
  name: string
  title: string
  subject: string
  experience: string
  qualification: string
  specialty: string
  initials: string
  image: string
  bio: string
}

const FACULTY: FacultyMember[] = [
  {
    id: '1', name: 'Dr. Rajesh Kumar', title: 'Senior Professor', subject: 'Mathematics', experience: '18',
    qualification: 'Ph.D. from IIT Delhi', specialty: 'JEE Advanced problem solving', initials: 'RK',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Rajesh Kumar has mentored over 3,000 JEE aspirants across 18 years. His structured approach to calculus and algebra has produced consistent top-100 rankers every year.',
  },
  {
    id: '2', name: 'Prof. Priya Sharma', title: 'Head of Department', subject: 'Physics', experience: '15',
    qualification: 'M.Sc. Physics, Gold Medalist', specialty: 'Conceptual clarity and applications', initials: 'PS',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    bio: 'Prof. Priya Sharma is a Gold Medalist known for making complex Physics concepts accessible. Her students have secured seats in IITs, NITs, and premier engineering institutions.',
  },
  {
    id: '3', name: 'Dr. Arjun Verma', title: 'Research Faculty', subject: 'Chemistry', experience: '16',
    qualification: 'Ph.D. Chemistry, Published Researcher', specialty: 'Organic and Inorganic chemistry', initials: 'AV',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Arjun Verma brings research-level depth to classroom teaching. With 12 published papers and 16 years of coaching, he is among the most sought-after Chemistry faculty in India.',
  },
  {
    id: '4', name: 'Dr. Neha Patel', title: 'Clinical Educator', subject: 'Biology', experience: '14',
    qualification: 'M.D. Anatomy, Clinical Experience', specialty: 'NEET preparation and medical guidance', initials: 'NP',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Neha Patel combines her clinical background with teaching to give NEET aspirants an edge. Her biology sessions are known for diagram-based learning and high retention.',
  },
  {
    id: '5', name: 'Mr. Vikram Singh', title: 'Language Expert', subject: 'English', experience: '12',
    qualification: 'M.A. Literature, TOEFL Expert', specialty: 'Competitive exam language skills', initials: 'VS',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Mr. Vikram Singh specialises in English for competitive exams. His vocabulary-building and comprehension techniques have helped hundreds of students crack board and aptitude exams.',
  },
  {
    id: '6', name: 'Ms. Anjali Gupta', title: 'Aptitude Specialist', subject: 'Reasoning', experience: '13',
    qualification: 'M.B.A., Logical Reasoning Specialist', specialty: 'Aptitude and logical reasoning', initials: 'AG',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    bio: 'Ms. Anjali Gupta is a nationally recognised aptitude trainer. Her shortcut-based reasoning methods are used by students across JEE, NEET, and management entrance exam prep.',
  },
]

function FacultyCard({ member, onClick }: { member: FacultyMember; onClick: () => void }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        bgcolor: '#fff',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid #e8e8e8',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        gap: 0,
        '&:hover': {
          boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
          borderColor: '#bbb',
          transform: 'translateY(-3px)',
          '& .faculty-img': { transform: 'scale(1.05)' },
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ overflow: 'hidden', width: { xs: 120, sm: '100%' }, height: { xs: 120, sm: 200 }, bgcolor: '#f5f7fa', flexShrink: 0 }}>
        <Box
          className="faculty-img"
          component="img"
          src={member.image}
          alt={member.name}
          sx={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            display: 'block',
            transition: 'transform 0.4s ease',
          }}
        />
      </Box>

      {/* Content Section */}
      <Box sx={{ p: { xs: 1.5, sm: 2 }, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Box sx={{
            display: 'inline-block',
            bgcolor: '#f0f4ff', color: '#001a4d',
            border: '1px solid #d0d9f0',
            borderRadius: 50, px: 1.5, py: 0.3,
            fontSize: { xs: 10, sm: 11 }, fontWeight: 600, fontFamily: 'Montserrat',
            mb: 0.8,
          }}>
            {member.subject}
          </Box>

          <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: { xs: '0.85rem', sm: '0.95rem' }, color: '#111', mb: 0.2 }}>
            {member.name}
          </Typography>
          <Typography sx={{ fontSize: { xs: 11, sm: 12 }, color: '#888', mb: 1 }}>
            {member.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <WorkHistoryOutlinedIcon sx={{ fontSize: { xs: 12, sm: 13 }, color: '#999' }} />
          <Typography sx={{ fontSize: { xs: 11, sm: 12 }, color: '#666' }}>{member.experience} years experience</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default function Faculty() {
  const [selected, setSelected] = useState<FacultyMember | null>(null)

  return (
    <Box id="faculty" sx={{ py: { xs: 10, md: 14 }, bgcolor: '#fff' }}>
      <Container maxWidth="lg">

        <Box sx={{ textAlign: 'center', mb: 8, px: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2 }}>
            <EmojiEventsOutlinedIcon sx={{ color: '#c47a3a', fontSize: 26 }} />
            <Typography variant="h2" sx={{ color: '#001a4d', fontSize: { xs: '1.75rem', sm: '2.2rem', md: '2.8rem' } }}>
              Meet Our Faculty
            </Typography>
          </Box>
          <Typography sx={{ color: '#666', maxWidth: 540, mx: 'auto', fontSize: { xs: '0.95rem', sm: '1rem' }, lineHeight: 1.75 }}>
            Learn from India's top educators — IIT alumni, published researchers, and medical professionals with a proven track record of student success.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2.5, sm: 4, md: 8 }, mt: 5, pt: 4, borderTop: '1px solid #eee', flexWrap: 'wrap' }}>
            {[
              { value: '6+', label: 'Expert Educators' },
              { value: '88 yrs', label: 'Combined Experience' },
              { value: '95%', label: 'Success Rate' },
              { value: '4', label: 'Subjects Covered' },
            ].map((s) => (
              <Box key={s.label} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: '#001a4d', lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ fontSize: { xs: 10, md: 11 }, color: '#999', mt: 0.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Two Column Grid Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
            gap: { xs: 2, sm: 2.5, md: 3 },
            px: { xs: 1, sm: 2 },
          }}
        >
          {FACULTY.map((member) => (
            <FacultyCard key={member.id} member={member} onClick={() => setSelected(member)} />
          ))}
        </Box>

      </Container>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.15)' } }}
      >
        {selected && (
          <>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={selected.image}
                alt={selected.name}
                sx={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
              <Box sx={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
                px: 2.5, py: 2,
              }}>
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
                  {selected.name}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)' }}>
                  {selected.title}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setSelected(null)}
                size="small"
                sx={{
                  position: 'absolute', top: 10, right: 10,
                  bgcolor: 'rgba(255,255,255,0.9)', color: '#333',
                  '&:hover': { bgcolor: '#fff' },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <DialogContent sx={{ px: 3, py: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, gap: 1, flexWrap: 'wrap' }}>
                <Box sx={{
                  bgcolor: '#f0f4ff', color: '#001a4d',
                  border: '1px solid #d0d9f0',
                  borderRadius: 50, px: 2, py: 0.4,
                  fontSize: 12, fontWeight: 600, fontFamily: 'Montserrat',
                }}>
                  {selected.subject}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <WorkHistoryOutlinedIcon sx={{ fontSize: 14, color: '#999' }} />
                  <Typography sx={{ fontSize: 13, color: '#555', fontWeight: 600 }}>
                    {selected.experience} yrs experience
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2.5 }} />

              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#001a4d', mb: 1, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                About
              </Typography>
              <Typography sx={{ fontSize: 13.5, color: '#444', lineHeight: 1.75, mb: 3 }}>
                {selected.bio}
              </Typography>

              <Divider sx={{ mb: 2.5 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <SchoolIcon sx={{ fontSize: 16, color: '#001a4d', mt: 0.2, flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.2 }}>Qualification</Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#333', fontWeight: 600 }}>{selected.qualification}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <AutoStoriesIcon sx={{ fontSize: 16, color: '#001a4d', mt: 0.2, flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.2 }}>Specialty</Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#333', fontWeight: 600 }}>{selected.specialty}</Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  )
}