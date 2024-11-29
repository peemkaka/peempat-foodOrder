import CategoryList from "@/components/CategoryList";
import BusinessList from "../components/BusinessList";

export default function Home() {
  return (
    <div className="w-full text-black">
        <CategoryList/>
        <BusinessList/>
    </div>
  );
}
