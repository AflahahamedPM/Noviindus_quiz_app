import Header from "@/components/header";

export const metadata = {
  title: "Home Page",
  description: "A simple home page using Next.js and Tailwind CSS",
};

export default function HomeLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
