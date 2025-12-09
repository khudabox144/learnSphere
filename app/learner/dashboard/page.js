"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList,
  FiTrendingUp,
  FiClock,
  FiAward,
  FiBook,
  FiShoppingBag,
  FiUsers,
  FiStar
} from "react-icons/fi";
import { FaFire, FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import CourseCard from "@/components/CourseCard";

// Static courses data (will be replaced with DB data)
const STATIC_COURSES = [
  {
    id: 1,
    title: "Complete React Developer Bootcamp 2024",
    instructorName: "Sarah Johnson",
    instructorTitle: "Senior Frontend Engineer at Google",
    category: "Web Development",
    difficulty: "Intermediate",
    rating: 4.9,
    enrolledStudents: 12500,
    duration: "42 hours",
    totalLessons: 56,
    completedLessons: 28,
    price: 89.99,
    discountedPrice: 59.99,
    discountPercentage: 33,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 85,
    thumbnailColor: "from-blue-500 to-cyan-500",
    tags: ["React", "JavaScript", "Frontend"],
    description: "Master React with hooks, context, redux, and build real projects"
  },
  {
    id: 2,
    title: "Python for Data Science & Machine Learning",
    instructorName: "Dr. Michael Chen",
    instructorTitle: "Data Scientist at Amazon",
    category: "Data Science",
    difficulty: "Beginner",
    rating: 4.8,
    enrolledStudents: 8500,
    duration: "36 hours",
    totalLessons: 48,
    completedLessons: 0,
    price: 99.99,
    isFeatured: true,
    isNew: true,
    isFree: false,
    certificate: true,
    completionRate: 78,
    thumbnailColor: "from-green-500 to-teal-500",
    tags: ["Python", "Machine Learning", "Data Science"],
    description: "Complete guide to data science and ML with Python"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass - Figma 2024",
    instructorName: "Emma Wilson",
    instructorTitle: "Lead Designer at Adobe",
    category: "Design",
    difficulty: "Intermediate",
    rating: 4.7,
    enrolledStudents: 7200,
    duration: "28 hours",
    totalLessons: 42,
    completedLessons: 15,
    price: 79.99,
    discountedPrice: 49.99,
    discountPercentage: 38,
    isFeatured: false,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 82,
    thumbnailColor: "from-purple-500 to-pink-500",
    tags: ["Figma", "UI/UX", "Design"],
    description: "Learn professional UI/UX design from scratch"
  },
  {
    id: 4,
    title: "AWS Certified Solutions Architect",
    instructorName: "James Rodriguez",
    instructorTitle: "Cloud Architect at AWS",
    category: "Cloud Computing",
    difficulty: "Advanced",
    rating: 4.9,
    enrolledStudents: 9500,
    duration: "52 hours",
    totalLessons: 68,
    completedLessons: 40,
    price: 129.99,
    discountedPrice: 89.99,
    discountPercentage: 31,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 75,
    thumbnailColor: "from-orange-500 to-yellow-500",
    tags: ["AWS", "Cloud", "DevOps"],
    description: "Prepare for AWS certification with hands-on labs"
  },
  {
    id: 5,
    title: "Flutter & Dart - Complete App Development",
    instructorName: "Alex Thompson",
    instructorTitle: "Mobile Developer at Meta",
    category: "Mobile Development",
    difficulty: "Intermediate",
    rating: 4.6,
    enrolledStudents: 6100,
    duration: "38 hours",
    totalLessons: 52,
    completedLessons: 0,
    price: 74.99,
    isFeatured: false,
    isNew: true,
    isFree: false,
    certificate: true,
    completionRate: 80,
    thumbnailColor: "from-blue-400 to-indigo-500",
    tags: ["Flutter", "Dart", "Mobile"],
    description: "Build iOS and Android apps with Flutter"
  },
  {
    id: 6,
    title: "Node.js Backend Development Masterclass",
    instructorName: "David Kim",
    instructorTitle: "Backend Lead at Netflix",
    category: "Backend Development",
    difficulty: "Advanced",
    rating: 4.8,
    enrolledStudents: 8300,
    duration: "45 hours",
    totalLessons: 60,
    completedLessons: 30,
    price: 89.99,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 77,
    thumbnailColor: "from-green-600 to-emerald-500",
    tags: ["Node.js", "Express", "MongoDB"],
    description: "Build scalable backend applications with Node.js"
  },
  {
    id: 7,
    title: "Cybersecurity Fundamentals 2024",
    instructorName: "Lisa Wang",
    instructorTitle: "Security Expert at Microsoft",
    category: "Security",
    difficulty: "Beginner",
    rating: 4.5,
    enrolledStudents: 5200,
    duration: "32 hours",
    totalLessons: 45,
    completedLessons: 0,
    price: 0,
    isFeatured: false,
    isNew: false,
    isFree: true,
    certificate: false,
    completionRate: 70,
    thumbnailColor: "from-red-500 to-orange-500",
    tags: ["Security", "Ethical Hacking", "Cybersecurity"],
    description: "Learn essential cybersecurity concepts"
  },
  {
    id: 8,
    title: "Full Stack Web Development Bootcamp",
    instructorName: "Brian Wilson",
    instructorTitle: "Full Stack Developer",
    category: "Web Development",
    difficulty: "Intermediate",
    rating: 4.7,
    enrolledStudents: 11200,
    duration: "60 hours",
    totalLessons: 80,
    completedLessons: 45,
    price: 149.99,
    discountedPrice: 99.99,
    discountPercentage: 33,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 83,
    thumbnailColor: "from-indigo-500 to-purple-600",
    tags: ["MERN Stack", "Full Stack", "JavaScript"],
    description: "Become a full stack developer from scratch"
  },
  {
    id: 9,
    title: "Machine Learning with TensorFlow 2.0",
    instructorName: "Dr. Sarah Miller",
    instructorTitle: "AI Researcher at OpenAI",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    rating: 4.9,
    enrolledStudents: 6800,
    duration: "48 hours",
    totalLessons: 64,
    completedLessons: 0,
    price: 119.99,
    discountedPrice: 79.99,
    discountPercentage: 33,
    isFeatured: true,
    isNew: true,
    isFree: false,
    certificate: true,
    completionRate: 72,
    thumbnailColor: "from-pink-500 to-rose-500",
    tags: ["TensorFlow", "Machine Learning", "AI"],
    description: "Master machine learning with TensorFlow"
  },
  {
    id: 10,
    title: "DevOps with Docker & Kubernetes",
    instructorName: "Mark Johnson",
    instructorTitle: "DevOps Engineer at Spotify",
    category: "DevOps",
    difficulty: "Intermediate",
    rating: 4.8,
    enrolledStudents: 7400,
    duration: "40 hours",
    totalLessons: 55,
    completedLessons: 20,
    price: 94.99,
    discountedPrice: 64.99,
    discountPercentage: 32,
    isFeatured: false,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 79,
    thumbnailColor: "from-blue-600 to-cyan-600",
    tags: ["Docker", "Kubernetes", "DevOps"],
    description: "Learn containerization and orchestration"
  }
];

// Categories for filtering
const CATEGORIES = [
  "All Categories",
  "Web Development",
  "Data Science",
  "Design",
  "Mobile Development",
  "Cloud Computing",
  "Backend Development",
  "Security",
  "Artificial Intelligence",
  "DevOps"
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState("student"); // For demo purposes

  // Simulate API call
  useEffect(() => {
    if (!loading && user) {
      // TODO: Replace with actual API call
      // Example: fetchCoursesFromDatabase()
      const timer = setTimeout(() => {
        setCourses(STATIC_COURSES);
        setFilteredCourses(STATIC_COURSES);
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  // Filter and search courses
  useEffect(() => {
    let result = [...courses];
    
    // Filter by category
    if (selectedCategory !== "All Categories") {
      result = result.filter(course => course.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort courses
    switch(sortBy) {
      case "popular":
        result.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Assuming newer courses have higher IDs
        result.sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        result.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
        break;
      case "price-high":
        result.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
        break;
    }
    
    setFilteredCourses(result);
  }, [courses, searchQuery, selectedCategory, sortBy]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      console.log("🚫 No user found, redirecting to login");
      router.push("/auth/login");
    }
  }, [user, loading, router]);

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

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // User stats
  const userStats = {
    enrolledCourses: courses.filter(c => c.completedLessons > 0).length,
    completedCourses: courses.filter(c => c.completedLessons === c.totalLessons).length,
    learningHours: 156,
    currentStreak: 7
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-4 px-4 sm:px-6 lg:px-8 pb-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Welcome back, {user.email?.split('@')[0]}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Continue your learning journey. Discover new skills and grow.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                label: "Enrolled Courses", 
                value: userStats.enrolledCourses, 
                icon: <FiBook className="w-5 h-5" />,
                color: "from-blue-500 to-cyan-500"
              },
              { 
                label: "Completed", 
                value: userStats.completedCourses, 
                icon: <FiAward className="w-5 h-5" />,
                color: "from-green-500 to-emerald-500"
              },
              { 
                label: "Learning Hours", 
                value: userStats.learningHours, 
                icon: <FiClock className="w-5 h-5" />,
                color: "from-purple-500 to-pink-500"
              },
              { 
                label: "Day Streak", 
                value: userStats.currentStreak, 
                icon: <FaFire className="w-5 h-5" />,
                color: "from-orange-500 to-red-500"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm opacity-90">{stat.label}</p>
                  </div>
                  <div className="text-2xl opacity-80">
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses, topics, or instructors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full lg:w-48 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <FiFilter className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full lg:w-48 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <FiTrendingUp className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === "grid" 
                      ? "bg-white dark:bg-gray-600 shadow" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === "list" 
                      ? "bg-white dark:bg-gray-600 shadow" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["React", "Free", "Featured", "Python", "Beginner", "Certificate"].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredCourses.length} Courses Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {Math.min(filteredCourses.length, 12)} of {courses.length} total courses
            </p>
          </div>
        </motion.div>

        {/* Courses Grid/List */}
        <motion.div 
          variants={containerVariants}
          className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }`}
        >
          <AnimatePresence>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                viewMode === "grid" ? (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    userType={userType}
                    index={index}
                  />
                ) : (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                  >
                    {/* List view layout would go here */}
                    <CourseCard 
                      course={course} 
                      userType={userType}
                      index={index}
                    />
                  </motion.div>
                )
              ))
            ) : (
              <motion.div 
                variants={itemVariants}
                className="col-span-full text-center py-16"
              >
                <div className="text-gray-400 dark:text-gray-500">
                  <FiSearch className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-semibold">No courses found</p>
                  <p className="mt-2">Try adjusting your search or filters</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Database Integration Notes */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">
            🗄️ Database Integration Ready
          </h3>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
            <p>This dashboard uses static data. For production, replace with:</p>
            <pre className="mt-4 p-4 bg-black/10 dark:bg-white/5 rounded-lg text-xs overflow-x-auto">
{`// Example API integration for courses:
// 1. Create API route: app/api/courses/route.js
// 2. Fetch courses from database
// 3. Implement pagination, search, and filters on backend

// Example fetch function:
async function fetchCourses(filters = {}) {
  const response = await fetch(\`/api/courses?\${new URLSearchParams(filters)}\`);
  return response.json();
}

// Use in component:
useEffect(() => {
  const loadCourses = async () => {
    const data = await fetchCourses({
      category: selectedCategory,
      search: searchQuery,
      sort: sortBy,
      page: 1,
      limit: 12
    });
    setCourses(data.courses);
  };
  loadCourses();
}, [selectedCategory, searchQuery, sortBy]);

// Course Schema Example:
{
  _id: ObjectId,
  title: string,
  description: string,
  instructor: { type: ObjectId, ref: 'User' },
  category: string,
  price: number,
  enrolledStudents: number,
  rating: number,
  totalLessons: number,
  completedLessons: number, // For enrolled users
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  tags: [string],
  isFeatured: boolean,
  isFree: boolean,
  certificate: boolean,
  thumbnail: string,
  createdAt: Date,
  updatedAt: Date
}`}
            </pre>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}