import Header from "@/components/header";

export const metadata = {
  title: "Questions Page",
  description: "A simple questions page using Next.js and Tailwind CSS",
};

export default function QuestionsLayout({ children }) {
  return (
    <section classname="min-h-screen">
      <Header />
      {children}
    </section>
  );
}
