import mongoose from 'mongoose';
// Adjust the import path based on where your LandingPage.ts is located
import LandingPage from './src/models/LandingPage';

// Replace with your actual MongoDB connection string
const MONGO_URI = 'mongodb+srv://canopusincglobe_db_user:rc8AduHpcY8FOksx@cluster0.5keoh3k.mongodb.net/JJ-Classes?retryWrites=true&w=majority';

const seedDatabase = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected successfully.');

        // Clear existing data to avoid duplicates
        console.log('Clearing existing landing page data...');
        await LandingPage.deleteMany({});

        const seedData = {
            hero: {
                heading: 'Transform Your Academic Excellence with JJ Classes',
                subheading: 'A premiere coaching institute in Koraput for CBSE Class 9-12, NEET (UG), and JEE (Main+Advanced) preparation. We provide affordable, high-quality coaching to help you achieve your dreams.',
                image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80', // Placeholder hero image
                stats: [
                    { target: 1000, suffix: '+', divisor: 1, label: 'Students Mentored' },
                    { target: 100, suffix: '%', divisor: 1, label: 'Commitment' },
                    { target: 50, suffix: '+', divisor: 1, label: 'Top Ranks Achieved' }
                ]
            },
            courses: [
                {
                    courseId: 'cbse-9-10',
                    title: 'CBSE Class 9 & 10 (Foundation)',
                    description: 'A strong foundation for board exams and future competitive exams like NTSE and IIT Foundation.',
                    level: 'Foundation',
                    students: 350,
                    duration: '1-2 Years',
                    features: ['Personalized study plans', 'Regular mock tests', 'Doubt clearing sessions'],
                    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.08) 100%)'
                },
                {
                    courseId: 'cbse-11-12',
                    title: 'CBSE Class 11 & 12 (Science)',
                    description: 'Comprehensive coverage of the CBSE syllabus ensuring students have a solid understanding of all core concepts.',
                    level: 'Intermediate',
                    students: 420,
                    duration: '2 Years',
                    features: ['Standardized curriculum', 'Detailed progress reports', 'Focus on emotional well-being'],
                    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(52,211,153,0.08) 100%)'
                },
                {
                    courseId: 'jee-neet',
                    title: 'JEE (Main & Adv) & NEET',
                    description: 'Rigorous work ethic and competitive environment to face the challenges of India\'s toughest entrance exams.',
                    level: 'Advanced',
                    students: 280,
                    duration: '1-2 Years',
                    features: ['Hybrid teaching model', 'Simulated exam conditions', 'Expert problem-solving techniques'],
                    gradient: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(251,146,60,0.08) 100%)'
                }
            ],
            faculty: [
                // Note: Placeholder data since specific faculty names weren't in the prompt. 
                // Update these with your actual teachers!
                {
                    name: 'Dr. A. Sharma',
                    title: 'Senior Physics Faculty',
                    subject: 'Physics',
                    experience: '12+',
                    qualification: 'Ph.D. in Physics',
                    specialty: 'JEE Advanced Mechanics',
                    initials: 'AS',
                    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80',
                    bio: 'Dr. Sharma has been instrumental in guiding students through the complexities of Physics, utilizing innovative pedagogy and continuous feedback loops.'
                },
                {
                    name: 'P. Mohanty',
                    title: 'Head of Biology',
                    subject: 'Biology',
                    experience: '8+',
                    qualification: 'M.Sc. Zoology',
                    specialty: 'NEET Botany & Zoology',
                    initials: 'PM',
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
                    bio: 'With a deep focus on personalized coaching, Prof. Mohanty ensures every medical aspirant understands the core concepts necessary for top NEET ranks.'
                }
            ],
            facultyStats: [
                { value: '15+', label: 'Expert Educators' },
                { value: '10+', label: 'Years Avg Experience' },
                { value: '24/7', label: 'Doubt Support' },
                { value: '100%', label: 'Dedicated Mentorship' }
            ],
            results: [
                // Note: Placeholder results. Update with actual JJ Classes success stories!
                {
                    name: 'Rahul D.',
                    score: 'AIR 450',
                    scoreLabel: 'JEE Adv Rank',
                    exam: "JEE Adv. '25",
                    course: 'JEE Main+Advanced',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
                    bio: 'Consistent improvement and regular mock tests at JJ Classes helped Rahul identify and overcome his weak areas.',
                    achievement: 'Admitted to IIT Kharagpur',
                    youtubeLink: ''
                }
            ],
            faqs: [
                {
                    q: 'What is JJ Classes Koraput known for?',
                    a: 'At JJ Classes Koraput, we are renowned for our exceptional coaching services, specializing in CBSE class 9 to 12 and NEET/JEE preparation. Our track record of producing successful students speaks for our commitment to academic excellence.'
                },
                {
                    q: 'Do you provide online classes for CBSE and competitive exams?',
                    a: 'Yes, we offer both offline and online classes, giving you the flexibility to choose a learning mode that suits your convenience and safety. Our online classes are interactive and designed to provide an engaging learning experience.'
                },
                {
                    q: 'How does JJ Classes Koraput prepare students for competitive exams like NEET and JEE?',
                    a: 'Our NEET and JEE coaching programs are meticulously designed, covering all essential topics and providing rigorous practice through mock tests. We focus on concept clarity and problem-solving skills to ensure you excel in these highly competitive exams.'
                },
                {
                    q: 'Can I expect regular updates on my progress and performance?',
                    a: 'Absolutely! We believe in transparent communication with both students and parents. You will receive regular progress reports, performance analysis, and feedback to help you track your growth.'
                },
                {
                    q: 'Do you offer scholarships or financial aid to deserving students?',
                    a: 'Yes, we have scholarship programs and financial aid options for deserving students. We believe that financial constraints should not hinder anyone’s access to quality education, and we strive to make it accessible to all.'
                }
            ],
            footer: {
                phones: ['+91 70776 17041'],
                email: 'contact@jjclasseskoraput.com', // Replace if you have a specific official email
                address: 'JJ Classes, Koraput, Odisha',
                socialLinks: {
                    facebook: 'https://facebook.com/', // Replace with your actual FB link
                    instagram: 'https://instagram.com/', // Replace with your actual IG link
                    linkedin: '#',
                    twitter: '#'
                }
            }
        };

        console.log('Seeding new data...');
        const pageContent = new LandingPage(seedData);
        await pageContent.save();

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Execute the seed function
seedDatabase();