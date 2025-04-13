
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2022",
    title: "Founded",
    description:
      "We started with a mission to make quality education accessible to all.",
  },
  {
    year: "2023",
    title: "100+ Courses Launched",
    description:
      "Expanded our library with expert-led courses across various domains.",
  },
  {
    year: "2024",
    title: "10K+ Students Enrolled",
    description: "Built a strong learning community with global learners.",
  },
  {
    year: "2025",
    title: "AI-Powered Learning",
    description:
      "Introducing adaptive learning powered by AI for personalized paths.",
  },
];

export default function AboutUs() {
  return (
    <div className="py-20 px-4 max-w-5xl mx-auto bg-gray-950 text-gray-100">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        About Us
      </h2>

      <div className="relative border-l-[3px] border-cyan-600 pl-6">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="absolute -left-3 w-6 h-6 bg-cyan-500 rounded-full border-[4px] border-gray-950" />
            <h3 className="text-xl font-semibold text-gray-100">
              {item.year} — {item.title}
            </h3>
            <p className="text-gray-400 mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
