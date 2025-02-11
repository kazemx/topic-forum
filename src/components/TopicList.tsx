
import { motion, AnimatePresence } from "framer-motion";

type Topic = {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  replies: number;
  category: string;
};

const topics: Topic[] = [
  {
    id: 1,
    title: "شروع برنامه‌نویسی وب",
    author: "سارا چن",
    date: "2024-03-20",
    likes: 245,
    replies: 89,
    category: "برنامه‌نویسی"
  },
  {
    id: 2,
    title: "تکنیک‌های مدرن جاوااسکریپت",
    author: "علی کیم",
    date: "2024-03-19",
    likes: 189,
    replies: 156,
    category: "برنامه‌نویسی"
  },
  {
    id: 3,
    title: "اصول طراحی رابط کاربری",
    author: "مریم گارسیا",
    date: "2024-03-18",
    likes: 312,
    replies: 67,
    category: "طراحی"
  },
  {
    id: 4,
    title: "مبانی یادگیری ماشین",
    author: "جان اسمیت",
    date: "2024-03-17",
    likes: 178,
    replies: 45,
    category: "هوش مصنوعی"
  },
  {
    id: 5,
    title: "بهترین روش‌های امنیت شبکه",
    author: "امیلی براون",
    date: "2024-03-16",
    likes: 156,
    replies: 34,
    category: "امنیت"
  }
];

const sortTopics = (topics: Topic[], activeTab: string, selectedCategory: string | null) => {
  let filteredTopics = selectedCategory 
    ? topics.filter(topic => topic.category === selectedCategory)
    : topics;

  const sortedTopics = [...filteredTopics];
  switch (activeTab) {
    case "most-liked":
      return sortedTopics.sort((a, b) => b.likes - a.likes);
    case "most-replied":
      return sortedTopics.sort((a, b) => b.replies - a.replies);
    default:
      return sortedTopics.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }
};

export default function TopicList({ 
  activeTab, 
  selectedCategory 
}: { 
  activeTab: string;
  selectedCategory: string | null;
}) {
  const sortedTopics = sortTopics(topics, activeTab, selectedCategory);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${activeTab}-${selectedCategory}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
        dir="rtl"
      >
        {sortedTopics.map((topic) => (
          <motion.div
            key={topic.id}
            layout
            className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-600">
                  نویسنده: {topic.author} • {new Date(topic.date).toLocaleDateString('fa-IR')}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700">
                    {topic.likes}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700">
                    {topic.replies}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
