"use client";

import { motion } from "framer-motion";
import { 
  FiUsers, 
  FiClock, 
  FiStar, 
  FiBookOpen,
  FiShoppingCart,
  FiPlayCircle,
  FiTrendingUp,
  FiBarChart2,
  FiChevronRight,
  FiCheck,
  FiCalendar,
  FiDollarSign,
  FiMessageSquare,
  FiDownload,
  FiShare2
} from "react-icons/fi";
import { 
  FaGraduationCap, 
  FaChartLine, 
  FaCertificate,
  FaRegHeart,
  FaHeart,
  FaFire,
  FaRegClock
} from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Example course data (will come from database)
const EXAMPLE_COURSE = {
  id: 9,
  title: "Machine Learning with TensorFlow 2.0",
  instructorName: "Dr. Sarah Miller",
  instructorTitle: "AI Researcher at OpenAI",
  instructorBio: "PhD in Computer Science with 8+ years of experience in machine learning and AI research. Published 20+ research papers in top AI conferences.",
  instructorRating: 4.9,
  instructorTotalCourses: 5,
  instructorTotalStudents: 25000,
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
  tags: ["TensorFlow", "Machine Learning", "AI", "Deep Learning", "Python", "Neural Networks"],
  
  // Course description
  description: "Master machine learning with TensorFlow 2.0 in this comprehensive course. Learn to build, train, and deploy neural networks for real-world applications. From basic concepts to advanced techniques, this course covers everything you need to become a machine learning expert.",
  
  // Learning outcomes
  learningOutcomes: [
    "Understand core machine learning concepts and algorithms",
    "Build and train neural networks using TensorFlow 2.0",
    "Implement computer vision and NLP models",
    "Deploy ML models to production",
    "Work with real-world datasets and projects",
    "Optimize models for performance and accuracy"
  ],
  
  // Course curriculum
  curriculum: [
    {
      module: "Introduction to Machine Learning",
      lessons: 8,
      duration: "6 hours",
      topics: ["ML Basics", "Types of ML", "Setting up Environment"]
    },
    {
      module: "TensorFlow Fundamentals",
      lessons: 12,
      duration: "8 hours",
      topics: ["Tensors", "Operations", "Datasets", "Layers API"]
    },
    {
      module: "Neural Networks Deep Dive",
      lessons: 16,
      duration: "10 hours",
      topics: ["ANN", "CNN", "RNN", "Transfer Learning"]
    },
    {
      module: "Advanced Topics",
      lessons: 20,
      duration: "12 hours",
      topics: ["GANs", "Reinforcement Learning", "Model Deployment"]
    },
    {
      module: "Capstone Project",
      lessons: 8,
      duration: "12 hours",
      topics: ["Real-world Project", "Model Optimization", "Presentation"]
    }
  ],
  
  // Requirements
  requirements: [
    "Basic Python programming knowledge",
    "Understanding of linear algebra and calculus",
    "Computer with 8GB+ RAM",
    "Willingness to learn and experiment"
  ],
  
  // Analytics data
  analytics: {
    avgCompletionTime: "6 weeks",
    satisfactionRate: 94,
    jobPlacementRate: 85,
    avgSalaryIncrease: "$25,000",
    lastUpdated: "2 weeks ago"
  },
  
  // Reviews
  reviews: {
    average: 4.9,
    total: 1248,
    distribution: {
      5: 85,
      4: 12,
      3: 2,
      2: 1,
      1: 0
    }
  }
};

