"use client";

import { useEffect, useState, useMemo } from "react";
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
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiStar,
  FiDollarSign,
  FiCalendar
} from "react-icons/fi";
import { FaFire, FaGraduationCap, FaRegHeart, FaHeart } from "react-icons/fa";
import CourseCard from "@/components/CourseCard";

// Extended static courses data (20 courses for pagination demo)
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
    completedLessons: 0,
    price: 89.99,
    discountedPrice: 59.99,
    discountPercentage: 33,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 85,
    thumbnailColor: "from-blue-500 to-cyan-500",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
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
    tags: ["Python", "Machine Learning", "Data Science", "AI"],
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
    completedLessons: 0,
    price: 79.99,
    discountedPrice: 49.99,
    discountPercentage: 38,
    isFeatured: false,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 82,
    thumbnailColor: "from-purple-500 to-pink-500",
    tags: ["Figma", "UI/UX", "Design", "Prototyping"],
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
    completedLessons: 0,
    price: 129.99,
    discountedPrice: 89.99,
    discountPercentage: 31,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 75,
    thumbnailColor: "from-orange-500 to-yellow-500",
    tags: ["AWS", "Cloud", "DevOps", "Certification"],
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
    tags: ["Flutter", "Dart", "Mobile", "iOS", "Android"],
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
    completedLessons: 0,
    price: 89.99,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 77,
    thumbnailColor: "from-green-600 to-emerald-500",
    tags: ["Node.js", "Express", "MongoDB", "API", "Backend"],
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
    tags: ["Security", "Ethical Hacking", "Cybersecurity", "Network"],
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
    completedLessons: 0,
    price: 149.99,
    discountedPrice: 99.99,
    discountPercentage: 33,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 83,
    thumbnailColor: "from-indigo-500 to-purple-600",
    tags: ["MERN Stack", "Full Stack", "JavaScript", "MongoDB", "Express", "React"],
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
    tags: ["TensorFlow", "Machine Learning", "AI", "Deep Learning", "Neural Networks"],
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
    completedLessons: 0,
    price: 94.99,
    discountedPrice: 64.99,
    discountPercentage: 32,
    isFeatured: false,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 79,
    thumbnailColor: "from-blue-600 to-cyan-600",
    tags: ["Docker", "Kubernetes", "DevOps", "CI/CD", "Containers"],
    description: "Learn containerization and orchestration"
  },
  {
    id: 11,
    title: "JavaScript Modern ES6+ Mastery",
    instructorName: "Chris Lee",
    instructorTitle: "JavaScript Expert",
    category: "Web Development",
    difficulty: "Intermediate",
    rating: 4.7,
    enrolledStudents: 9800,
    duration: "30 hours",
    totalLessons: 40,
    completedLessons: 0,
    price: 69.99,
    discountedPrice: 39.99,
    discountPercentage: 43,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 81,
    thumbnailColor: "from-yellow-500 to-orange-500",
    tags: ["JavaScript", "ES6", "Frontend", "Modern JS"],
    description: "Master modern JavaScript features and patterns"
  },
  {
    id: 12,
    title: "Digital Marketing Mastery 2024",
    instructorName: "Sophia Garcia",
    instructorTitle: "Marketing Director at Google",
    category: "Marketing",
    difficulty: "Beginner",
    rating: 4.6,
    enrolledStudents: 6500,
    duration: "35 hours",
    totalLessons: 50,
    completedLessons: 0,
    price: 79.99,
    isFeatured: false,
    isNew: true,
    isFree: false,
    certificate: true,
    completionRate: 76,
    thumbnailColor: "from-teal-500 to-green-500",
    tags: ["Marketing", "SEO", "Social Media", "Digital Marketing"],
    description: "Complete digital marketing strategy course"
  },
  {
    id: 13,
    title: "iOS Development with SwiftUI",
    instructorName: "Kevin Park",
    instructorTitle: "iOS Developer at Apple",
    category: "Mobile Development",
    difficulty: "Intermediate",
    rating: 4.8,
    enrolledStudents: 5400,
    duration: "44 hours",
    totalLessons: 58,
    completedLessons: 0,
    price: 89.99,
    discountedPrice: 59.99,
    discountPercentage: 33,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 84,
    thumbnailColor: "from-blue-500 to-indigo-500",
    tags: ["iOS", "Swift", "SwiftUI", "Mobile", "Apple"],
    description: "Build modern iOS apps with SwiftUI"
  },
  {
    id: 14,
    title: "Blockchain & Cryptocurrency Fundamentals",
    instructorName: "Robert Chen",
    instructorTitle: "Blockchain Expert",
    category: "Blockchain",
    difficulty: "Intermediate",
    rating: 4.5,
    enrolledStudents: 4200,
    duration: "38 hours",
    totalLessons: 52,
    completedLessons: 0,
    price: 99.99,
    isFeatured: false,
    isNew: true,
    isFree: false,
    certificate: true,
    completionRate: 73,
    thumbnailColor: "from-gray-700 to-gray-900",
    tags: ["Blockchain", "Cryptocurrency", "Web3", "Smart Contracts"],
    description: "Understand blockchain technology and cryptocurrencies"
  },
  {
    id: 15,
    title: "Game Development with Unity",
    instructorName: "Maria Gonzalez",
    instructorTitle: "Game Developer at Ubisoft",
    category: "Game Development",
    difficulty: "Intermediate",
    rating: 4.7,
    enrolledStudents: 3800,
    duration: "50 hours",
    totalLessons: 65,
    completedLessons: 0,
    price: 109.99,
    discountedPrice: 69.99,
    discountPercentage: 36,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 78,
    thumbnailColor: "from-purple-600 to-pink-600",
    tags: ["Unity", "Game Development", "C#", "3D Graphics"],
    description: "Create games with Unity game engine"
  },
  {
    id: 16,
    title: "Python Automation & Scripting",
    instructorName: "Tom Wilson",
    instructorTitle: "Automation Engineer",
    category: "Programming",
    difficulty: "Beginner",
    rating: 4.6,
    enrolledStudents: 7100,
    duration: "28 hours",
    totalLessons: 38,
    completedLessons: 0,
    price: 59.99,
    isFeatured: false,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 85,
    thumbnailColor: "from-green-500 to-blue-500",
    tags: ["Python", "Automation", "Scripting", "Productivity"],
    description: "Automate tasks and workflows with Python"
  },
  {
    id: 17,
    title: "Data Structures & Algorithms in Python",
    instructorName: "Dr. Alan Turing",
    instructorTitle: "Computer Science Professor",
    category: "Computer Science",
    difficulty: "Advanced",
    rating: 4.9,
    enrolledStudents: 9200,
    duration: "55 hours",
    totalLessons: 70,
    completedLessons: 0,
    price: 119.99,
    discountedPrice: 79.99,
    discountPercentage: 33,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 74,
    thumbnailColor: "from-red-600 to-orange-600",
    tags: ["Algorithms", "Data Structures", "Python", "Interview Prep"],
    description: "Master DSA for coding interviews"
  },
  {
    id: 18,
    title: "Ethical Hacking & Penetration Testing",
    instructorName: "Alex Turner",
    instructorTitle: "Security Consultant",
    category: "Security",
    difficulty: "Advanced",
    rating: 4.8,
    enrolledStudents: 3300,
    duration: "60 hours",
    totalLessons: 75,
    completedLessons: 0,
    price: 129.99,
    discountedPrice: 89.99,
    discountPercentage: 31,
    isFeatured: true,
    isNew: true,
    isFree: false,
    certificate: true,
    completionRate: 71,
    thumbnailColor: "from-black to-gray-800",
    tags: ["Ethical Hacking", "Penetration Testing", "Security", "Kali Linux"],
    description: "Learn ethical hacking techniques"
  },
  {
    id: 19,
    title: "Photography Masterclass",
    instructorName: "Emily Davis",
    instructorTitle: "Professional Photographer",
    category: "Photography",
    difficulty: "Beginner",
    rating: 4.7,
    enrolledStudents: 4800,
    duration: "40 hours",
    totalLessons: 55,
    completedLessons: 0,
    price: 79.99,
    isFeatured: false,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 82,
    thumbnailColor: "from-amber-500 to-yellow-500",
    tags: ["Photography", "Camera", "Lighting", "Editing"],
    description: "Master photography from basics to advanced"
  },
  {
    id: 20,
    title: "Business Analytics with Excel & Power BI",
    instructorName: "David Miller",
    instructorTitle: "Business Analyst at McKinsey",
    category: "Business",
    difficulty: "Intermediate",
    rating: 4.6,
    enrolledStudents: 5800,
    duration: "42 hours",
    totalLessons: 56,
    completedLessons: 0,
    price: 89.99,
    discountedPrice: 59.99,
    discountPercentage: 33,
    isFeatured: true,
    isNew: false,
    isFree: false,
    certificate: true,
    completionRate: 79,
    thumbnailColor: "from-green-600 to-teal-600",
    tags: ["Excel", "Power BI", "Analytics", "Business", "Data Visualization"],
    description: "Analyze business data with Excel and Power BI"
  }
];

