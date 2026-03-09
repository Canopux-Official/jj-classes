import { useState } from 'react'
import { Box, Container, Typography, Dialog, IconButton, Chip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StarIcon from '@mui/icons-material/Star'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

interface Student {
  id: number; name: string; score: string; scoreLabel: string
  exam: string; course: string; image: string; bio: string
  achievement: string; youtubeLink?: string
}

const formatYoutubeLink = (url?: string) => {
  if (!url) return ''
  try {
    const urlObj = new URL(url)
    if (url.includes('youtube.com/shorts/')) {
      const videoId = url.split('youtube.com/shorts/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    } else if (urlObj.hostname === 'youtu.be') {
      const videoId = urlObj.pathname.substring(1)
      return `https://www.youtube.com/embed/${videoId}`
    } else if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
      const videoId = urlObj.searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}`
    }
  } catch {
    // If not a valid URL or other error, return the original string
  }
  return url
}

function StudentCard({ student, onSelect }: { student: Student; onSelect: (s: Student) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Box
      onClick={() => onSelect(student)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ cursor: 'pointer', width: 210, flexShrink: 0 }}
    >
      <Box sx={{
        position: 'relative', height: 270, mb: 1.8,
        borderRadius: '20px', overflow: 'hidden',
        boxShadow: hovered ? '0 16px 40px rgba(10,37,64,0.14)' : '0 4px 16px rgba(10,37,64,0.06)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}>
        <Box component="img" src={student.image} alt={student.name}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = 'https://via.placeholder.com/220x270?text=No+Image' }}
          sx={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top', display: 'block',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
        {/* Bottom gradient overlay */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(10,37,64,0.75) 0%, transparent 100%)',
        }} />
        {/* Score badge bottom */}
        <Box sx={{
          position: 'absolute', bottom: 12, left: 12, right: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <Box>
            <Typography sx={{
              color: '#fff', fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700, fontSize: 14, lineHeight: 1.2,
            }}>
              {student.name}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontFamily: '"DM Sans", sans-serif' }}>
              {student.exam}
            </Typography>
          </Box>
          <Box sx={{
            bgcolor: '#c47a3a', borderRadius: '10px',
            px: 1.2, py: 0.4,
          }}>
            <Typography sx={{ color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 800, fontSize: 13 }}>
              {student.scoreLabel}
            </Typography>
          </Box>
        </Box>

        {/* Play button if video */}
        {student.youtubeLink && (
          <Box sx={{
            position: 'absolute', top: 12, right: 12,
            width: 32, height: 32, bgcolor: 'rgba(239,68,68,0.9)',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease',
          }}>
            <PlayArrowIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
        )}
      </Box>

      <Typography sx={{
        fontSize: 12, color: '#94a3b8',
        fontFamily: '"DM Sans", sans-serif', textAlign: 'center',
      }}>
        {student.course}
      </Typography>
    </Box>
  )
}

export default function Results({ data }: { data?: Student[] | unknown[] }) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const displayResults: Student[] = data && data.length > 0
    ? data.map((s, index) => ({ ...(s as Student), id: (s as Student).id || index })) : []

  const shouldAnimate = displayResults.length > 4

  return (
    <Box id="results" sx={{ py: { xs: 9, md: 13 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8, px: { xs: 1, sm: 2 } }}>
          <Typography sx={{
            display: 'inline-block',
            bgcolor: 'rgba(196,122,58,0.08)', color: '#c47a3a',
            fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
            fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            px: 2, py: 0.6, borderRadius: '20px', mb: 2,
            border: '1px solid rgba(196,122,58,0.15)',
          }}>
            Achievements
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
            <Typography variant="h2" sx={{
              color: '#04301a',
              fontSize: { xs: '1.9rem', sm: '2.4rem', md: '3rem' },
              lineHeight: 1.1, letterSpacing: '-0.03em',
            }}>
              Success Stories
            </Typography>
            <AutoAwesomeIcon sx={{ color: '#c47a3a', fontSize: 26, mb: 0.5 }} />
          </Box>
          <Typography sx={{
            color: '#6b7280', mt: 1.5, maxWidth: 460, mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif',
          }}>
            Real students, real results. See how our students have transformed their futures.
          </Typography>
        </Box>
      </Container>

      {/* Scrolling strip */}
      <Box
        sx={{ position: 'relative', overflow: 'hidden', width: '100%' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {shouldAnimate && (
          <>
            <Box sx={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
              background: 'linear-gradient(to right, #fafaf8, transparent)',
              zIndex: 10, pointerEvents: 'none',
            }} />
            <Box sx={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
              background: 'linear-gradient(to left, #fafaf8, transparent)',
              zIndex: 10, pointerEvents: 'none',
            }} />
          </>
        )}

        <Box sx={{
          display: 'flex', gap: 3, px: 5, pb: 4,
          width: shouldAnimate ? 'max-content' : '100%',
          overflowX: shouldAnimate ? 'visible' : 'auto',
          justifyContent: shouldAnimate ? 'flex-start' : 'center',
          ...(shouldAnimate && {
            animationName: 'marquee',
            animationDuration: '35s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          })
        }}>
          {(shouldAnimate ? [...displayResults, ...displayResults] : displayResults).map((student: unknown, i: number) => (
            <StudentCard key={`${(student as Student).id}-${i}`} student={student as Student} onSelect={(s) => {
              setSelectedStudent(s); setDialogOpen(true); setIsPlayingVideo(false)
            }} />
          ))}
        </Box>
      </Box>

      {/* Modal */}
      <Dialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setIsPlayingVideo(false) }}
        maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: '24px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.18)' } }}
      >
        {selectedStudent && (
          <Box sx={{ position: 'relative' }}>
            <IconButton onClick={() => { setDialogOpen(false); setIsPlayingVideo(false) }} size="small" sx={{
              position: 'absolute', top: 14, right: 14, zIndex: 10,
              color: '#374151', bgcolor: 'rgba(255,255,255,0.92)',
              '&:hover': { bgcolor: '#fff' },
              borderRadius: '10px', p: 0.7,
            }}>
              <CloseIcon fontSize="small" />
            </IconButton>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: selectedStudent.youtubeLink ? '1fr 1.4fr' : '1fr' } }}>
              {/* Left: portrait 9:16 video panel — only shown when there is a youtube link */}
              {selectedStudent.youtubeLink && (
                <Box sx={{ bgcolor: '#0a0a0a', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ width: '100%', paddingTop: '177.78%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                    {selectedStudent.youtubeLink && isPlayingVideo && (
                      <Box sx={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        zIndex: 2,
                        opacity: 1,
                        pointerEvents: 'auto',
                      }}>
                        <iframe
                          src={`${formatYoutubeLink(selectedStudent.youtubeLink)}?autoplay=1&rel=0`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        />
                      </Box>
                    )}

                    <Box sx={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      zIndex: 1,
                      opacity: isPlayingVideo ? 0 : 1,
                      pointerEvents: isPlayingVideo ? 'none' : 'auto',
                      transition: 'opacity 0.3s ease',
                    }}>
                      <Box component="img" src={selectedStudent.image}
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {selectedStudent.youtubeLink && (
                        <Box onClick={(e) => { e.stopPropagation(); setIsPlayingVideo(true) }} sx={{
                          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2,
                          bgcolor: 'rgba(0,0,0,0.35)', cursor: 'pointer',
                          transition: 'background 0.3s',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.5)', '& .play-btn': { transform: 'scale(1.1)' } },
                        }}>
                          <Box className="play-btn" sx={{
                            width: 64, height: 64, borderRadius: '50%',
                            bgcolor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'transform 0.3s',
                            boxShadow: '0 8px 32px rgba(239,68,68,0.5)',
                          }}>
                            <PlayArrowIcon sx={{ color: '#fff', fontSize: 40 }} />
                          </Box>
                          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '1rem', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.5px' }}>
                            Watch Story
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Right: Details */}
              <Box sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
                <Chip
                  icon={<StarIcon sx={{ fontSize: '13px !important', color: '#c47a3a !important' }} />}
                  label={selectedStudent.exam}
                  size="small"
                  sx={{
                    alignSelf: 'flex-start', mb: 2,
                    bgcolor: 'rgba(196,122,58,0.08)', color: '#c47a3a',
                    border: '1px solid rgba(196,122,58,0.15)',
                    fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
                    fontSize: 12, borderRadius: '8px',
                  }}
                />

                <Typography sx={{
                  fontFamily: '"Fraunces", serif', fontWeight: 800,
                  fontSize: { xs: '1.6rem', md: '1.9rem' }, color: '#0a2540',
                  mb: 0.5, lineHeight: 1.1, letterSpacing: '-0.02em',
                }}>
                  {selectedStudent.name}
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: '#6b7280', mb: 3, fontFamily: '"DM Sans", sans-serif' }}>
                  {selectedStudent.achievement}
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3.5 }}>
                  <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mb: 0.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: '"DM Sans", sans-serif' }}>
                      Score
                    </Typography>
                    <Typography sx={{ fontFamily: '"Fraunces", serif', fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                      {selectedStudent.scoreLabel}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mb: 0.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: '"DM Sans", sans-serif' }}>
                      Program
                    </Typography>
                    <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#0a2540', lineHeight: 1.3 }}>
                      {selectedStudent.course}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ flex: 1, borderLeft: '3px solid #c47a3a', pl: 2.5 }}>
                  <Typography sx={{
                    fontSize: '0.95rem', color: '#374151',
                    lineHeight: 1.75, fontStyle: 'italic',
                    fontFamily: '"DM Sans", sans-serif',
                  }}>
                    "{selectedStudent.bio}"
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  )
}