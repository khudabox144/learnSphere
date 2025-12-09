"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUpload, 
  FiVideo, 
  FiHeadphones, 
  FiFileText, 
  FiCheckCircle,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiSave,
  FiX,
  FiDollarSign,
  FiClock,
  FiUsers,
  FiBook,
  FiTag,
  FiChevronDown,
  FiChevronUp,
  FiPlay,
  FiPause,
  FiVolume2
} from "react-icons/fi";
import { 
  FaQuestionCircle, 
  FaImage,
  FaMicrophone,
  FaYoutube,
  FaFilePdf,
  FaLink
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Content types
const CONTENT_TYPES = {
  TEXT: 'text',
  VIDEO: 'video',
  AUDIO: 'audio',
  MCQ: 'mcq',
  PDF: 'pdf',
  LINK: 'link'
};

// Difficulty levels
const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
];

// Course categories
const COURSE_CATEGORIES = [
  "Web Development",
  "Data Science",
  "Mobile Development",
  "Design",
  "Business",
  "Marketing",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Game Development",
  "Blockchain",
  "Photography",
  "Music",
  "Health & Fitness",
  "Language Learning",
  "Personal Development"
];

export default function AddCourse() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Course basic info
  const [courseInfo, setCourseInfo] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    difficulty: "beginner",
    price: 0,
    discountedPrice: "",
    duration: "",
    language: "English",
    certificate: true,
    featured: false,
    tags: [],
    thumbnail: null,
    thumbnailPreview: ""
  });

  // Course content
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Introduction",
      description: "Course introduction and overview",
      order: 1,
      lessons: [
        {
          id: 1,
          title: "Welcome to the Course",
          type: CONTENT_TYPES.VIDEO,
          duration: "5:30",
          content: {
            videoUrl: "",
            videoPlatform: "youtube", // youtube, vimeo, custom
            thumbnail: ""
          },
          order: 1,
          isPublished: true
        },
        {
          id: 2,
          title: "Course Overview",
          type: CONTENT_TYPES.TEXT,
          content: {
            text: "This course will teach you everything you need to know..."
          },
          order: 2,
          isPublished: true
        }
      ]
    }
  ]);

  // New lesson form
  const [newLesson, setNewLesson] = useState({
    title: "",
    type: CONTENT_TYPES.TEXT,
    moduleId: 1,
    content: {
      // For text
      text: "",
      // For video
      videoUrl: "",
      videoPlatform: "youtube",
      thumbnail: "",
      // For audio
      audioUrl: "",
      duration: "",
      // For MCQ
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      // For PDF
      pdfUrl: "",
      fileName: "",
      // For link
      linkUrl: "",
      linkTitle: "",
      description: ""
    }
  });

  // MCQ state
  const [mcqData, setMcqData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    points: 1,
    timeLimit: 0 // 0 means no time limit
  });

  // Audio state
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0
  });

  // File upload state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Handle thumbnail upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, JPG, WebP)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setCourseInfo(prev => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file)
      }));
    }
  };

  // Handle course info change
  const handleCourseInfoChange = (field, value) => {
    setCourseInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle tags
  const handleAddTag = (tag) => {
    if (tag.trim() && !courseInfo.tags.includes(tag.trim())) {
      setCourseInfo(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setCourseInfo(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle module operations
  const addModule = () => {
    const newModuleId = modules.length + 1;
    setModules(prev => [
      ...prev,
      {
        id: newModuleId,
        title: `Module ${newModuleId}`,
        description: "",
        order: newModuleId,
        lessons: []
      }
    ]);
  };

  const updateModule = (moduleId, field, value) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, [field]: value } : module
    ));
  };

  const deleteModule = (moduleId) => {
    if (modules.length > 1) {
      setModules(prev => prev.filter(module => module.id !== moduleId));
    }
  };

  // Handle lesson operations
  const addLesson = () => {
    if (!newLesson.title.trim()) {
      alert("Please enter lesson title");
      return;
    }

    const module = modules.find(m => m.id === newLesson.moduleId);
    if (!module) return;

    const lessonId = Date.now(); // Generate unique ID
    const newLessonObj = {
      id: lessonId,
      title: newLesson.title,
      type: newLesson.type,
      order: module.lessons.length + 1,
      isPublished: true,
      content: { ...newLesson.content }
    };

    // Add MCQ specific data if type is MCQ
    if (newLesson.type === CONTENT_TYPES.MCQ) {
      newLessonObj.content = {
        ...newLesson.content,
        question: mcqData.question,
        options: mcqData.options.filter(opt => opt.trim() !== ""),
        correctAnswer: mcqData.correctAnswer,
        explanation: mcqData.explanation,
        points: mcqData.points,
        timeLimit: mcqData.timeLimit
      };
    }

    setModules(prev => prev.map(module => 
      module.id === newLesson.moduleId 
        ? { ...module, lessons: [...module.lessons, newLessonObj] }
        : module
    ));

    // Reset form
    setNewLesson({
      title: "",
      type: CONTENT_TYPES.TEXT,
      moduleId: newLesson.moduleId,
      content: {
        text: "",
        videoUrl: "",
        videoPlatform: "youtube",
        thumbnail: "",
        audioUrl: "",
        duration: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
        pdfUrl: "",
        fileName: "",
        linkUrl: "",
        linkTitle: "",
        description: ""
      }
    });

    setMcqData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      points: 1,
      timeLimit: 0
    });
  };

  const updateLesson = (moduleId, lessonId, field, value) => {
    setModules(prev => prev.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
          )
        };
      }
      return module;
    }));
  };

  const deleteLesson = (moduleId, lessonId) => {
    setModules(prev => prev.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
        };
      }
      return module;
    }));
  };

  // Handle content type change
  const handleContentTypeChange = (type) => {
    setNewLesson(prev => ({
      ...prev,
      type,
      content: {
        // Reset content based on type
        text: type === CONTENT_TYPES.TEXT ? prev.content.text : "",
        videoUrl: type === CONTENT_TYPES.VIDEO ? prev.content.videoUrl : "",
        videoPlatform: "youtube",
        thumbnail: "",
        audioUrl: type === CONTENT_TYPES.AUDIO ? prev.content.audioUrl : "",
        duration: "",
        question: type === CONTENT_TYPES.MCQ ? prev.content.question : "",
        options: type === CONTENT_TYPES.MCQ ? prev.content.options : ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
        pdfUrl: type === CONTENT_TYPES.PDF ? prev.content.pdfUrl : "",
        fileName: "",
        linkUrl: type === CONTENT_TYPES.LINK ? prev.content.linkUrl : "",
        linkTitle: "",
        description: ""
      }
    }));
  };

  // Handle MCQ options
  const handleMcqOptionChange = (index, value) => {
    const newOptions = [...mcqData.options];
    newOptions[index] = value;
    setMcqData(prev => ({ ...prev, options: newOptions }));
  };

  const addMcqOption = () => {
    setMcqData(prev => ({ ...prev, options: [...prev.options, ""] }));
  };

  const removeMcqOption = (index) => {
    if (mcqData.options.length > 2) {
      const newOptions = mcqData.options.filter((_, i) => i !== index);
      const newCorrectAnswer = mcqData.correctAnswer >= newOptions.length ? 0 : mcqData.correctAnswer;
      setMcqData(prev => ({ 
        ...prev, 
        options: newOptions,
        correctAnswer: newCorrectAnswer
      }));
    }
  };

  // Handle audio playback
  const handleAudioPlay = () => {
    setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    // Implement actual audio playback logic here
  };

  // Simulate file upload
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Validate form
  const validateForm = () => {
    const errors = [];

    if (!courseInfo.title.trim()) errors.push("Course title is required");
    if (!courseInfo.description.trim()) errors.push("Course description is required");
    if (!courseInfo.category) errors.push("Category is required");
    if (!courseInfo.duration) errors.push("Duration is required");
    
    // Check if at least one module has lessons
    const hasLessons = modules.some(module => module.lessons.length > 0);
    if (!hasLessons) errors.push("At least one lesson is required");

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      const courseData = {
        ...courseInfo,
        modules,
        instructorId: user.uid,
        createdAt: new Date().toISOString(),
        status: "draft" // draft, published, archived
      };

      console.log("Submitting course data:", courseData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert("Course created successfully!");
      router.push("/courses");
      
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Content type icons
  const getContentTypeIcon = (type) => {
    switch(type) {
      case CONTENT_TYPES.TEXT: return <FiFileText className="w-5 h-5" />;
      case CONTENT_TYPES.VIDEO: return <FiVideo className="w-5 h-5" />;
      case CONTENT_TYPES.AUDIO: return <FiHeadphones className="w-5 h-5" />;
      case CONTENT_TYPES.MCQ: return <FaQuestionCircle className="w-5 h-5" />;
      case CONTENT_TYPES.PDF: return <FaFilePdf className="w-5 h-5" />;
      case CONTENT_TYPES.LINK: return <FaLink className="w-5 h-5" />;
      default: return <FiFileText className="w-5 h-5" />;
    }
  };

  // Content type labels
  const getContentTypeLabel = (type) => {
    switch(type) {
      case CONTENT_TYPES.TEXT: return "Text";
      case CONTENT_TYPES.VIDEO: return "Video";
      case CONTENT_TYPES.AUDIO: return "Audio";
      case CONTENT_TYPES.MCQ: return "Quiz";
      case CONTENT_TYPES.PDF: return "PDF";
      case CONTENT_TYPES.LINK: return "Link";
      default: return "Text";
    }
  };

  // Steps for course creation
  const steps = [
    { number: 1, title: "Course Details", description: "Basic information about your course" },
    { number: 2, title: "Curriculum", description: "Add modules and lessons" },
    { number: 3, title: "Pricing", description: "Set course price and offers" },
    { number: 4, title: "Preview", description: "Review and publish your course" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Course
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your knowledge with the world. Create engaging courses with text, video, audio, and quizzes.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex items-center gap-4 cursor-pointer ${
                    activeStep === step.number ? 'opacity-100' : 'opacity-50'
                  }`}
                  onClick={() => setActiveStep(step.number)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    activeStep === step.number
                      ? 'bg-blue-600 text-white'
                      : activeStep > step.number
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {activeStep > step.number ? <FiCheckCircle className="w-6 h-6" /> : step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Course Details */}
            {activeStep === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Course Thumbnail */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Course Thumbnail</h2>
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Thumbnail Preview */}
                    <div className="md:w-1/3">
                      <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                        {courseInfo.thumbnailPreview ? (
                          <img
                            src={courseInfo.thumbnailPreview}
                            alt="Course thumbnail"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaImage className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Upload Area */}
                    <div className="md:w-2/3">
                      <label className="block text-sm font-medium mb-4">
                        Upload Thumbnail (16:9 ratio recommended)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors">
                        <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="mb-2">Drag & drop your image here, or click to browse</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          JPEG, PNG, JPG, WebP (Max 5MB)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <label
                          htmlFor="thumbnail-upload"
                          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                          Browse Files
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Basic Information */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Basic Information</h2>
                  <div className="space-y-6">
                    {/* Course Title */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        value={courseInfo.title}
                        onChange={(e) => handleCourseInfoChange('title', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Complete Web Development Bootcamp"
                        required
                      />
                    </div>

                    {/* Subtitle */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={courseInfo.subtitle}
                        onChange={(e) => handleCourseInfoChange('subtitle', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief description of your course"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Course Description *
                      </label>
                      <textarea
                        value={courseInfo.description}
                        onChange={(e) => handleCourseInfoChange('description', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Detailed description of what students will learn..."
                        required
                      />
                    </div>

                    {/* Category & Difficulty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Category *
                        </label>
                        <select
                          value={courseInfo.category}
                          onChange={(e) => handleCourseInfoChange('category', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Category</option>
                          {COURSE_CATEGORIES.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Difficulty Level *
                        </label>
                        <div className="flex gap-2">
                          {DIFFICULTY_LEVELS.map(level => (
                            <button
                              key={level.value}
                              type="button"
                              onClick={() => handleCourseInfoChange('difficulty', level.value)}
                              className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                                courseInfo.difficulty === level.value
                                  ? `border-2 ${level.color.replace('bg-', 'border-')}`
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            >
                              <span className={courseInfo.difficulty === level.value ? level.color.split(' ')[1] : ''}>
                                {level.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Duration & Language */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Duration *
                        </label>
                        <input
                          type="text"
                          value={courseInfo.duration}
                          onChange={(e) => handleCourseInfoChange('duration', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 42 hours, 8 weeks"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Language
                        </label>
                        <select
                          value={courseInfo.language}
                          onChange={(e) => handleCourseInfoChange('language', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Japanese">Japanese</option>
                          <option value="Chinese">Chinese</option>
                        </select>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tags (Press Enter to add)
                      </label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {courseInfo.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg flex items-center gap-2"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-blue-900 dark:hover:text-blue-300"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add tags (e.g., React, JavaScript, Web Development)"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Certificate & Featured */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="certificate"
                          checked={courseInfo.certificate}
                          onChange={(e) => handleCourseInfoChange('certificate', e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="certificate" className="ml-3 text-sm">
                          Include Certificate of Completion
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={courseInfo.featured}
                          onChange={(e) => handleCourseInfoChange('featured', e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="featured" className="ml-3 text-sm">
                          Mark as Featured Course
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Curriculum */}
            {activeStep === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Modules */}
                {modules.map((module, moduleIndex) => (
                  <motion.div
                    key={module.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {module.order}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">Module {module.order}: {module.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {module.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => deleteModule(module.id)}
                          disabled={modules.length <= 1}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg disabled:opacity-50"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Module Details */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Module Title
                        </label>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                          placeholder="Module title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Module Description
                        </label>
                        <textarea
                          value={module.description}
                          onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                          placeholder="What will students learn in this module?"
                        />
                      </div>
                    </div>

                    {/* Lessons in Module */}
                    <div className="space-y-4">
                      <h4 className="font-semibold mb-4">Lessons in this Module</h4>
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                                {getContentTypeIcon(lesson.type)}
                              </div>
                              <div>
                                <h5 className="font-medium">{lesson.title}</h5>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span>{getContentTypeLabel(lesson.type)}</span>
                                  {lesson.duration && <span>• {lesson.duration}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => deleteLesson(module.id, lesson.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Add Module Button */}
                <motion.div variants={itemVariants} className="text-center">
                  <button
                    type="button"
                    onClick={addModule}
                    className="px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl hover:border-blue-500 transition-colors w-full"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <FiPlus className="w-6 h-6" />
                      <span className="font-medium">Add New Module</span>
                    </div>
                  </button>
                </motion.div>

                {/* Add Lesson Form */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Add New Lesson</h2>
                  
                  {/* Lesson Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">
                      Select Lesson Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {Object.values(CONTENT_TYPES).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleContentTypeChange(type)}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                            newLesson.type === type
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          {getContentTypeIcon(type)}
                          <span className="text-sm font-medium">{getContentTypeLabel(type)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Module Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Select Module
                    </label>
                    <select
                      value={newLesson.moduleId}
                      onChange={(e) => setNewLesson(prev => ({ ...prev, moduleId: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                    >
                      {modules.map(module => (
                        <option key={module.id} value={module.id}>
                          Module {module.order}: {module.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lesson Title */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Lesson Title *
                    </label>
                    <input
                      type="text"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                      placeholder="Enter lesson title"
                      required
                    />
                  </div>

                  {/* Content Based on Type */}
                  <AnimatePresence mode="wait">
                    {/* Text Content */}
                    {newLesson.type === CONTENT_TYPES.TEXT && (
                      <motion.div
                        key="text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <label className="block text-sm font-medium mb-2">
                          Lesson Content
                        </label>
                        <textarea
                          value={newLesson.content.text}
                          onChange={(e) => setNewLesson(prev => ({
                            ...prev,
                            content: { ...prev.content, text: e.target.value }
                          }))}
                          rows={8}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                          placeholder="Write your lesson content here..."
                        />
                      </motion.div>
                    )}

                    {/* Video Content */}
                    {newLesson.type === CONTENT_TYPES.VIDEO && (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Video Platform
                          </label>
                          <select
                            value={newLesson.content.videoPlatform}
                            onChange={(e) => setNewLesson(prev => ({
                              ...prev,
                              content: { ...prev.content, videoPlatform: e.target.value }
                            }))}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                          >
                            <option value="youtube">YouTube</option>
                            <option value="vimeo">Vimeo</option>
                            <option value="custom">Custom URL</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Video URL *
                          </label>
                          <input
                            type="url"
                            value={newLesson.content.videoUrl}
                            onChange={(e) => setNewLesson(prev => ({
                              ...prev,
                              content: { ...prev.content, videoUrl: e.target.value }
                            }))}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            placeholder="https://youtube.com/watch?v=..."
                            required
                          />
                        </div>

                        {newLesson.content.videoPlatform === 'youtube' && (
                          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <FaYoutube className="w-5 h-5 text-red-600" />
                              <span className="font-medium">YouTube Video</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Paste the full YouTube URL. The video will be embedded automatically.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Audio Content */}
                    {newLesson.type === CONTENT_TYPES.AUDIO && (
                      <motion.div
                        key="audio"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Audio File URL *
                          </label>
                          <div className="flex gap-3">
                            <input
                              type="url"
                              value={newLesson.content.audioUrl}
                              onChange={(e) => setNewLesson(prev => ({
                                ...prev,
                                content: { ...prev.content, audioUrl: e.target.value }
                              }))}
                              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                              placeholder="https://example.com/audio.mp3"
                              required
                            />
                            <button
                              type="button"
                              onClick={simulateUpload}
                              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl"
                            >
                              {isUploading ? 'Uploading...' : 'Upload'}
                            </button>
                          </div>
                          {isUploading && (
                            <div className="mt-2">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${uploadProgress}%` }}
                                  className="h-full bg-blue-600"
                                />
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{uploadProgress}%</div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Duration (optional)
                          </label>
                          <input
                            type="text"
                            value={newLesson.content.duration}
                            onChange={(e) => setNewLesson(prev => ({
                              ...prev,
                              content: { ...prev.content, duration: e.target.value }
                            }))}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            placeholder="e.g., 15:30"
                          />
                        </div>

                        {/* Audio Player Preview */}
                        {newLesson.content.audioUrl && (
                          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={handleAudioPlay}
                                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
                                >
                                  {audioState.isPlaying ? (
                                    <FiPause className="w-5 h-5" />
                                  ) : (
                                    <FiPlay className="w-5 h-5" />
                                  )}
                                </button>
                                <div>
                                  <p className="font-medium">Audio Preview</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {newLesson.content.duration || '0:00'}
                                  </p>
                                </div>
                              </div>
                              <FiVolume2 className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600"
                                style={{ width: `${(audioState.currentTime / audioState.duration) * 100 || 0}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* MCQ Content */}
                    {newLesson.type === CONTENT_TYPES.MCQ && (
                      <motion.div
                        key="mcq"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        {/* Question */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Question *
                          </label>
                          <textarea
                            value={mcqData.question}
                            onChange={(e) => setMcqData(prev => ({ ...prev, question: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            placeholder="Enter your question here..."
                            required
                          />
                        </div>

                        {/* Options */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium">
                              Options *
                            </label>
                            <button
                              type="button"
                              onClick={addMcqOption}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Add Option
                            </button>
                          </div>
                          <div className="space-y-3">
                            {mcqData.options.map((option, index) => (
                              <div key={index} className="flex gap-3">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={mcqData.correctAnswer === index}
                                    onChange={() => setMcqData(prev => ({ ...prev, correctAnswer: index }))}
                                    className="w-5 h-5 text-blue-600"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handleMcqOptionChange(index, e.target.value)}
                                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                                  placeholder={`Option ${index + 1}`}
                                  required
                                />
                                {mcqData.options.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => removeMcqOption(index)}
                                    className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Points & Time Limit */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Points
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={mcqData.points}
                              onChange={(e) => setMcqData(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Time Limit (seconds)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={mcqData.timeLimit}
                              onChange={(e) => setMcqData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 0 }))}
                              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                              placeholder="0 for no time limit"
                            />
                          </div>
                        </div>

                        {/* Explanation */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Explanation (optional)
                          </label>
                          <textarea
                            value={mcqData.explanation}
                            onChange={(e) => setMcqData(prev => ({ ...prev, explanation: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            placeholder="Explain why the correct answer is right..."
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* PDF Content */}
                    {newLesson.type === CONTENT_TYPES.PDF && (
                      <motion.div
                        key="pdf"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            PDF File URL *
                          </label>
                          <div className="flex gap-3">
                            <input
                              type="url"
                              value={newLesson.content.pdfUrl}
                              onChange={(e) => setNewLesson(prev => ({
                                ...prev,
                                content: { ...prev.content, pdfUrl: e.target.value }
                              }))}
                              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                              placeholder="https://example.com/document.pdf"
                              required
                            />
                            <button
                              type="button"
                              onClick={simulateUpload}
                              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl"
                            >
                              {isUploading ? 'Uploading...' : 'Upload PDF'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            File Name (optional)
                          </label>
                          <input
                            type="text"
                            value={newLesson.content.fileName}
                            onChange={(e) => setNewLesson(prev => ({
                              ...prev,
                              content: { ...prev.content, fileName: e.target.value }
                            }))}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            placeholder="e.g., Course-Syllabus.pdf"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Link Content */}
                    {newLesson.type === CONTENT_TYPES.LINK && (
                      <motion.div
                        key="link"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Link URL *
                          </label>
                          <input
                            type="url"
                            value={newLesson.content.linkUrl}
                            onChange={(e) => setNewLesson(prev => ({
                              ...prev,
                              content: { ...prev.content, linkUrl: e.target.value }
                            }))}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            placeholder="https://example.com/resource"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Link Title
                          </label>
                          <input
                            type="text"
                            value={newLesson.content.linkTitle}
                            onChange={(e) => setNewLesson(prev => ({
                              ...prev,
                              content: { ...prev.content, linkTitle: e.target.value }
                            }))}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            placeholder="e.g., Official Documentation"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Description
                          </label>
                          <textarea
                            value={newLesson.content.description}
                            onChange={(e) => setNewLesson(prev => ({
                              ...prev,
                              content: { ...prev.content, description: e.target.value }
                            }))}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                            placeholder="Brief description of what this link contains..."
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Add Lesson Button */}
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={addLesson}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium"
                    >
                      Add Lesson to Module
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Pricing */}
            {activeStep === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Pricing Options */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Pricing Options</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Free */}
                    <button
                      type="button"
                      onClick={() => handleCourseInfoChange('price', 0)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        courseInfo.price === 0
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">Free</div>
                        <p className="text-gray-600 dark:text-gray-400">Make course available for free</p>
                      </div>
                    </button>

                    {/* Paid */}
                    <button
                      type="button"
                      onClick={() => handleCourseInfoChange('price', 49.99)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        courseInfo.price > 0
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">Paid</div>
                        <p className="text-gray-600 dark:text-gray-400">Charge for your course</p>
                      </div>
                    </button>

                    {/* Subscription */}
                    <button
                      type="button"
                      onClick={() => alert("Subscription model coming soon!")}
                      className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 opacity-50 cursor-not-allowed"
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">Subscription</div>
                        <p className="text-gray-600 dark:text-gray-400">Coming Soon</p>
                      </div>
                    </button>
                  </div>

                  {/* Price Input */}
                  {courseInfo.price > 0 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Course Price ($) *
                          </label>
                          <div className="relative">
                            <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={courseInfo.price}
                              onChange={(e) => handleCourseInfoChange('price', parseFloat(e.target.value) || 0)}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                              placeholder="49.99"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Discounted Price ($) (optional)
                          </label>
                          <div className="relative">
                            <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={courseInfo.discountedPrice}
                              onChange={(e) => handleCourseInfoChange('discountedPrice', e.target.value)}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                              placeholder="29.99"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Discount Calculator */}
                      {courseInfo.discountedPrice && courseInfo.price > 0 && (
                        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Discount Percentage</p>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {Math.round(((courseInfo.price - parseFloat(courseInfo.discountedPrice)) / courseInfo.price) * 100)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">You Save</p>
                              <p className="text-2xl font-bold">
                                ${(courseInfo.price - parseFloat(courseInfo.discountedPrice)).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Revenue Calculator */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Revenue Calculator</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated Students</p>
                      <input
                        type="number"
                        min="0"
                        value={100}
                        readOnly
                        className="w-full text-2xl font-bold bg-transparent border-none focus:ring-0 p-0"
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Platform Fee (30%)</p>
                      <div className="text-2xl font-bold">
                        ${(courseInfo.price * 100 * 0.3).toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl">
                      <p className="text-sm mb-2">Your Earnings</p>
                      <div className="text-2xl font-bold">
                        ${(courseInfo.price * 100 * 0.7).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 4: Preview */}
            {activeStep === 4 && (
              <motion.div
                key="step4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Course Preview */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Course Preview</h2>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {previewMode ? 'Edit Mode' : 'Preview Mode'}
                    </button>
                  </div>

                  {previewMode ? (
                    <div className="space-y-6">
                      {/* Course Header */}
                      <div className={`aspect-video rounded-xl bg-gradient-to-br ${courseInfo.thumbnailPreview ? '' : 'from-blue-500 to-purple-600'} overflow-hidden`}>
                        {courseInfo.thumbnailPreview ? (
                          <img
                            src={courseInfo.thumbnailPreview}
                            alt="Course thumbnail"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaImage className="w-24 h-24 text-white/50" />
                          </div>
                        )}
                      </div>

                      {/* Course Info */}
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{courseInfo.title || "Course Title"}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{courseInfo.subtitle || "Course Subtitle"}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${DIFFICULTY_LEVELS.find(l => l.value === courseInfo.difficulty)?.color}`}>
                            {courseInfo.difficulty.charAt(0).toUpperCase() + courseInfo.difficulty.slice(1)}
                          </span>
                          {courseInfo.category && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                              {courseInfo.category}
                            </span>
                          )}
                          {courseInfo.certificate && (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                              Certificate
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{courseInfo.description || "Course description will appear here..."}</p>
                      </div>

                      {/* Modules Preview */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">Curriculum</h3>
                        {modules.map((module) => (
                          <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                            <h4 className="font-bold mb-2">Module {module.order}: {module.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{module.description}</p>
                            <div className="space-y-2">
                              {module.lessons.map((lesson) => (
                                <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                  <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                                    {getContentTypeIcon(lesson.type)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{lesson.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {getContentTypeLabel(lesson.type)} • {lesson.duration || 'No duration'}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Validation Summary */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <h4 className="font-bold mb-3">Validation Summary</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Course Title</span>
                            <span className={courseInfo.title ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {courseInfo.title ? '✓' : '✗'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Description</span>
                            <span className={courseInfo.description ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {courseInfo.description ? '✓' : '✗'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Category</span>
                            <span className={courseInfo.category ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {courseInfo.category ? '✓' : '✗'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Total Lessons</span>
                            <span className={modules.some(m => m.lessons.length > 0) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{modules.length}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Modules</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {modules.reduce((acc, module) => acc + module.lessons.length, 0)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Lessons</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {courseInfo.price === 0 ? 'Free' : `$${courseInfo.price}`}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-center">
                          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                            {courseInfo.duration || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Publish Options */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Publish Options</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                      <div>
                        <h4 className="font-medium">Save as Draft</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Save course and continue editing later</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg disabled:opacity-50"
                      >
                        Save Draft
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-blue-200 dark:border-blue-800 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                      <div>
                        <h4 className="font-medium">Publish Course</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Make course available to students</p>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg disabled:opacity-50"
                      >
                        {isSubmitting ? 'Publishing...' : 'Publish Now'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-green-200 dark:border-green-800 rounded-xl bg-green-50 dark:bg-green-900/20">
                      <div>
                        <h4 className="font-medium">Schedule Publish</h4>
                        <p className="text-sm text-green-600 dark:text-green-400">Set a future date to publish automatically</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Scheduling feature coming soon!')}
                        className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg"
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div variants={itemVariants} className="mt-8 flex justify-between">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(prev => prev - 1)}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Previous
              </button>
            )}

            <div className="ml-auto flex gap-4">
              {activeStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(prev => prev + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating Course...' : 'Create Course'}
                </button>
              )}
            </div>
          </motion.div>
        </form>

        {/* Database Integration Notes */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">
            🗄️ Database Integration Ready
          </h3>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
            <p>This component uses static data. For production, implement these API endpoints:</p>
            <pre className="mt-4 p-4 bg-black/10 dark:bg-white/5 rounded-lg text-xs overflow-x-auto">
{`// API Route: app/api/courses/create/route.js
export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.json();
    
    // Upload thumbnail to storage (e.g., AWS S3, Firebase Storage)
    let thumbnailUrl = '';
    if (formData.thumbnail) {
      thumbnailUrl = await uploadToStorage(formData.thumbnail, 'course-thumbnails');
    }

    // Upload other media files
    const processedModules = await Promise.all(formData.modules.map(async (module) => {
      const processedLessons = await Promise.all(module.lessons.map(async (lesson) => {
        let mediaUrl = '';
        
        switch(lesson.type) {
          case 'video':
          case 'audio':
          case 'pdf':
            if (lesson.content.videoUrl || lesson.content.audioUrl || lesson.content.pdfUrl) {
              mediaUrl = await uploadToStorage(
                lesson.content.mediaFile,
                \`course-content/\${lesson.type}s\`
              );
            }
            break;
        }
        
        return {
          ...lesson,
          content: {
            ...lesson.content,
            mediaUrl
          }
        };
      }));
      
      return {
        ...module,
        lessons: processedLessons
      };
    }));

    // Save to database
    const courseData = {
      ...formData,
      thumbnailUrl,
      modules: processedModules,
      instructorId: session.user.id,
      status: 'draft', // or 'published' based on user choice
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        enrolledStudents: 0,
        rating: 0,
        totalReviews: 0
      }
    };

    const db = await connectToDatabase();
    const result = await db.collection('courses').insertOne(courseData);

    return NextResponse.json({
      success: true,
      courseId: result.insertedId,
      message: 'Course created successfully'
    });

  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Course Schema Example:
const CourseSchema = {
  title: string,
  subtitle: string,
  description: string,
  category: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  price: number,
  discountedPrice: number | null,
  duration: string,
  language: string,
  certificate: boolean,
  featured: boolean,
  tags: string[],
  thumbnailUrl: string,
  modules: Array<{
    title: string,
    description: string,
    order: number,
    lessons: Array<{
      title: string,
      type: 'text' | 'video' | 'audio' | 'mcq' | 'pdf' | 'link',
      order: number,
      isPublished: boolean,
      content: {
        // Text
        text?: string,
        // Video
        videoUrl?: string,
        videoPlatform?: string,
        // Audio
        audioUrl?: string,
        duration?: string,
        // MCQ
        question?: string,
        options?: string[],
        correctAnswer?: number,
        explanation?: string,
        points?: number,
        timeLimit?: number,
        // PDF
        pdfUrl?: string,
        fileName?: string,
        // Link
        linkUrl?: string,
        linkTitle?: string,
        description?: string
      }
    }>
  }>,
  instructorId: ObjectId,
  status: 'draft' | 'published' | 'archived',
  createdAt: Date,
  updatedAt: Date
};`}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
}