"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlay, 
  FiPause, 
  FiVolume2, 
  FiVolumeX,
  FiMaximize,
  FiChevronLeft,
  FiChevronRight,
  FiBook,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiMessageSquare,
  FiHeart,
  FiBookmark,
  FiShare,
  FiAward,
  FiBarChart2,
  FiHelpCircle,
  FiArrowRight,
  FiX,
  FiSkipForward,
  FiSkipBack,
  FiRefreshCw,
  FiEye,
  FiEyeOff,
  FiSettings
} from "react-icons/fi";
import { 
  FaYoutube, 
  FaVimeo,
  FaFilePdf,
  FaImage,
  FaMusic,
  FaQuestionCircle,
  FaCheck,
  FaTimes,
  FaRegStar,
  FaStar,
  FaFire
} from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

// Content types
const CONTENT_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  TEXT: 'text',
  MCQ: 'mcq',
  PDF: 'pdf',
  IMAGE: 'image',
  LINK: 'link'
};

// Example course data with lessons and content
const EXAMPLE_COURSE = {
  id: 9,
  title: "Machine Learning with TensorFlow 2.0",
  instructor: "Dr. Sarah Miller",
  category: "Artificial Intelligence",
  progress: 42, // Overall course progress percentage
  
  modules: [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Get started with ML concepts and fundamentals",
      progress: 75,
      lessons: [
        {
          id: 101,
          title: "Welcome to the Course",
          type: CONTENT_TYPES.VIDEO,
          duration: "5:30",
          isCompleted: true,
          content: {
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPlatform: "youtube",
            transcript: "Welcome to our Machine Learning course! In this lesson, we'll explore..."
          },
          resources: [
            { id: 1, name: "Course Syllabus", type: "pdf", size: "2.1 MB" },
            { id: 2, name: "Setup Instructions", type: "pdf", size: "1.5 MB" }
          ]
        },
        {
          id: 102,
          title: "What is Machine Learning?",
          type: CONTENT_TYPES.TEXT,
          duration: "10 min",
          isCompleted: true,
          content: {
            text: `# What is Machine Learning?
            
Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.

## Key Concepts:

1. **Supervised Learning**: Learning from labeled data
2. **Unsupervised Learning**: Finding patterns in unlabeled data
3. **Reinforcement Learning**: Learning through rewards and penalties

## Real-World Applications:
- Image recognition
- Natural language processing
- Recommendation systems
- Fraud detection`
          }
        },
        {
          id: 103,
          title: "Types of ML Algorithms",
          type: CONTENT_TYPES.VIDEO,
          duration: "12:45",
          isCompleted: true,
          content: {
            videoUrl: "https://player.vimeo.com/video/76979871",
            videoPlatform: "vimeo",
            transcript: "In this video, we explore different types of machine learning algorithms..."
          }
        },
        {
          id: 104,
          title: "Quiz: ML Fundamentals",
          type: CONTENT_TYPES.MCQ,
          duration: "15 min",
          isCompleted: false,
          score: 0,
          maxScore: 10,
          content: {
            question: "Which of the following is NOT a type of machine learning?",
            options: [
              "Supervised Learning",
              "Unsupervised Learning",
              "Semi-supervised Learning",
              "Manual Learning",
              "Reinforcement Learning"
            ],
            correctAnswer: 3, // Index of correct answer
            explanation: "Manual Learning is not a recognized type of machine learning. The three main types are supervised, unsupervised, and reinforcement learning."
          }
        }
      ]
    },
    {
      id: 2,
      title: "TensorFlow Fundamentals",
      description: "Learn TensorFlow basics and core concepts",
      progress: 40,
      lessons: [
        {
          id: 201,
          title: "Introduction to TensorFlow",
          type: CONTENT_TYPES.VIDEO,
          duration: "8:20",
          isCompleted: true,
          content: {
            videoUrl: "https://www.youtube.com/embed/tPYj3fFJGjk",
            videoPlatform: "youtube",
            transcript: "TensorFlow is an open-source library developed by Google..."
          }
        },
        {
          id: 202,
          title: "Tensors and Operations",
          type: CONTENT_TYPES.TEXT,
          duration: "15 min",
          isCompleted: false,
          content: {
            text: `# Tensors in TensorFlow
            
A tensor is a generalization of vectors and matrices to potentially higher dimensions.

## Tensor Properties:
- **Rank**: Number of dimensions
- **Shape**: Size of each dimension
- **Type**: Data type (float32, int64, etc.)

## Common Operations:
- Addition, subtraction, multiplication
- Matrix operations
- Reduction operations`
          }
        },
        {
          id: 203,
          title: "Hands-on: First Neural Network",
          type: CONTENT_TYPES.VIDEO,
          duration: "25:10",
          isCompleted: false,
          content: {
            videoUrl: "https://www.youtube.com/embed/cKxRvEZd3Mw",
            videoPlatform: "youtube",
            transcript: "Let's build our first neural network using TensorFlow..."
          },
          resources: [
            { id: 3, name: "Notebook Code", type: "link", url: "https://colab.research.google.com" },
            { id: 4, name: "Dataset", type: "csv", size: "4.2 MB" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Neural Networks Deep Dive",
      description: "Advanced neural network architectures",
      progress: 0,
      lessons: [
        {
          id: 301,
          title: "ANN Architecture",
          type: CONTENT_TYPES.VIDEO,
          duration: "18:30",
          isCompleted: false,
          content: {
            videoUrl: "https://player.vimeo.com/video/148003366",
            videoPlatform: "vimeo"
          }
        },
        {
          id: 302,
          title: "CNN for Image Recognition",
          type: CONTENT_TYPES.IMAGE,
          duration: "20 min",
          isCompleted: false,
          content: {
            imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200",
            caption: "Convolutional Neural Network Architecture",
            description: "CNNs are particularly effective for image recognition tasks..."
          }
        },
        {
          id: 303,
          title: "Audio Processing Lab",
          type: CONTENT_TYPES.AUDIO,
          duration: "22:15",
          isCompleted: false,
          content: {
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            transcript: "In this audio lesson, we'll explore audio processing techniques..."
          }
        }
      ]
    }
  ],
  
  resources: [
    { id: 1, name: "Complete Course Notes", type: "pdf", downloads: 1250 },
    { id: 2, name: "TensorFlow Cheat Sheet", type: "pdf", downloads: 890 },
    { id: 3, name: "Dataset Collection", type: "zip", downloads: 720 },
    { id: 4, name: "Project Templates", type: "zip", downloads: 540 }
  ],
  
  discussions: [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "AJ",
      time: "2 hours ago",
      content: "Having trouble with the gradient descent implementation. Can someone help?",
      replies: 5,
      upvotes: 12
    },
    {
      id: 2,
      user: "Sarah Chen",
      avatar: "SC",
      time: "1 day ago",
      content: "Great explanation on backpropagation! Really helped clarify things.",
      replies: 2,
      upvotes: 25
    }
  ]
};

export default function CourseLearning() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const courseId = params.id;
  
  const [course, setCourse] = useState(EXAMPLE_COURSE);
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showResources, setShowResources] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const playerContainerRef = useRef(null);
  
  // Simulate API call
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchCourseContent(courseId);
    setCourse(EXAMPLE_COURSE);
  }, [courseId]);
  
  // Redirect if not authenticated or not enrolled
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    // TODO: Check if user is enrolled in this course
  }, [user, loading, router]);
  
  // Video/Audio controls
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (currentLesson?.type === CONTENT_TYPES.VIDEO && videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    }
    if (currentLesson?.type === CONTENT_TYPES.AUDIO && audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume / 100;
    if (audioRef.current) audioRef.current.volume = newVolume / 100;
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
    if (audioRef.current) audioRef.current.muted = !isMuted;
  };
  
  const handleProgressChange = (e) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) videoRef.current.currentTime = newTime;
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  const markAsCompleted = (moduleIndex, lessonIndex) => {
    const updatedCourse = { ...course };
    updatedCourse.modules[moduleIndex].lessons[lessonIndex].isCompleted = true;
    setCourse(updatedCourse);
    
    // Calculate new progress
    const totalLessons = updatedCourse.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = updatedCourse.modules.reduce(
      (acc, module) => acc + module.lessons.filter(lesson => lesson.isCompleted).length,
      0
    );
    const newProgress = Math.round((completedLessons / totalLessons) * 100);
    updatedCourse.progress = newProgress;
    
    // Update module progress
    updatedCourse.modules[moduleIndex].progress = Math.round(
      (updatedCourse.modules[moduleIndex].lessons.filter(l => l.isCompleted).length / 
       updatedCourse.modules[moduleIndex].lessons.length) * 100
    );
    
    setCourse(updatedCourse);
    // TODO: Save progress to database
  };
  
  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };
  
  const submitQuiz = () => {
    const currentQuiz = currentLesson?.content;
    if (!currentQuiz) return;
    
    const isCorrect = quizAnswers[currentLesson.id] === currentQuiz.correctAnswer;
    const score = isCorrect ? 10 : 0;
    
    const updatedCourse = { ...course };
    const moduleIndex = selectedModule;
    const lessonIndex = selectedLesson;
    
    updatedCourse.modules[moduleIndex].lessons[lessonIndex].score = score;
    updatedCourse.modules[moduleIndex].lessons[lessonIndex].isCompleted = true;
    setCourse(updatedCourse);
    setQuizSubmitted(true);
    
    // TODO: Save quiz results to database
  };
  
  const nextLesson = () => {
    if (selectedLesson < currentModule.lessons.length - 1) {
      setSelectedLesson(selectedLesson + 1);
      setQuizSubmitted(false);
      setQuizAnswers({});
    } else if (selectedModule < course.modules.length - 1) {
      setSelectedModule(selectedModule + 1);
      setSelectedLesson(0);
      setQuizSubmitted(false);
      setQuizAnswers({});
    }
  };
  
  const prevLesson = () => {
    if (selectedLesson > 0) {
      setSelectedLesson(selectedLesson - 1);
      setQuizSubmitted(false);
      setQuizAnswers({});
    } else if (selectedModule > 0) {
      setSelectedModule(selectedModule - 1);
      setSelectedLesson(course.modules[selectedModule - 1].lessons.length - 1);
      setQuizSubmitted(false);
      setQuizAnswers({});
    }
  };
  
  const downloadResource = (resource) => {
    console.log(`Downloading ${resource.name}`);
    // TODO: Implement actual download
  };
  
  // Helper functions
  const currentModule = course.modules[selectedModule];
  const currentLesson = currentModule?.lessons[selectedLesson];
  
  const getContentIcon = (type) => {
    switch(type) {
      case CONTENT_TYPES.VIDEO: return <MdOutlineOndemandVideo className="w-5 h-5" />;
      case CONTENT_TYPES.AUDIO: return <FaMusic className="w-5 h-5" />;
      case CONTENT_TYPES.TEXT: return <IoDocumentText className="w-5 h-5" />;
      case CONTENT_TYPES.MCQ: return <FaQuestionCircle className="w-5 h-5" />;
      case CONTENT_TYPES.PDF: return <FaFilePdf className="w-5 h-5" />;
      case CONTENT_TYPES.IMAGE: return <FaImage className="w-5 h-5" />;
      case CONTENT_TYPES.LINK: return <FiShare className="w-5 h-5" />;
      default: return <FiBook className="w-5 h-5" />;
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-700 rounded-lg"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-lg truncate max-w-md">{course.title}</h1>
              <p className="text-sm text-gray-400">{course.instructor} • {course.category}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Course Progress */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <button className="p-2 hover:bg-gray-700 rounded-lg" title="Bookmark">
              <FiBookmark className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg" title="Notes">
              <FiMessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg" title="Settings">
              <FiSettings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video/Content Player */}
          <div 
            ref={playerContainerRef}
            className="relative bg-black aspect-video lg:aspect-auto lg:h-2/3"
          >
            {/* Video Player */}
            {currentLesson?.type === CONTENT_TYPES.VIDEO && (
              <div className="relative w-full h-full">
                <iframe
                  ref={videoRef}
                  src={`${currentLesson.content.videoUrl}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
                
                {/* Custom Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleProgressChange}
                      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                    <div className="flex justify-between text-sm text-gray-300 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="p-2 hover:bg-white/10 rounded-full"
                      >
                        {isPlaying ? (
                          <FiPause className="w-6 h-6" />
                        ) : (
                          <FiPlay className="w-6 h-6" />
                        )}
                      </button>
                      
                      <button
                        onClick={prevLesson}
                        className="p-2 hover:bg-white/10 rounded-full"
                      >
                        <FiSkipBack className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={nextLesson}
                        className="p-2 hover:bg-white/10 rounded-full"
                      >
                        <FiSkipForward className="w-5 h-5" />
                      </button>
                      
                      {/* Volume Control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleMute}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          {isMuted ? (
                            <FiVolumeX className="w-5 h-5" />
                          ) : (
                            <FiVolume2 className="w-5 h-5" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Playback Speed */}
                      <select
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                        className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
                      >
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1">1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                      </select>
                      
                      {/* Quality */}
                      <select
                        value={videoQuality}
                        onChange={(e) => setVideoQuality(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
                      >
                        <option value="360p">360p</option>
                        <option value="480p">480p</option>
                        <option value="720p">720p</option>
                        <option value="1080p">1080p</option>
                      </select>
                      
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-white/10 rounded-full"
                      >
                        <FiMaximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Audio Player */}
            {currentLesson?.type === CONTENT_TYPES.AUDIO && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                <div className="max-w-md w-full p-8">
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8">
                    <div className="text-center mb-8">
                      <FaMusic className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">{currentLesson.title}</h3>
                      <p className="text-gray-400">{currentLesson.duration}</p>
                    </div>
                    
                    {/* Audio Controls */}
                    <div className="space-y-6">
                      <div>
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          value={currentTime}
                          onChange={handleProgressChange}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6">
                        <button
                          onClick={prevLesson}
                          className="p-3 hover:bg-gray-700 rounded-full"
                        >
                          <FiSkipBack className="w-6 h-6" />
                        </button>
                        
                        <button
                          onClick={togglePlay}
                          className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full"
                        >
                          {isPlaying ? (
                            <FiPause className="w-8 h-8" />
                          ) : (
                            <FiPlay className="w-8 h-8" />
                          )}
                        </button>
                        
                        <button
                          onClick={nextLesson}
                          className="p-3 hover:bg-gray-700 rounded-full"
                        >
                          <FiSkipForward className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={toggleMute}
                          className="p-2 hover:bg-gray-700 rounded"
                        >
                          {isMuted ? (
                            <FiVolumeX className="w-5 h-5" />
                          ) : (
                            <FiVolume2 className="w-5 h-5" />
                          )}
                        </button>
                        
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Text Content */}
            {currentLesson?.type === CONTENT_TYPES.TEXT && (
              <div className="w-full h-full overflow-y-auto bg-gray-900 p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-6">{currentLesson.title}</h1>
                    <div className="text-gray-300 leading-relaxed">
                      {currentLesson.content.text.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4">
                          {paragraph.startsWith('#') ? (
                            <span className="text-2xl font-bold">{paragraph.replace('#', '')}</span>
                          ) : paragraph.startsWith('##') ? (
                            <span className="text-xl font-bold">{paragraph.replace('##', '')}</span>
                          ) : paragraph.startsWith('###') ? (
                            <span className="text-lg font-bold">{paragraph.replace('###', '')}</span>
                          ) : paragraph.startsWith('- ') ? (
                            <li className="ml-4">{paragraph.replace('- ', '')}</li>
                          ) : paragraph.startsWith('1. ') ? (
                            <li className="ml-4">{paragraph.replace('1. ', '')}</li>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* MCQ Quiz */}
            {currentLesson?.type === CONTENT_TYPES.MCQ && (
              <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Quiz: {currentLesson.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            {currentLesson.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiAward className="w-4 h-4" />
                            Score: {currentLesson.score}/{currentLesson.maxScore}
                          </span>
                        </div>
                      </div>
                      
                      {!quizSubmitted && (
                        <button
                          onClick={submitQuiz}
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium"
                        >
                          Submit Answer
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-gray-900/50 rounded-xl">
                        <h3 className="text-lg font-bold mb-4">{currentLesson.content.question}</h3>
                        
                        <div className="space-y-3">
                          {currentLesson.content.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => !quizSubmitted && handleQuizAnswer(currentLesson.id, index)}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-4 rounded-lg border transition-all ${
                                quizAnswers[currentLesson.id] === index
                                  ? quizSubmitted
                                    ? index === currentLesson.content.correctAnswer
                                      ? 'border-green-500 bg-green-900/20'
                                      : 'border-red-500 bg-red-900/20'
                                    : 'border-blue-500 bg-blue-900/20'
                                  : 'border-gray-700 hover:border-gray-600 hover:bg-gray-700/50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {quizSubmitted && index === currentLesson.content.correctAnswer && (
                                  <FaCheck className="w-5 h-5 text-green-500" />
                                )}
                                {quizSubmitted && quizAnswers[currentLesson.id] === index && 
                                 index !== currentLesson.content.correctAnswer && (
                                  <FaTimes className="w-5 h-5 text-red-500" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {quizSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 bg-gray-900/50 rounded-xl"
                        >
                          <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <FiHelpCircle className="w-5 h-5 text-blue-400" />
                            Explanation
                          </h4>
                          <p className="text-gray-300">{currentLesson.content.explanation}</p>
                          
                          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Your Score</p>
                                <p className="text-2xl font-bold">
                                  {currentLesson.score}/{currentLesson.maxScore}
                                </p>
                              </div>
                              <button
                                onClick={nextLesson}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Image Content */}
            {currentLesson?.type === CONTENT_TYPES.IMAGE && (
              <div className="w-full h-full overflow-y-auto bg-gray-900 p-8">
                <div className="max-w-6xl mx-auto">
                  <div className="bg-gray-800 rounded-2xl overflow-hidden">
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                      <img
                        src={currentLesson.content.imageUrl}
                        alt={currentLesson.content.caption}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>
                      <p className="text-gray-300 mb-6">{currentLesson.content.description}</p>
                      <p className="text-sm text-gray-400 italic">{currentLesson.content.caption}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* PDF Viewer */}
            {currentLesson?.type === CONTENT_TYPES.PDF && (
              <div className="w-full h-full bg-gray-900">
                <div className="h-16 bg-gray-800 flex items-center justify-between px-4">
                  <h3 className="font-bold">{currentLesson.title}</h3>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2">
                    <FiDownload className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
                <div className="h-[calc(100%-4rem)] flex items-center justify-center">
                  <div className="text-center">
                    <FaFilePdf className="w-24 h-24 text-red-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">PDF Document</h4>
                    <p className="text-gray-400 mb-6">PDF viewer will be implemented with database integration</p>
                    <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                      Open in New Tab
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Completion Button */}
            {currentLesson?.type !== CONTENT_TYPES.MCQ && !currentLesson?.isCompleted && (
              <div className="absolute bottom-20 right-8">
                <button
                  onClick={() => markAsCompleted(selectedModule, selectedLesson)}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium flex items-center gap-2 shadow-lg"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  Mark as Complete
                </button>
              </div>
            )}
          </div>
          
          {/* Lesson Info & Tabs */}
          <div className="bg-gray-800 border-t border-gray-700">
            <div className="flex border-b border-gray-700">
              {["content", "resources", "notes", "discussions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="p-4">
              <AnimatePresence mode="wait">
                {/* Content Tab */}
                {activeTab === "content" && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-xl font-bold mb-3">{currentLesson?.title}</h3>
                    {currentLesson?.content.transcript && (
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300">{currentLesson.content.transcript}</p>
                      </div>
                    )}
                  </motion.div>
                )}
                
                {/* Resources Tab */}
                {activeTab === "resources" && (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentLesson?.resources?.map((resource) => (
                        <div
                          key={resource.id}
                          className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {resource.type === 'pdf' ? (
                                <FaFilePdf className="w-6 h-6 text-red-400" />
                              ) : resource.type === 'link' ? (
                                <FiShare className="w-6 h-6 text-blue-400" />
                              ) : (
                                <FiDownload className="w-6 h-6 text-green-400" />
                              )}
                              <div>
                                <h4 className="font-medium">{resource.name}</h4>
                                <p className="text-sm text-gray-400">
                                  {resource.type.toUpperCase()} • {resource.size || 'Link'}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => downloadResource(resource)}
                              className="p-2 hover:bg-gray-600 rounded"
                            >
                              <FiDownload className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {course.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FaFilePdf className="w-6 h-6 text-red-400" />
                              <div>
                                <h4 className="font-medium">{resource.name}</h4>
                                <p className="text-sm text-gray-400">
                                  {resource.downloads.toLocaleString()} downloads
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => downloadResource(resource)}
                              className="p-2 hover:bg-gray-600 rounded"
                            >
                              <FiDownload className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Notes Tab */}
                {activeTab === "notes" && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Personal Notes</h3>
                      <button
                        onClick={() => setShowNotes(!showNotes)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                      >
                        {showNotes ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {showNotes ? (
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Take notes here... Your notes will be saved automatically."
                        className="w-full h-48 bg-gray-900 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <FiMessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Notes are hidden. Click the eye icon to show your notes.</p>
                      </div>
                    )}
                  </motion.div>
                )}
                
                {/* Discussions Tab */}
                {activeTab === "discussions" && (
                  <motion.div
                    key="discussions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="space-y-6">
                      {course.discussions.map((discussion) => (
                        <div key={discussion.id} className="bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                              {discussion.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-bold">{discussion.user}</h4>
                                <span className="text-sm text-gray-400">{discussion.time}</span>
                              </div>
                              <p className="mt-2 text-gray-300">{discussion.content}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <button className="flex items-center gap-1 hover:text-gray-300">
                              <FiMessageSquare className="w-4 h-4" />
                              {discussion.replies} replies
                            </button>
                            <button className="flex items-center gap-1 hover:text-gray-300">
                              <FiHeart className="w-4 h-4" />
                              {discussion.upvotes} upvotes
                            </button>
                            <button className="text-blue-400 hover:text-blue-300">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <h4 className="font-bold mb-3">Start a new discussion</h4>
                        <textarea
                          placeholder="Ask a question or share your thoughts..."
                          className="w-full h-24 bg-gray-900 border border-gray-700 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                          Post Discussion
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Sidebar - Course Content */}
        <div className={`lg:w-80 border-l border-gray-700 bg-gray-800 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="p-4">
            {/* Toggle Sidebar Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden mb-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              {isSidebarOpen ? <FiX className="w-5 h-5" /> : <FiChevronLeft className="w-5 h-5" />}
            </button>
            
            {/* Course Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Course Progress</h3>
                <span className="text-sm text-gray-400">{course.progress}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
            
            {/* Modules List */}
            <div className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="bg-gray-700/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setSelectedModule(moduleIndex);
                      if (moduleIndex !== selectedModule) {
                        setSelectedLesson(0);
                      }
                    }}
                    className={`w-full p-4 text-left flex items-center justify-between ${
                      selectedModule === moduleIndex ? 'bg-gray-700' : 'hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-600 flex items-center justify-center">
                        <span className="font-bold">{moduleIndex + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-bold">{module.title}</h4>
                        <p className="text-sm text-gray-400">
                          {module.lessons.length} lessons • {module.progress}% complete
                        </p>
                      </div>
                    </div>
                    <FiChevronRight className={`w-5 h-5 transition-transform ${
                      selectedModule === moduleIndex ? 'rotate-90' : ''
                    }`} />
                  </button>
                  
                  {/* Lessons in Module */}
                  <AnimatePresence>
                    {selectedModule === moduleIndex && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-700"
                      >
                        <div className="p-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <button
                              key={lesson.id}
                              onClick={() => setSelectedLesson(lessonIndex)}
                              className={`w-full p-3 rounded-lg flex items-center gap-3 text-left mb-1 transition-colors ${
                                selectedLesson === lessonIndex
                                  ? 'bg-blue-900/30 text-blue-300'
                                  : 'hover:bg-gray-700/50'
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {lesson.isCompleted ? (
                                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  getContentIcon(lesson.type)
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{lesson.title}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <span>{getContentIcon(lesson.type)}</span>
                                  <span>{lesson.duration}</span>
                                  {lesson.type === CONTENT_TYPES.MCQ && lesson.score !== undefined && (
                                    <span className="text-yellow-500">{lesson.score}/{lesson.maxScore}</span>
                                  )}
                                </div>
                              </div>
                              {selectedLesson === lessonIndex && (
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 space-y-3">
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-3">
                <FiDownload className="w-5 h-5" />
                <span>Download All Resources</span>
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-3">
                <FiBarChart2 className="w-5 h-5" />
                <span>View Progress Analytics</span>
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-3">
                <FiAward className="w-5 h-5" />
                <span>Get Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Database Integration Notes */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-t border-gray-800 p-6">
        <h3 className="text-lg font-bold text-blue-300 mb-3">
          🗄️ Database Integration Ready
        </h3>
        <div className="text-sm text-blue-200 space-y-2">
          <p>This learning page uses static data. For production, implement:</p>
          <pre className="mt-4 p-4 bg-black/30 rounded-lg text-xs overflow-x-auto">
{`// API Routes needed:
// GET /api/courses/[id]/content - Get course modules and lessons
// GET /api/courses/[id]/progress - Get user progress
// POST /api/courses/[id]/progress - Update lesson completion
// POST /api/courses/[id]/quiz - Submit quiz answers
// GET /api/courses/[id]/resources - Get course resources
// POST /api/courses/[id]/notes - Save user notes
// GET /api/courses/[id]/discussions - Get course discussions

// Database Schema for Learning Progress:
const ProgressSchema = {
  userId: ObjectId,
  courseId: ObjectId,
  modules: [{
    moduleId: ObjectId,
    lessons: [{
      lessonId: ObjectId,
      isCompleted: boolean,
      completedAt: Date,
      score: number, // For quizzes
      timeSpent: number, // In seconds
      lastAccessed: Date
    }],
    progress: number
  }],
  overallProgress: number,
  lastAccessed: Date,
  totalTimeSpent: number,
  certificateEarned: boolean
};

// Lesson Content Schema:
const LessonSchema = {
  title: string,
  type: 'video' | 'audio' | 'text' | 'mcq' | 'pdf' | 'image' | 'link',
  duration: string, // In minutes or HH:MM:SS
  order: number,
  content: {
    // Video
    videoUrl: string,
    videoPlatform: string,
    transcript: string,
    subtitles: [{
      language: string,
      url: string
    }],
    // Audio
    audioUrl: string,
    transcript: string,
    // Text
    text: string,
    // MCQ
    question: string,
    options: string[],
    correctAnswer: number,
    explanation: string,
    points: number,
    // PDF
    pdfUrl: string,
    // Image
    imageUrl: string,
    caption: string,
    description: string,
    // Link
    linkUrl: string,
    linkTitle: string,
    description: string
  },
  resources: [{
    name: string,
    type: string,
    url: string,
    size: string
  }]
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}