export default function CourseDetails({ courseId }) {
  const router = useRouter();
  const [course, setCourse] = useState(EXAMPLE_COURSE);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Simulate API call
  // useEffect(() => {
  //   const fetchCourseDetails = async () => {
  //     setLoading(true);
  //     try {
  //       // TODO: Replace with actual API call
  //       // const response = await fetch(`/api/courses/${courseId}`);
  //       // const data = await response.json();
  //       // setCourse(data);
  //       setCourse(EXAMPLE_COURSE);
  //     } catch (error) {
  //       console.error("Error fetching course details:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   if (courseId) {
  //     fetchCourseDetails();
  //   }
  // }, [courseId]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    console.log("Enrolling in course:", courseId);
    // TODO: Call enrollment API
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `Check out this course: ${course.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 pt-24 pb-16`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-white"
          >
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-white/80 mb-6">
              <button onClick={() => router.back()} className="hover:text-white transition-colors">
                Courses
              </button>
              <FiChevronRight className="mx-2" />
              <span>{course.category}</span>
              <FiChevronRight className="mx-2" />
              <span className="font-semibold">{course.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Course Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {course.difficulty}
                  </span>
                  {course.isFeatured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm flex items-center gap-1">
                      <FaFire className="w-3 h-3" /> Featured
                    </span>
                  )}
                  {course.isNew && (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-sm">
                      NEW
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {course.title}
                </h1>

                <p className="text-xl text-white/90 mb-8 max-w-3xl">
                  {course.description}
                </p>

                {/* Instructor Info */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                      {course.instructorName.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">By {course.instructorName}</h3>
                    <p className="text-white/80">{course.instructorTitle}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <FiStar className="w-4 h-4 text-yellow-300" />
                        {course.instructorRating} Instructor Rating
                      </span>
                      <span>•</span>
                      <span>{course.instructorTotalCourses} Courses</span>
                      <span>•</span>
                      <span>{course.instructorTotalStudents.toLocaleString()} Students</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <motion.div 
                  variants={staggerContainer}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {[
                    { icon: <FiUsers />, label: "Enrolled Students", value: course.enrolledStudents.toLocaleString() },
                    { icon: <FiClock />, label: "Duration", value: course.duration },
                    { icon: <FiBookOpen />, label: "Lessons", value: course.totalLessons },
                    { icon: <FaGraduationCap />, label: "Certificate", value: course.certificate ? "Yes" : "No" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={fadeInUp}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl opacity-80">
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-white/70">{stat.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Enrollment Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:w-96"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="mb-6">
                    {course.discountedPrice ? (
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold">${course.discountedPrice}</span>
                        <span className="text-xl line-through text-white/60">${course.price}</span>
                        <span className="ml-auto px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-sm font-bold">
                          {course.discountPercentage}% OFF
                        </span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold">
                        {course.isFree ? "FREE" : `$${course.price}`}
                      </div>
                    )}
                    <p className="text-white/80 mt-2">One-time payment • Lifetime access</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <button
                      onClick={handleEnroll}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                        isEnrolled
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      } text-white flex items-center justify-center gap-3`}
                    >
                      {isEnrolled ? (
                        <>
                          <FiPlayCircle className="w-6 h-6" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <FiShoppingCart className="w-6 h-6" />
                          Enroll Now
                        </>
                      )}
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center gap-2 transition-colors"
                      >
                        {isFavorite ? (
                          <FaHeart className="w-5 h-5 text-red-500 fill-current" />
                        ) : (
                          <FaRegHeart className="w-5 h-5" />
                        )}
                        <span>{isFavorite ? "Saved" : "Save"}</span>
                      </button>

                      <button
                        onClick={handleShare}
                        className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center gap-2 transition-colors"
                      >
                        <FiShare2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-white/80">
                    <div className="flex items-center gap-3">
                      <FiCheck className="w-5 h-5 text-green-400" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCheck className="w-5 h-5 text-green-400" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCheck className="w-5 h-5 text-green-400" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCheck className="w-5 h-5 text-green-400" />
                      <span>Access on mobile and TV</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-700">
            {["overview", "curriculum", "instructor", "analytics", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* What You'll Learn */}
                <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Course Content Preview */}
                <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                  <div className="space-y-4">
                    {course.curriculum.slice(0, 3).map((module, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">Module {index + 1}: {module.module}</h3>
                          <span className="text-sm text-gray-500">{module.lessons} lessons • {module.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.slice(0, 3).map((topic, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                          {module.topics.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                              +{module.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-3 text-center text-blue-600 dark:text-blue-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                      Show all {course.curriculum.length} modules
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Requirements */}
                <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FiChevronRight className="w-4 h-4 text-blue-500 mt-1" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Tags */}
                <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Instructor Tab */}
          {activeTab === "instructor" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-1/3">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 mx-auto lg:mx-0">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-4xl font-bold text-blue-600">
                      {course.instructorName.charAt(0)}
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <h2 className="text-3xl font-bold mb-4">{course.instructorName}</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{course.instructorTitle}</p>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    {course.instructorBio}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {course.instructorRating}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Instructor Rating</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {course.instructorTotalCourses}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Courses</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {course.instructorTotalStudents.toLocaleString()}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Students</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Analytics Cards */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaChartLine className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold">Course Analytics</h2>
                </div>
                
                <div className="space-y-6">
                  {[
                    { label: "Average Completion Time", value: course.analytics.avgCompletionTime, icon: <FaRegClock />, color: "text-blue-500" },
                    { label: "Student Satisfaction", value: `${course.analytics.satisfactionRate}%`, icon: <FiTrendingUp />, color: "text-green-500" },
                    { label: "Job Placement Rate", value: `${course.analytics.jobPlacementRate}%`, icon: <FaGraduationCap />, color: "text-purple-500" },
                    { label: "Average Salary Increase", value: course.analytics.avgSalaryIncrease, icon: <FiDollarSign />, color: "text-yellow-500" }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <div>
                          <div className="font-medium">{stat.label}</div>
                          <div className="text-sm text-gray-500">Based on graduate surveys</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
                  Last updated: {course.analytics.lastUpdated}
                </div>
              </motion.div>

              {/* Review Distribution */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FiBarChart2 className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold">Rating Distribution</h2>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-end gap-2 mb-2">
                    <div className="text-4xl font-bold">{course.reviews.average}</div>
                    <div className="mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {course.reviews.total} reviews
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(course.reviews.distribution)
                    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                    .map(([stars, percentage]) => (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="w-12 text-sm text-gray-500">
                          {stars} star{stars !== '1' ? 's' : ''}
                        </div>
                        <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                          />
                        </div>
                        <div className="w-12 text-sm text-right font-medium">
                          {percentage}%
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Review section will be implemented with database integration</p>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === "curriculum" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Full curriculum with lessons will be implemented with database integration</p>
            </div>
          )}
        </motion.div>

        {/* Database Integration Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">
            🗄️ Database Integration Notes
          </h3>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
            <p>This component uses static data. For production, you'll need:</p>
            <pre className="mt-4 p-4 bg-black/10 dark:bg-white/5 rounded-lg text-xs overflow-x-auto">
{`// API route for course details: app/api/courses/[id]/route.js
// Example response structure:
{
  course: {
    id: string,
    title: string,
    description: string,
    instructor: {
      id: string,
      name: string,
      title: string,
      bio: string,
      rating: number,
      totalCourses: number,
      totalStudents: number
    },
    category: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    rating: number,
    enrolledStudents: number,
    duration: string,
    totalLessons: number,
    price: number,
    discountedPrice: number | null,
    isFeatured: boolean,
    isFree: boolean,
    certificate: boolean,
    thumbnail: string,
    tags: string[],
    learningOutcomes: string[],
    requirements: string[],
    curriculum: Array<{
      module: string,
      lessons: number,
      duration: string,
      topics: string[]
    }>,
    analytics: {
      avgCompletionTime: string,
      satisfactionRate: number,
      jobPlacementRate: number,
      avgSalaryIncrease: string,
      lastUpdated: string
    },
    reviews: {
      average: number,
      total: number,
      distribution: Record<number, number>
    }
  },
  isEnrolled: boolean, // For current user
  progress: number     // For enrolled users
}`}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
}