// Categories from courses
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
  "DevOps",
  "Marketing",
  "Blockchain",
  "Game Development",
  "Programming",
  "Computer Science",
  "Photography",
  "Business"
];

const DIFFICULTY_LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const PRICE_RANGES = ["All Prices", "Free", "Paid", "Under $50", "$50-$100", "Over $100"];
const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular", icon: <FaFire /> },
  { value: "rating", label: "Highest Rated", icon: <FiStar /> },
  { value: "newest", label: "Newest", icon: <FiCalendar /> },
  { value: "price-low", label: "Price: Low to High", icon: <FiDollarSign /> },
  { value: "price-high", label: "Price: High to Low", icon: <FiDollarSign /> },
  { value: "duration", label: "Shortest Duration", icon: <FiClock /> }
];

export default function CoursesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  // Pagination settings
  const COURSES_PER_PAGE = 9;

  // Simulate API call
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setCourses(STATIC_COURSES);
        setFilteredCourses(STATIC_COURSES);
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Filter and sort courses
  useEffect(() => {
    let result = [...courses];
    
    // Filter by category
    if (selectedCategory !== "All Categories") {
      result = result.filter(course => course.category === selectedCategory);
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== "All Levels") {
      result = result.filter(course => course.difficulty === selectedDifficulty);
    }
    
    // Filter by price
    if (selectedPrice !== "All Prices") {
      switch(selectedPrice) {
        case "Free":
          result = result.filter(course => course.isFree);
          break;
        case "Paid":
          result = result.filter(course => !course.isFree);
          break;
        case "Under $50":
          result = result.filter(course => 
            (course.discountedPrice || course.price) < 50
          );
          break;
        case "$50-$100":
          result = result.filter(course => {
            const price = course.discountedPrice || course.price;
            return price >= 50 && price <= 100;
          });
          break;
        case "Over $100":
          result = result.filter(course => 
            (course.discountedPrice || course.price) > 100
          );
          break;
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        course.instructorName.toLowerCase().includes(query)
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
        result.sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        result.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
        break;
      case "price-high":
        result.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
        break;
      case "duration":
        // Extract hours from duration string
        result.sort((a, b) => {
          const getHours = (duration) => parseInt(duration.split(' ')[0]);
          return getHours(a.duration) - getHours(b.duration);
        });
        break;
    }
    
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, selectedPrice, sortBy]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const endIndex = startIndex + COURSES_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (courseId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(courseId)) {
        newFavorites.delete(courseId);
      } else {
        newFavorites.add(courseId);
      }
      return newFavorites;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedDifficulty("All Levels");
    setSelectedPrice("All Prices");
    setSortBy("popular");
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Calculate filter counts
  const categoryCounts = STATIC_COURSES.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pt-24 pb-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-white text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore All Courses
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover {STATIC_COURSES.length}+ courses in programming, design, data science, and more. Start learning today!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-6"
            >
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FiFilter className="w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category}</span>
                        {category !== "All Categories" && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {categoryCounts[category] || 0}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Difficulty Level</h3>
                <div className="space-y-2">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(level)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedDifficulty === level
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Price</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((price) => (
                    <button
                      key={price}
                      onClick={() => setSelectedPrice(price)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedPrice === price
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className="w-full py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-full py-3 bg-white dark:bg-gray-800 rounded-xl shadow flex items-center justify-center gap-2"
              >
                <FiFilter className="w-5 h-5" />
                Filter Courses
              </button>
            </div>

            {/* Mobile Filter Modal */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'tween' }}
                    className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Filters</h2>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Categories */}
                      <div>
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <div className="space-y-2">
                          {CATEGORIES.map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`w-full text-left px-3 py-2 rounded-lg ${
                                selectedCategory === category
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Difficulty */}
                      <div>
                        <h3 className="font-semibold mb-3">Difficulty</h3>
                        <div className="space-y-2">
                          {DIFFICULTY_LEVELS.map((level) => (
                            <button
                              key={level}
                              onClick={() => setSelectedDifficulty(level)}
                              className={`w-full text-left px-3 py-2 rounded-lg ${
                                selectedDifficulty === level
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <h3 className="font-semibold mb-3">Price</h3>
                        <div className="space-y-2">
                          {PRICE_RANGES.map((price) => (
                            <button
                              key={price}
                              onClick={() => setSelectedPrice(price)}
                              className={`w-full text-left px-3 py-2 rounded-lg ${
                                selectedPrice === price
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              {price}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      <button
                        onClick={clearFilters}
                        className="w-full py-3 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search and Sort Bar */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <div className="relative">
                      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search courses by title, category, or instructor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full lg:w-48 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
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

                {/* Active Filters */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(selectedCategory !== "All Categories" || 
                    selectedDifficulty !== "All Levels" || 
                    selectedPrice !== "All Prices" ||
                    searchQuery) && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                      {selectedCategory !== "All Categories" && (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                          {selectedCategory}
                        </span>
                      )}
                      {selectedDifficulty !== "All Levels" && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
                          {selectedDifficulty}
                        </span>
                      )}
                      {selectedPrice !== "All Prices" && (
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                          {selectedPrice}
                        </span>
                      )}
                      {searchQuery && (
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm">
                          Search: "{searchQuery}"
                        </span>
                      )}
                      <button
                        onClick={clearFilters}
                        className="text-sm text-red-600 dark:text-red-400 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Results Header */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {filteredCourses.length} Courses Found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing {Math.min(paginatedCourses.length, COURSES_PER_PAGE)} of {filteredCourses.length} courses
                    {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
                  </p>
                </div>
                
                {/* Favorite Toggle */}
                <button
                  onClick={() => {
                    // Toggle favorite filter
                    if (favorites.size > 0) {
                      setFavorites(new Set());
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {favorites.size > 0 ? (
                    <FaHeart className="w-5 h-5 text-red-500 fill-current" />
                  ) : (
                    <FaRegHeart className="w-5 h-5" />
                  )}
                  <span>Favorites ({favorites.size})</span>
                </button>
              </div>
            </motion.div>

            {/* Courses Grid */}
            {paginatedCourses.length > 0 ? (
              <>
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className={`${
                    viewMode === "grid" 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-6"
                  } mb-12`}
                >
                  <AnimatePresence>
                    {paginatedCourses.map((course, index) => (
                      <CourseCard 
                        key={course.id} 
                        course={course} 
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div 
                    variants={fadeInUp}
                    className="flex justify-center items-center gap-2"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-2">...</span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div 
                variants={fadeInUp}
                className="text-center py-16"
              >
                <div className="text-gray-400 dark:text-gray-500">
                  <FiSearch className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-semibold">No courses found</p>
                  <p className="mt-2">Try adjusting your search or filters</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}

            {/* Database Integration Notes */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
            >
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">
                🗄️ Database Integration Ready
              </h3>
              <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
                <p>This page uses static data. For production, implement these API endpoints:</p>
                <pre className="mt-4 p-4 bg-black/10 dark:bg-white/5 rounded-lg text-xs overflow-x-auto">
{`// API Route: app/api/courses/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Get query parameters
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 9;
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');
  const price = searchParams.get('price');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') || 'popular';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  
  // Build MongoDB query
  const query = {};
  
  if (category && category !== 'All Categories') {
    query.category = category;
  }
  
  if (difficulty && difficulty !== 'All Levels') {
    query.difficulty = difficulty;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
      { 'instructor.name': { $regex: search, $options: 'i' } }
    ];
  }
  
  if (price === 'Free') {
    query.isFree = true;
  } else if (price === 'Paid') {
    query.isFree = false;
  }
  
  // Add price range filters
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }
  
  // Build sort object
  let sortObj = {};
  switch(sort) {
    case 'popular':
      sortObj = { enrolledStudents: -1 };
      break;
    case 'rating':
      sortObj = { rating: -1 };
      break;
    case 'newest':
      sortObj = { createdAt: -1 };
      break;
    case 'price-low':
      sortObj = { price: 1 };
      break;
    case 'price-high':
      sortObj = { price: -1 };
      break;
    default:
      sortObj = { enrolledStudents: -1 };
  }
  
  // Get total count for pagination
  const total = await db.collection('courses').countDocuments(query);
  
  // Fetch paginated courses
  const courses = await db.collection('courses')
    .find(query)
    .sort(sortObj)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
  
  return NextResponse.json({
    courses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
}`}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}