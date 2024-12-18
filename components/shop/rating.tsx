import { Star } from "lucide-react";

const Rating = ({
  rating,
  maxRating = 5,
}: {
  rating: number;
  maxRating: number;
}) => {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          fill={index < rating ? "currentColor" : "none"}
          color={index < rating ? "#F6E7CB" : "#CCCCCC"}
          className="w-3 h-3"
        />
      ))}
    </div>
  );
};

export default Rating;
