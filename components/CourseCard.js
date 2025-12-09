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
  FiEye,
} from "react-icons/fi";
import { FaFire, FaHeart, FaGraduationCap } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CourseCard({
  course,
  userType = "student",
  index = 0,
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(course.isEnrolled || false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  // Navigate to course details
  const handleViewDetails = () => {
    router.push(`/courses/${course.id}`);
  };

  // Determine button text based on user type and enrollment status
  const getButtonText = () => {
    if (userType === "teacher") return "View Details";
    if (userType === "organizer") return "Manage";
    return isEnrolled ? "Continue Learning" : "Enroll Now";
  };

  // Determine button color based on status
  const getButtonColor = () => {
    if (userType === "teacher" || userType === "organizer")
      return "bg-blue-600 hover:bg-blue-700";
    if (isEnrolled) return "bg-green-600 hover:bg-green-700";
    return "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700";
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      {/* Course Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {/* Thumbnail Image or Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            course.thumbnailColor || "from-blue-500 to-purple-600"
          } transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Course Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
              course.difficulty
            )}`}
          >
            {course.difficulty}
          </span>
          {course.isFeatured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <FaFire className="inline mr-1" /> Featured
            </span>
          )}
          {course.isNew && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              NEW
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-lg text-white hover:bg-white/30"
        >
          <FaHeart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </motion.button>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            {course.category}
          </span>
          <div className="flex items-center text-amber-500">
            <FiStar className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-semibold">{course.rating}</span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor Info */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold mr-2">
            {course.instructorName?.charAt(0) || "I"}
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By {course.instructorName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
              {course.instructorTitle}
            </p>
          </div>
        </div>

        {/* Quick Course Details */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FiUsers className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {course.enrolledStudents.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FiClock className="w-4 h-4 mr-2" />
            <span className="text-sm">{course.duration}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Details Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FiEye className="w-5 h-5" />
            Details
          </motion.button>

          {/* Enroll/Continue Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              if (userType === "student") {
                if (!isEnrolled) {
                  // Enroll in course
                  setIsEnrolled(true);
                  console.log("Enrolling in course:", course.id);
                  // In real app: await enrollInCourse(course.id);
                } else {
                  // Navigate to learning page
                  router.push(`/learn/${course.id}`);
                }
              }
            }}
            className={`flex-1 ${getButtonColor()} text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2`}
          >
            {getButtonText()}
            {isEnrolled ? (
              <FiPlayCircle className="w-5 h-5" />
            ) : (
              <FiShoppingCart className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
