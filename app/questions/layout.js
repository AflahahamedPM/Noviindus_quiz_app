import Header from "@/components/header";

export const metadata = {
  title: "Questions Page",
  description: "A simple questions page using Next.js and Tailwind CSS",
  keywords: [
    "web development",
    "quiz",
    "study web development",
    "questions",
    "questions related to web development",
    "web development mcq",
    "full stack developer quiz",
    "web development assessment",
    "interactive web development quiz",
    "developer aptitude test",
    "next.js quiz",
    "coding quiz for beginners",
  ],
  


};

export default function QuestionsLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
