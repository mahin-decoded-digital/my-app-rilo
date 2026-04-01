import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRestaurantStore } from "@/store/restaurantStore";

export default function SearchBar() {
  const searchQuery = useRestaurantStore((state) => state.searchQuery);
  const setSearchQuery = useRestaurantStore((state) => state.setSearchQuery);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Search restaurants, cuisines, or dishes..."
        className="pl-10 h-12 text-base w-full bg-background shadow-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}