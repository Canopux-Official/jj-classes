import mongoose from "mongoose";
import connectDB from "./src/config/db";
import dotenv from "dotenv";

dotenv.config();

// Import Models
import Admin from "./src/models/Admin";
import Student from "./src/models/Student";
import Subject from "./src/models/Subject";
import Material from "./src/models/Material";
import Enquiry from "./src/models/Enquiry";
import Otp from "./src/models/Otp";

const seedDatabase = async () => {
  try {
    console.log("🌱 Connecting to Database...");
    await connectDB();

    console.log("🧹 Clearing existing data...");
    await Promise.all([
      Admin.deleteMany({}),
      Student.deleteMany({}),
      Subject.deleteMany({}),
      Material.deleteMany({}),
      Enquiry.deleteMany({}),
      Otp.deleteMany({}),
    ]);

    // ----------------------------------------------------
    // 1. SUBJECTS
    // ----------------------------------------------------
    console.log("📝 Creating Subjects...");
    const subjects = await Subject.create([
      { name: "Physics", stream: "Science", isActive: true },
      { name: "Chemistry", stream: "Science", isActive: true },
      { name: "Mathematics", stream: "Science", isActive: true },
      { name: "Biology", stream: "Science", isActive: true },
      { name: "English", stream: "General", isActive: true },
      { name: "Computer Science", stream: "Science", isActive: true },
    ]);

    // IDs for linking
    const physId = subjects[0]._id;
    const chemId = subjects[1]._id;
    const mathId = subjects[2]._id;
    const bioId = subjects[3]._id;
    const engId = subjects[4]._id;

    // ----------------------------------------------------
    // 2. ADMINS
    // ----------------------------------------------------
    console.log("🛡️ Creating Admins...");
    // Captured in 'admins' variable to use IDs later
    const admins = await Admin.create([
      {
        name: "JJ Sir",
        phoneNumber: "9999999999",
        role: "superadmin",
        email: "demo77.off@gmail.com",
        // email: "dummyforwork22898@gmail.com",
        password: "adminpassword123", // Plain text as requested
      },
      {
        name: "Rahul Manager",
        phoneNumber: "8888888888",
        role: "admin",
        email: "rahul@example.com",
        password: "managerpassword123",
      },
      {
        name: "Suman Counselor",
        phoneNumber: "7777777777",
        role: "admin",
        email: "suman@example.com",
        password: "counselorpass",
      },
    ] as any);

    // ----------------------------------------------------
    // 3. STUDENTS (10 Entries)
    // ----------------------------------------------------
    console.log("🎓 Creating Students...");
    // Captured in 'students' variable to use IDs later
    const students = await Student.create([
      {
        name: "Aarav Sharma",
        dob: new Date("2006-05-15"),
        phoneNumber: "9876543210",
        parentPhoneNumber: "9876500000",
        email: "canopus.incglobe@gmail.com",
        currentClass: "12",
        stream: "Science",
        targetExams: ["JEE"],
        enrolledSubjects: [physId, mathId, chemId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Sneha Gupta",
        dob: new Date("2007-08-20"),
        phoneNumber: "9123456789",
        email: "sneha@student.com",
        currentClass: "11",
        stream: "Science",
        targetExams: ["NEET"],
        enrolledSubjects: [physId, bioId, chemId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Rohan Das",
        dob: new Date("2008-01-10"),
        phoneNumber: "9000012345",
        email: "rohan@student.com",
        currentClass: "10",
        stream: "N/A",
        targetExams: ["Boards"],
        enrolledSubjects: [mathId, physId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Ishita Patel",
        dob: new Date("2006-11-05"),
        phoneNumber: "9988776655",
        email: "ishita@student.com",
        currentClass: "12",
        stream: "Science",
        targetExams: ["Boards"],
        enrolledSubjects: [bioId, chemId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Vikram Singh",
        dob: new Date("2005-03-25"),
        phoneNumber: "8877665544",
        email: "vikram@student.com",
        currentClass: "12",
        stream: "Science",
        targetExams: ["JEE", "Boards"],
        enrolledSubjects: [mathId, physId, chemId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Ananya Roy",
        dob: new Date("2009-07-12"),
        phoneNumber: "7766554433",
        email: "ananya@student.com",
        currentClass: "9",
        stream: "N/A",
        targetExams: ["Boards"],
        enrolledSubjects: [mathId, engId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Kabir Mehta",
        dob: new Date("2007-02-14"),
        phoneNumber: "6655443322",
        email: "kabir@student.com",
        currentClass: "11",
        stream: "Science",
        targetExams: ["JEE"],
        enrolledSubjects: [mathId, physId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Pooja Verma",
        dob: new Date("2007-09-30"),
        phoneNumber: "5544332211",
        email: "pooja@student.com",
        currentClass: "11",
        stream: "Science",
        targetExams: ["NEET"],
        enrolledSubjects: [bioId, chemId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Dev Kumar",
        dob: new Date("2008-12-01"),
        phoneNumber: "4433221100",
        email: "dev@student.com",
        currentClass: "10",
        stream: "N/A",
        targetExams: ["Boards", "Other"],
        enrolledSubjects: [mathId, physId, chemId],
        academicSession: "2024-2025",
        password: "password123",
      },
      {
        name: "Meera Reddy",
        dob: new Date("2006-06-18"),
        phoneNumber: "3322110099",
        email: "meera@student.com",
        currentClass: "12",
        stream: "Science",
        targetExams: ["JEE"],
        enrolledSubjects: [mathId, chemId],
        academicSession: "2024-2025",
        password: "password123",
      },
    ] as any);

    // ----------------------------------------------------
    // 4. MATERIALS (10 Entries)
    // ----------------------------------------------------
    // console.log("📚 Creating Materials...");
    // await Material.create([
    //   {
    //     heading: "Electrostatics - Chapter 1",
    //     title: "Coulomb's Law Notes",
    //     description: "Core concepts of charge interaction.",
    //     driveLink: "https://drive.google.com/sample1",
    //     fileName: "electrostatics.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 1024,
    //     category: "Notes",
    //     subject: "Physics",
    //     class: "Class 12",
    //     stream: "Science",
    //     uploadedBy: "JJ Sir",
    //     status: "Completed",
    //     visibility: "Public",
    //   },
    //   {
    //     heading: "Integration",
    //     title: "Definite Integration DPP",
    //     driveLink: "https://drive.google.com/sample2",
    //     fileName: "integration_dpp.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 2048,
    //     category: "Assignment",
    //     subject: "Mathematics",
    //     class: "Class 12",
    //     stream: "Science",
    //     uploadedBy: "JJ Sir",
    //     status: "Pending",
    //     visibility: "Private",
    //     priority: "High",
    //   },
    //   {
    //     heading: "Thermodynamics",
    //     title: "ThermoPY Full Test",
    //     driveLink: "https://drive.google.com/sample3",
    //     fileName: "thermo_test.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 500,
    //     category: "Test Paper",
    //     subject: "Physics",
    //     class: "Class 11",
    //     stream: "Science",
    //     uploadedBy: "Rahul Manager",
    //     visibility: "Restricted",
    //   },
    //   {
    //     heading: "Organic Chemistry",
    //     title: "GOC Revision Notes",
    //     driveLink: "https://drive.google.com/sample4",
    //     fileName: "goc_notes.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 3000,
    //     category: "Notes",
    //     subject: "Chemistry",
    //     class: "Class 11",
    //     stream: "Science",
    //     uploadedBy: "JJ Sir",
    //     status: "Completed",
    //     visibility: "Public",
    //   },
    //   {
    //     heading: "Trigonometry",
    //     title: "Trigonometry Basics",
    //     driveLink: "https://drive.google.com/sample5",
    //     fileName: "trig_basics.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 1500,
    //     category: "Notes",
    //     subject: "Mathematics",
    //     class: "Class 10",
    //     stream: "N/A",
    //     uploadedBy: "JJ Sir",
    //     visibility: "Public",
    //   },
    //   {
    //     heading: "Genetics",
    //     title: "Mendelian Genetics",
    //     driveLink: "https://drive.google.com/sample6",
    //     fileName: "genetics.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 4000,
    //     category: "Notes",
    //     subject: "Biology",
    //     class: "Class 12",
    //     stream: "Science",
    //     uploadedBy: "JJ Sir",
    //     visibility: "Public",
    //   },
    //   {
    //     heading: "Kinematics",
    //     title: "Projectile Motion Worksheet",
    //     driveLink: "https://drive.google.com/sample7",
    //     fileName: "projectile.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 1200,
    //     category: "Assignment",
    //     subject: "Physics",
    //     class: "Class 11",
    //     stream: "Science",
    //     uploadedBy: "Rahul Manager",
    //     status: "Pending",
    //     priority: "Medium",
    //   },
    //   {
    //     heading: "Algebra",
    //     title: "Quadratic Equations Test",
    //     driveLink: "https://drive.google.com/sample8",
    //     fileName: "quad_test.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 800,
    //     category: "Test Paper",
    //     subject: "Mathematics",
    //     class: "Class 10",
    //     stream: "N/A",
    //     uploadedBy: "JJ Sir",
    //     visibility: "Restricted",
    //   },
    //   {
    //     heading: "Optics",
    //     title: "Ray Optics Formulas",
    //     driveLink: "https://drive.google.com/sample9",
    //     fileName: "optics_formula.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 600,
    //     category: "Notes",
    //     subject: "Physics",
    //     class: "Class 12",
    //     stream: "Science",
    //     uploadedBy: "JJ Sir",
    //     visibility: "Public",
    //   },
    //   {
    //     heading: "Solutions",
    //     title: "Solutions Chapter Notes",
    //     driveLink: "https://drive.google.com/sample10",
    //     fileName: "solutions.pdf",
    //     fileType: "application/pdf",
    //     fileSize: 2500,
    //     category: "Notes",
    //     subject: "Chemistry",
    //     class: "Class 12",
    //     stream: "Science",
    //     uploadedBy: "JJ Sir",
    //     visibility: "Public",
    //   },
    // ] as any);

    // ----------------------------------------------------
    // 5. ENQUIRIES (10 Entries)
    // ----------------------------------------------------
    console.log("📞 Creating Enquiries...");
    await Enquiry.create([
      {
        studentName: "Amit Kumar",
        phoneNumber: "9998887770",
        targetClass: "Class 11",
        interestedExams: ["JEE"],
        message: "When does the new batch start?",
        status: "Pending",
      },
      {
        studentName: "Priya Singh",
        phoneNumber: "8887776660",
        targetClass: "Class 12",
        interestedExams: ["NEET"],
        message: "Fee structure please.",
        status: "Contacted",
      },
      {
        studentName: "Rahul Verma",
        phoneNumber: "7776665550",
        targetClass: "Class 10",
        interestedExams: ["Boards"],
        message: "Do you have online classes?",
        status: "Rejected",
      },
      {
        studentName: "Sonia Gill",
        phoneNumber: "6665554440",
        targetClass: "Class 9",
        interestedExams: ["Boards"],
        message: "I want to join math tuition.",
        status: "Converted",
      },
      {
        studentName: "Karan Johar",
        phoneNumber: "5554443330",
        targetClass: "Class 12",
        interestedExams: ["JEE"],
        message: "Is there a scholarship test?",
        status: "Pending",
      },
      {
        studentName: "Simran Kaur",
        phoneNumber: "4443332220",
        targetClass: "Class 11",
        interestedExams: ["NEET"],
        message: "Need details on Biology faculty.",
        status: "Contacted",
      },
      {
        studentName: "Arjun Rampal",
        phoneNumber: "3332221110",
        targetClass: "Class 11",
        interestedExams: ["JEE"],
        message: "What is the batch timing?",
        status: "Pending",
      },
      {
        studentName: "Nisha Yadav",
        phoneNumber: "2221110000",
        targetClass: "Class 10",
        interestedExams: ["Boards"],
        message: "Fees for all subjects?",
        status: "Pending",
      },
      {
        studentName: "Varun Dhawan",
        phoneNumber: "1110009990",
        targetClass: "Class 12",
        interestedExams: ["JEE"],
        message: "I want to join the crash course.",
        status: "Contacted",
      },
      {
        studentName: "Alia Bhatt",
        phoneNumber: "0009998880",
        targetClass: "Class 11",
        interestedExams: ["NEET"],
        message: "Is demo class available?",
        status: "Converted",
      },
    ] as any);

    // ----------------------------------------------------
    // 6. OTPs (Testing)
    // ----------------------------------------------------
    console.log("🔢 Creating OTPs...");
    
    // We attach OTPs to real users created above so the refs are valid
    const aarav = students[0]; // Aarav Sharma (Student)
    const jjSir = admins[0];   // JJ Sir (Admin)

    // await Otp.create([
    //   {
    //     email: aarav.email, // "aarav@student.com"
    //     otp: "1234",
    //     attempts: 0,
    //     userId: aarav._id,
    //     onModel: "Student", // Must match Schema enum
    //   },
    //   {
    //     email: jjSir.email, // "jj@example.com"
    //     otp: "9999",
    //     attempts: 0,
    //     userId: jjSir._id,
    //     onModel: "Admin", // Must match Schema enum
    //   }
    // ]);

    console.log("✅ Database Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();