"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiBook, FiDollarSign, FiCalendar, 
  FiMail, FiPhone, FiMapPin, FiEdit, 
  FiSave, FiAward, FiTrendingUp, FiClock,
  FiUsers, FiGrid, FiBarChart2, FiPlus,
  FiPlayCircle, FiShoppingCart, FiEye,
  FiCheckCircle
} from "react-icons/fi";
import { FaGraduationCap, FaChalkboardTeacher, FaUserTie, FaFire } from "react-icons/fa";
import Link from "next/link";

// Enum for user types
const UserType = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ORGANIZER: 'organizer'
};

// Static data for demonstration
const STATIC_DATA = {
  [UserType.STUDENT]: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Passionate about learning new technologies and building amazing projects. Currently focusing on full-stack development.",
    enrollmentDate: "2024-01-15",
    level: "Intermediate",
    totalCourses: 8,
    completedCourses: 5,
    enrolledCourses: [
      {
        id: 1,
        title: "Advanced React Masterclass",
        instructor: "Sarah Chen",
        progress: 75,
        category: "Web Development",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
        rating: 4.8,
        enrolledDate: "2024-02-10",
        nextLesson: "State Management with Redux"
      },
      {
        id: 2,
        title: "Node.js Backend Development",
        instructor: "Michael Rodriguez",
        progress: 40,
        category: "Backend",
        thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w-400",
        rating: 4.6,
        enrolledDate: "2024-01-20",
        nextLesson: "Building REST APIs"
      },
      {
        id: 3,
        title: "UI/UX Design Fundamentals",
        instructor: "Emma Wilson",
        progress: 90,
        category: "Design",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
        rating: 4.9,
        enrolledDate: "2024-01-05",
        nextLesson: "Prototyping with Figma"
      }
    ],
    achievements: [
      { title: "Fast Learner", icon: "🚀", description: "Completed 5 courses in 3 months" },
      { title: "Consistent Learner", icon: "🔥", description: "30-day learning streak" },
      { title: "Top Performer", icon: "🏆", description: "Top 10% in React course" }
    ],
    stats: {
      totalHours: 156,
      avgScore: 92,
      streakDays: 7,
      certificates: 3
    }
  },
  [UserType.TEACHER]: {
    name: "Dr. Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, USA",
    bio: "Senior Software Engineer with 10+ years of experience. Passionate about teaching and mentoring the next generation of developers. I create courses to share my knowledge and help others grow.",
    joinDate: "2022-03-10",
    specialization: "Frontend Development & React",
    totalStudents: 1250,
    rating: 4.9,
    coursesTeaching: [
      {
        id: 1,
        title: "Advanced React Masterclass",
        enrolledStudents: 450,
        rating: 4.8,
        category: "Web Development",
        status: "Active",
        lastUpdated: "2024-02-28",
        price: "$89.99",
        revenue: "$40,500"
      },
      {
        id: 2,
        title: "React Native Mobile Development",
        enrolledStudents: 320,
        rating: 4.7,
        category: "Mobile",
        status: "Active",
        lastUpdated: "2024-02-20",
        price: "$79.99",
        revenue: "$25,600"
      },
      {
        id: 3,
        title: "State Management Patterns",
        enrolledStudents: 280,
        rating: 4.9,
        category: "Web Development",
        status: "Upcoming",
        lastUpdated: "2024-03-01",
        price: "$69.99",
        revenue: "$0"
      },
      {
        id: 4,
        title: "Next.js 14 Complete Guide",
        enrolledStudents: 0,
        rating: 0,
        category: "Web Development",
        status: "Draft",
        lastUpdated: "2024-03-05",
        price: "$99.99",
        revenue: "$0"
      }
    ],
    upcomingSessions: [
      { id: 1, title: "Live Q&A: React 18 Features", date: "2024-03-15", time: "2:00 PM" },
      { id: 2, title: "Workshop: Next.js 14", date: "2024-03-20", time: "3:00 PM" }
    ],
    stats: {
      totalCourses: 6,
      totalReviews: 890,
      completionRate: 94,
      hoursTaught: 520,
      totalRevenue: "$66,100",
      monthlyEarnings: "$5,200"
    },
    canAddCourses: true, // TEACHERS CAN ADD COURSES
    addCoursePermission: "Full access to create and publish courses"
  },
  [UserType.ORGANIZER]: {
    name: "TechEd Academy",
    email: "contact@techedacademy.com",
    phone: "+1 (555) 246-8135",
    location: "Austin, Texas",
    bio: "Leading online education platform specializing in tech courses. We bring industry experts to teach practical skills. As an organizer, I manage courses and help instructors create amazing learning experiences.",
    established: "2020",
    category: "Education Technology",
    totalCourses: 42,
    activeCourses: 28,
    totalStudents: 12500,
    addedCourses: [
      {
        id: 1,
        title: "Full Stack Web Development Bootcamp",
        instructor: "James Wilson",
        studentsEnrolled: 1250,
        revenue: "$85,000",
        status: "Active",
        launchDate: "2024-01-10",
        category: "Web Development"
      },
      {
        id: 2,
        title: "Data Science with Python",
        instructor: "Dr. Lisa Wang",
        studentsEnrolled: 890,
        revenue: "$62,300",
        status: "Active",
        launchDate: "2024-02-01",
        category: "Data Science"
      },
      {
        id: 3,
        title: "Mobile App Development with Flutter",
        instructor: "Alex Thompson",
        studentsEnrolled: 720,
        revenue: "$50,400",
        status: "Active",
        launchDate: "2024-01-25",
        category: "Mobile Development"
      },
      {
        id: 4,
        title: "Cybersecurity Fundamentals",
        instructor: "Mark Johnson",
        studentsEnrolled: 0,
        revenue: "$0",
        status: "Draft",
        launchDate: "2024-03-15",
        category: "Security"
      }
    ],
    stats: {
      totalRevenue: "$1,250,000",
      monthlyGrowth: 15,
      studentSatisfaction: 96,
      instructorCount: 18,
      platformEarnings: "$375,000",
      activeInstructors: 12
    },
    recentActivities: [
      { id: 1, action: "Course Published", description: "Advanced React Masterclass", time: "2 hours ago" },
      { id: 2, action: "Instructor Hired", description: "Dr. Sarah Chen joined", time: "1 day ago" },
      { id: 3, action: "Revenue Milestone", description: "Reached $1.25M total", time: "2 days ago" },
      { id: 4, action: "Course Approved", description: "AI Fundamentals by Dr. Miller", time: "3 hours ago" }
    ],
    canAddCourses: true, // ORGANIZERS CAN ADD COURSES
    addCoursePermission: "Full access to create, manage, and publish courses"
  }
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userType, setUserType] = useState(UserType.STUDENT);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Initialize edit data when user type changes
  useEffect(() => {
    setEditData(STATIC_DATA[userType]);
  }, [userType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userData = STATIC_DATA[userType];
  const isStudent = userType === UserType.STUDENT;
  const isTeacher = userType === UserType.TEACHER;
  const isOrganizer = userType === UserType.ORGANIZER;
  const canAddCourses = userData.canAddCourses || false;

  const handleSave = () => {
    // TODO: Save to database
    console.log("Saving data:", editData);
    setIsEditing(false);
    // In future: await updateUserProfile(editData);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setActiveTab("overview");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-4 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* User Type Selector */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Switch User Role (Demo Only)
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { type: UserType.STUDENT, label: "Student", icon: <FaGraduationCap className="w-5 h-5" />, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
                { type: UserType.TEACHER, label: "Teacher", icon: <FaChalkboardTeacher className="w-5 h-5" />, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
                { type: UserType.ORGANIZER, label: "Organizer", icon: <FaUserTie className="w-5 h-5" />, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" }
              ].map(({ type, label, icon, color }) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUserTypeChange(type)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${color} ${
                    userType === type ? "ring-2 ring-offset-2 ring-opacity-50 ring-current" : ""
                  }`}
                >
                  {icon}
                  <span className="font-medium">{label}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Add Course Permission Notice */}
            {(isTeacher || isOrganizer) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800"
              >
                <div className="flex items-start gap-3">
                  <FiPlus className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-300">
                      Course Creation Permissions
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      {userData.addCoursePermission}
                    </p>
                    <Link
                      href="/courses/add"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <FiPlus className="w-4 h-4" />
                      Create New Course
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className={`bg-gradient-to-r ${isStudent ? 'from-blue-500 via-purple-500 to-pink-500' : isTeacher ? 'from-purple-500 to-pink-500' : 'from-green-500 to-emerald-500'} rounded-3xl shadow-2xl overflow-hidden`}>
            <div className="p-8 md:p-12 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/5"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg border-4 border-white/30 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-4xl font-bold text-blue-600">
                      {userData.name.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                    {isStudent ? "👨‍🎓" : isTeacher ? "👨‍🏫" : "👔"}
                  </div>
                </motion.div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div variants={itemVariants}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {userData.name}
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-white/90 mb-4">
                          <span className="flex items-center gap-2">
                            <FiMail className="w-4 h-4" />
                            {userData.email}
                          </span>
                          <span className="flex items-center gap-2">
                            <FiMapPin className="w-4 h-4" />
                            {userData.location}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        {/* Add Course Button for Teachers & Organizers */}
                        {(isTeacher || isOrganizer) && (
                          <Link href="/courses/add">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 bg-white/20 backdrop-blur-lg rounded-xl text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
                            >
                              <FiPlus className="w-5 h-5" />
                              Add Course
                            </motion.button>
                          </Link>
                        )}
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditing(!isEditing)}
                          className="px-6 py-3 bg-white/20 backdrop-blur-lg rounded-xl text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
                        >
                          {isEditing ? <FiSave className="w-4 h-4" /> : <FiEdit className="w-4 h-4" />}
                          {isEditing ? "Save Changes" : "Edit Profile"}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.p variants={itemVariants} className="text-white/80 mb-6 max-w-2xl">
                    {userData.bio}
                  </motion.p>

                  {/* Stats */}
                  <motion.div 
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {Object.entries(userData.stats || {}).map(([key, value]) => (
                      <motion.div
                        key={key}
                        variants={itemVariants}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center"
                      >
                        <p className="text-2xl font-bold text-white">{value}</p>
                        <p className="text-sm text-white/70 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex overflow-x-auto scrollbar-hide space-x-1 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg">
            {["overview", "courses", "activity", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                {/* Student: Enrolled Courses */}
                {isStudent && userData.enrolledCourses && (
                  <motion.div variants={itemVariants}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                          <FiBook className="w-6 h-6 text-blue-500" />
                          Enrolled Courses
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {userData.enrolledCourses.length} courses
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userData.enrolledCourses.map((course) => (
                          <motion.div
                            key={course.id}
                            whileHover={{ y: -5 }}
                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 hover:shadow-xl transition-all"
                          >
                            <div className="h-40 rounded-lg mb-4 bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden">
                              <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                                📚
                              </div>
                            </div>
                            <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              by {course.instructor} • {course.category}
                            </p>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.progress}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                                  />
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                Next: {course.nextLesson}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Teacher: Teaching Courses */}
                {isTeacher && userData.coursesTeaching && (
                  <>
                    {/* Teaching Courses */}
                    <motion.div variants={itemVariants}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <FaChalkboardTeacher className="w-8 h-8 text-purple-500" />
                            <div>
                              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                My Teaching Courses
                              </h2>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Courses I've created and teach
                              </p>
                            </div>
                          </div>
                          <Link
                            href="/courses/add"
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center gap-2"
                          >
                            <FiPlus className="w-4 h-4" />
                            Add Course
                          </Link>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left text-gray-500 dark:text-gray-400 border-b">
                                <th className="pb-3">Course</th>
                                <th className="pb-3">Students</th>
                                <th className="pb-3">Rating</th>
                                <th className="pb-3">Price</th>
                                <th className="pb-3">Revenue</th>
                                <th className="pb-3">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userData.coursesTeaching.map((course) => (
                                <tr key={course.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <td className="py-4">
                                    <div className="font-medium">{course.title}</div>
                                    <div className="text-sm text-gray-500">{course.category}</div>
                                  </td>
                                  <td className="py-4">
                                    <div className="flex items-center gap-2">
                                      <FiUsers className="w-4 h-4" />
                                      {course.enrolledStudents}
                                    </div>
                                  </td>
                                  <td className="py-4">
                                    <div className="flex items-center gap-1">
                                      <span className="text-yellow-500">★</span>
                                      <span>{course.rating || "No ratings"}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 font-medium">
                                    {course.price}
                                  </td>
                                  <td className="py-4">
                                    <span className={`font-medium ${course.revenue === "$0" ? "text-gray-500" : "text-green-600"}`}>
                                      {course.revenue}
                                    </span>
                                  </td>
                                  <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                      course.status === "Active" 
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : course.status === "Upcoming"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                                    }`}>
                                      {course.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>

                    {/* Teacher Course Creation Stats */}
                    <motion.div variants={itemVariants}>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg p-6 border border-purple-200 dark:border-purple-800">
                        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-3">
                          <FiPlus className="w-6 h-6" />
                          Course Creation Dashboard
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <p className="text-sm text-purple-600 dark:text-purple-400">Total Courses</p>
                            <p className="text-2xl font-bold">{userData.stats.totalCourses}</p>
                          </div>
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <p className="text-sm text-purple-600 dark:text-purple-400">Total Revenue</p>
                            <p className="text-2xl font-bold">{userData.stats.totalRevenue}</p>
                          </div>
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <p className="text-sm text-purple-600 dark:text-purple-400">Monthly Earnings</p>
                            <p className="text-2xl font-bold">{userData.stats.monthlyEarnings}</p>
                          </div>
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <p className="text-sm text-purple-600 dark:text-purple-400">Completion Rate</p>
                            <p className="text-2xl font-bold">{userData.stats.completionRate}%</p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Link
                            href="/courses/add"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium"
                          >
                            <FiPlus className="w-5 h-5" />
                            Create New Course
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Organizer: Added Courses */}
                {isOrganizer && userData.addedCourses && (
                  <>
                    {/* Added Courses */}
                    <motion.div variants={itemVariants}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <FiGrid className="w-8 h-8 text-green-500" />
                            <div>
                              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Platform Courses
                              </h2>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Courses added to the platform
                              </p>
                            </div>
                          </div>
                          <Link
                            href="/courses/add"
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center gap-2"
                          >
                            <FiPlus className="w-4 h-4" />
                            Add Course
                          </Link>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {userData.addedCourses.map((course) => (
                            <motion.div
                              key={course.id}
                              whileHover={{ scale: 1.02 }}
                              className="border rounded-xl p-5 hover:shadow-lg transition-all"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-bold text-lg">{course.title}</h3>
                                  <p className="text-sm text-gray-500">by {course.instructor}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                  course.status === "Active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                                }`}>
                                  {course.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500">Students</p>
                                  <p className="font-semibold">{course.studentsEnrolled.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Revenue</p>
                                  <p className="font-semibold text-green-600">{course.revenue}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Category</p>
                                  <p className="font-semibold">{course.category}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Launched</p>
                                  <p className="font-semibold">{course.launchDate}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Organizer Platform Stats */}
                    <motion.div variants={itemVariants}>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg p-6 border border-green-200 dark:border-green-800">
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-3">
                          <FaUserTie className="w-6 h-6" />
                          Platform Management Dashboard
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <p className="text-sm text-green-600 dark:text-green-400">Total Courses</p>
                            <p className="text-2xl font-bold">{userData.stats.totalCourses}</p>
                          </div>
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <p className="text-sm text-green-600 dark:text-green-400">Total Revenue</p>
                            <p className="text-2xl font-bold">{userData.stats.totalRevenue}</p>
                          </div>
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <p className="text-sm text-green-600 dark:text-green-400">Platform Earnings</p>
                            <p className="text-2xl font-bold">{userData.stats.platformEarnings}</p>
                          </div>
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <p className="text-sm text-green-600 dark:text-green-400">Active Instructors</p>
                            <p className="text-2xl font-bold">{userData.stats.activeInstructors}</p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Link
                            href="/courses/add"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium"
                          >
                            <FiPlus className="w-5 h-5" />
                            Add New Course to Platform
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Course Creation Notice for Teachers & Organizers */}
                {(isTeacher || isOrganizer) && (
                  <motion.div variants={itemVariants}>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <FiPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">
                            Course Creation Features
                          </h3>
                          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
                            <li className="flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              Create courses with multiple content types (Text, Video, Audio, MCQ, PDF, Links)
                            </li>
                            <li className="flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              Organize content into modules and lessons
                            </li>
                            <li className="flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              Set pricing and discounts for your courses
                            </li>
                            <li className="flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              Track course performance and student engagement
                            </li>
                            {isOrganizer && (
                              <li className="flex items-center gap-2">
                                <FiCheckCircle className="w-4 h-4 text-green-500" />
                                Manage multiple instructors and course approvals
                              </li>
                            )}
                          </ul>
                          <div className="mt-4">
                            <Link
                              href="/courses/add"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                            >
                              <FiPlus className="w-4 h-4" />
                              Start Creating Your Course
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Achievements (Student) */}
                {isStudent && userData.achievements && (
                  <motion.div variants={itemVariants}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                        <FiAward className="w-6 h-6 text-yellow-500" />
                        Achievements
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userData.achievements.map((achievement, index) => (
                          <motion.div
                            key={achievement.title}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-5 text-center"
                          >
                            <div className="text-3xl mb-3">{achievement.icon}</div>
                            <h4 className="font-bold text-lg mb-2">{achievement.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {achievement.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Upcoming Sessions (Teacher) */}
                {isTeacher && userData.upcomingSessions && (
                  <motion.div variants={itemVariants}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                          <FiCalendar className="w-6 h-6 text-red-500" />
                          Upcoming Live Sessions
                        </h2>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                          <FiPlus className="w-4 h-4" />
                          Schedule Session
                        </button>
                      </div>
                      <div className="space-y-4">
                        {userData.upcomingSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                            <div>
                              <h4 className="font-semibold">{session.title}</h4>
                              <p className="text-sm text-gray-500">
                                {session.date} • {session.time}
                              </p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              <FiPlayCircle className="w-4 h-4 mr-2 inline" />
                              Join
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Recent Activities (Organizer) */}
                {isOrganizer && userData.recentActivities && (
                  <motion.div variants={itemVariants}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                        <FiClock className="w-6 h-6 text-blue-500" />
                        Recent Platform Activities
                      </h2>
                      <div className="space-y-4">
                        {userData.recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400">📝</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-semibold">{activity.action}</h4>
                                <span className="text-sm text-gray-500">{activity.time}</span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400">{activity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Course Management</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {isStudent 
                    ? "View and manage all your enrolled courses."
                    : isTeacher
                    ? "Manage the courses you're teaching. Create new courses to share your knowledge."
                    : "Manage all courses in your platform. Add new courses and oversee platform content."
                  }
                </p>
                
                {/* Add Course Button for Teachers & Organizers */}
                {(isTeacher || isOrganizer) && (
                  <div className="mb-8">
                    <Link
                      href="/courses/add"
                      className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-medium"
                    >
                      <FiPlus className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-bold">Create New Course</div>
                        <div className="text-sm opacity-90">
                          {isTeacher 
                            ? "Share your expertise with students worldwide" 
                            : "Add new courses to your platform"
                          }
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                
                {/* TODO: Add course management interface */}
                <div className="text-center py-12 text-gray-400">
                  <FiBook className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Course management interface will be implemented with database integration</p>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Activity Log</h2>
                <div className="text-center py-12 text-gray-400">
                  <FiBarChart2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Activity tracking will be implemented with database integration</p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={userData.email}
                      className="w-full px-4 py-2 border rounded-lg"
                      readOnly={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      className="w-full px-4 py-2 border rounded-lg"
                      readOnly={!isEditing}
                    />
                  </div>
                  
                  {/* User Type Display */}
                  <div>
                    <label className="block text-sm font-medium mb-2">User Type</label>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        isStudent 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : isTeacher
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {isStudent ? 'Student' : isTeacher ? 'Teacher' : 'Organizer'}
                      </span>
                      {(isTeacher || isOrganizer) && (
                        <span className="text-sm text-green-600 dark:text-green-400">
                          ✓ Can create and manage courses
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* TODO: Add more settings fields */}
                  <div className="text-center py-8 text-gray-400">
                    <p>Full settings interface will be implemented with database integration</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Database Integration Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">
            📁 Database Integration Notes
          </h3>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
            <p>This page currently uses static data. For production, you'll need to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create database models for Users, Courses, Enrollments, etc.</li>
              <li>Implement API routes to fetch user-specific data</li>
              <li>Add authentication middleware for protected routes</li>
              <li>Store userType in database: 'student', 'teacher', or 'organizer'</li>
              <li>Implement role-based access control for course creation</li>
              <li>Add payment integration for course purchases</li>
            </ul>
            {/* Example API call structure (commented out) */}
            <pre className="mt-4 p-4 bg-black/10 dark:bg-white/5 rounded-lg text-xs overflow-x-auto">
{`// Example User Schema with course creation permissions:
{
  _id: ObjectId,
  email: string,
  userType: 'student' | 'teacher' | 'organizer',
  profile: {
    name: string,
    bio: string,
    avatar: string,
    phone: string,
    location: string,
    // Teacher specific
    specialization: string,
    rating: number,
    totalStudents: number,
    // Organizer specific
    organizationName: string,
    established: Date,
    category: string
  },
  // Student
  enrolledCourses: [CourseId],
  // Teacher & Organizer
  createdCourses: [CourseId],
  teachingCourses: [CourseId], // For teachers
  addedCourses: [CourseId],    // For organizers
  // Permissions
  permissions: {
    canCreateCourses: boolean,  // true for teachers & organizers
    canEditCourses: boolean,
    canDeleteCourses: boolean,
    canApproveCourses: boolean  // true for organizers only
  },
  stats: {
    totalHours: number,
    totalRevenue: number,      // For teachers & organizers
    monthlyEarnings: number,
    completionRate: number
  },
  createdAt: Date,
  updatedAt: Date
}`}
            </pre>
            
            {/* Course Creation Permissions */}
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">
                Course Creation Permissions:
              </h4>
              <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                <li>✅ <strong>Teachers:</strong> Can create, edit, and publish their own courses</li>
                <li>✅ <strong>Organizers:</strong> Can create, edit, publish courses, and manage all platform courses</li>
                <li>❌ <strong>Students:</strong> Cannot create courses (only enroll in them)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}